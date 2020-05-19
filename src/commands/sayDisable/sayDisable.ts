import type { Message } from 'discord.js';

import { sayStore } from '../../store/sayStore';
import { StateError } from '../../state';
import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';

export const sayDisable: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const sayData = await sayStore.read();

            delete sayData[message.author.id];

            await sayStore.write({ ...sayData });

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
