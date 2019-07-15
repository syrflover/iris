import * as os from 'os';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { StateError } from '../../state';

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
            reject(new StateError(error.message, message));
        }
    });
