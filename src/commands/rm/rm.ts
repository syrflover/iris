import { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import { IBaseCommandParseResult } from 'command-parser';

export const rm: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const removeAmount = parseInt(content, 10);

        if (isNaN(removeAmount)) {
            reject(new StateError('인자는 정수 여야해요', message));
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
