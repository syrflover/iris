import * as F from 'nodekell';

import type { Message } from 'discord.js';

import { sayStore } from '../../store/sayStore';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import { ISayEnableCommandParseResult } from './flags';

export const sayEnable: CommandFunc<ISayEnableCommandParseResult> = (
    { content, name, effect }: ISayEnableCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const voiceChannel = message.member?.voice.channel;

        if (voiceChannel) {
            const voices = await import('../../voices.json');

            const voice = await F.find(({ name: voicename }) => voicename === name, voices);

            const userid = message.author.id;

            const sayData = await sayStore.read();

            sayStore
                .write({
                    ...sayData,
                    [userid]: {
                        voiceChannelID: message.member?.voice.channelID!,
                        expire: Date.now() + 3600 * 1000,
                        mode: `--name ${voice!.name} --effect ${effect}`,
                    },
                })
                .then((r) => {
                    if (r) {
                        resolve();
                        return;
                    }
                    reject(new StateError('세션 저장에 실패하였어요', message));
                })
                .catch((error) => {
                    reject(new StateError(error.message, message));
                });
            return;
        }
        reject(new StateError('음성 채널에 입장하여 주세요', message));
    });
