import * as F from 'nodekell';
import type { Message, TextChannel } from 'discord.js';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { seperateN } from '../../lib/seperateN';

const removeMessages = F.curry(async (message: Message, removeAmount: number) => {
    const messages = await message.channel.messages
        .fetch({
            limit: removeAmount + 1,
        })
        .then((msgs) => msgs.filter((msg) => msg.id !== message.id));

    await (message.channel as TextChannel).bulkDelete(messages, true);
});

export const rm: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const limit = 400;
        const removeAmount = parseInt(content, 10);

        if (isNaN(removeAmount)) {
            reject(new StateError('인자는 정수가 되어야 하여요', message));
            return;
        }

        if (removeAmount >= limit) {
            reject(new StateError(`삭제할 메세지 갯수는 ${limit}보다 작아야 하여요`, message));
            return;
        }

        try {
            for await (const x of seperateN(removeAmount, 99)) {
                await removeMessages(message, x);
            }

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
