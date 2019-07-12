import { Message } from 'discord.js';
import { IBaseCommandParseResult } from 'command-parser';

import { CommandFunc } from '../index';
import { ms } from '../../lib/ms';

export const uptime: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            // TODO: Change Format to 1 day 1 hour 12 minutes 32 seconds
            await message.channel.send(ms(process.uptime() * 1000));
            resolve();
        } catch (e) {
            reject(e);
        }
    });
