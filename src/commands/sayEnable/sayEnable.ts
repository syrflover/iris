import * as F from 'nodekell';

import { Message } from 'discord.js';

import { sayStore } from '../../store/sayStore';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import { ISayEnableCommandParseResult } from './flags';

export const sayEnable: CommandFunc<ISayEnableCommandParseResult> = (
    { content, name, effect }: ISayEnableCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const voiceChannel = message.member.voiceChannel;

        if (voiceChannel) {
            const voices = await import('../../voices.json');

            const voice = await F.find(({ name: voicename }) => voicename === name, voices);

            const userid = message.author.id;

            const sayData = await sayStore.read();

            sayStore
                .write({
                    ...sayData,
                    [userid]: {
                        voiceChannelID: message.member.voiceChannel.id,
                        expire: Date.now() + 3600 * 1000,
                        mode: `--name ${voice!.name} --effect ${effect}`,
                    },
                })
                .then((r) => {
                    if (r) {
                        resolve();
                        return;
                    }
                    throw new Error();
                })
                .catch((e) => {
                    reject(new StateError('Failed write sayEnable session to sayStore', message));
                });
            return;
        }
        reject(new StateError('Need you join voice channel', message));
    });