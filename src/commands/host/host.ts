import * as os from 'os';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '../../lib/commandParser';

export const host: CommandFunc<IBaseCommandParseResult, string> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            const hostname = os.hostname();
            await message.channel.send(hostname);
            resolve(hostname);
        } catch (error) {
            reject(error);
        }
    });
