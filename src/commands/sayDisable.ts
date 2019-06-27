import { Message } from 'discord.js';

import { sayStore } from '../store/sayStore';
import { StateError } from '../state';

export const sayDisable = (
    parameter: string,
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
