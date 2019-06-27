import * as F from 'nodekell';

import { Message } from 'discord.js';

import { sayStore } from '../store/sayStore';

import { CommandFunc } from './index';
import { StateError } from '../state';
import { findVoice } from './say';

export const sayEnableH = `\`\`\`haskell
{- not require say command
   expires in after one hour from the last message -}
sayEnable :: Maybe CharacterName -> IO ()
sayEnable "--yuna"
sayEnable Nothing -- default is yuna

type CharacterName = String
\`\`\``;

export const sayEnable: CommandFunc = (
    parameter: string,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const voiceChannel = message.member.voiceChannel;

        if (voiceChannel) {
            const voices = await import('../voices.json');

            const voice = /--[a-z0-9]/i.test(parameter)
                ? await findVoice(voices, parameter)
                : await F.find(({ name }) => name === 'yuna', voices);

            const userid = message.author.id;

            const sayData = await sayStore.read();

            sayStore
                .write({
                    ...sayData,
                    [userid]: {
                        voiceChannelID: message.member.voiceChannel.id,
                        expire: Date.now() + 3600 * 1000,
                        mode: voice!.name,
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
                    reject(
                        new StateError(
                            'Failed write sayEnable session to sayStore',
                            message,
                        ),
                    );
                });
            return;
        }
        reject(new StateError('need you join voice channel', message));
    });
