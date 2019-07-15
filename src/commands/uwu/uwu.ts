import { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { StateError } from '../../state';

export const uwu: CommandFunc<IBaseCommandParseResult, string> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<string> =>
    new Promise(async (resolve, reject) => {
        try {
            const result = `${content} uwu`;

            await message.channel.send(result);
            resolve(result);
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
