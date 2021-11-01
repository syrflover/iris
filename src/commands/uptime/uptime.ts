import type { Message } from 'discord.js';
import { IBaseCommandParseResult } from '@syrflover/command-parser';

import { CommandFunc } from '../index';
import { ms } from '../../lib/ms';
import { StateError } from '../../state';

export const uptime: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            await message.channel.send(ms(process.uptime() * 1000));
            resolve();
        } catch (error: any) {
            reject(new StateError(error.message, message));
        }
    });
