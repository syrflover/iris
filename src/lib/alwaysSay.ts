import * as F from 'nodekell';

import { Message } from 'discord.js';

import { sayStore } from '../store/sayStore';
import { say } from '../commands/say';
import { StateError } from '../state';

export const alwaysSay = (
    prefixes: string[],
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const userid = message.author.id;
        const sayData = await sayStore.read();
        const saySession = sayData[userid];
        const voiceChannel = message.member.voiceChannel;

        const hasPrefix = await F.some(
            (pf) => message.content.startsWith(pf),
            prefixes,
        );

        if (hasPrefix) {
            resolve();
            return;
        }

        if (saySession && voiceChannel && saySession.expire > Date.now()) {
            await sayStore.write({
                ...sayData,
                [userid]: {
                    voiceChannelID: voiceChannel.id,
                    expire: Date.now() + 3600 * 1000,
                    mode: saySession.mode,
                },
            });

            try {
                await say(`${saySession.mode} ${message.content}`, message);
                resolve();
            } catch (error) {
                reject(new StateError(error.message, message));
            }
        }
    });
