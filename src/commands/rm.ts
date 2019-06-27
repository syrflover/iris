import { Message } from 'discord.js';

import { CommandFunc } from './index';
import { StateError } from '../state';

export const rm: CommandFunc = (
    parameter: string,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const removeAmount = parseInt(parameter, 10);

        if (isNaN(removeAmount)) {
            reject(new StateError('parameter must be number', message));
            return;
        }
        const messages = await message.channel
            .fetchMessages({
                limit: removeAmount + 1,
            })
            .then((msgs) => msgs.filter((msg) => msg.id !== message.id));

        message.channel
            .bulkDelete(messages)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(new StateError(error.message, message));
            });
    });
