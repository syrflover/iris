import { Message } from 'discord.js';
import ms = require('ms');

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from 'command-parser';

export const uptime: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            await message.channel.send(ms(process.uptime() * 1000, { long: true }));
            resolve();
        } catch (e) {
            reject(e);
        }
    });
