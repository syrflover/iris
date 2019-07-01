import * as os from 'os';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '../../lib/commandParser';

export const host: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            await message.channel.send(os.hostname());
            resolve();
        } catch (error) {
            reject(error);
        }
    });
