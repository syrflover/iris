import { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from '../../lib/commandParser';

export const uwu: CommandFunc = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            await message.channel.send(`${content} uwu`);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
