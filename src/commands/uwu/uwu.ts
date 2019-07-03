import { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from 'command-parser';

export const uwu: CommandFunc<IBaseCommandParseResult, string> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<string> =>
    new Promise(async (resolve, reject) => {
        try {
            const result = `${content} uwu`;

            await message.channel.send(result);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
