import { Message } from 'discord.js';

import { sayStore } from '../store/sayStore';
import { StateError } from '../state';

export const sayDisable = (parameter: string, message: Message) =>
    new Promise(async (resolve, reject) => {
        try {
            const sayData = await sayStore.read();

            delete sayData[message.author.id];

            await sayStore.write({ ...sayData });

            resolve(message);
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
