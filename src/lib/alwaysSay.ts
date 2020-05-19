import * as F from 'nodekell';

import type { Message } from 'discord.js';
import { commandParser } from '@syrflover/command-parser';

import { sayStore } from '../store/sayStore';
import { say } from '../commands/say/say';
import { sayFlags } from '../commands/say';
import { ISayCommandParseResult } from '../commands/say/flags';

export const alwaysSay = (prefixes: string[], message: Message): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const userid = message.author.id;
        const sayData = await sayStore.read();
        const saySession = sayData[userid];
        const voiceChannel = message.member.voiceChannel;

        const hasPrefix = await F.some((pf) => message.content.startsWith(pf), prefixes);

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
                const sayCommandParseResult = commandParser<ISayCommandParseResult>(
                    `${saySession.mode} ${message.content}`,
                    sayFlags,
                );

                await say(sayCommandParseResult, message);
                resolve();
            } catch (error) {
                reject(error);
            }
        }
    });
