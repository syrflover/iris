import type { Message } from 'discord.js';

import SC from 'soundcloud.ts';
import { $ } from '@syrflover/iterator/dist/lib/utils/mod';
import { IBaseCommandParseResult } from '@syrflover/command-parser';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import {
    streamHeaderURLSC,
    streamHeaderSC,
    streamSegmentsSC,
    streamSC,
} from '../../lib/soundcloud';
import { env } from '../../env';
import { prefixes } from '../../client';
import { awaitMessage } from '../../lib/awaitMessage';

const sc = new SC(env.SOUNDCLOUD_CLIENT_ID);

export const song: CommandFunc<IBaseCommandParseResult, void> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const stream = await $(
                content,
                streamHeaderURLSC(sc),
                streamHeaderSC(sc),
                streamSegmentsSC,
                streamSC(sc),
            );

            const connenction = await message.member?.voice.channel?.join();

            let dispatcher = connenction?.play(stream);

            dispatcher?.on('close', () => {
                dispatcher = undefined;
            });

            dispatcher?.setVolume(0.08);

            awaitMessage(prefixes, message.channel, (awaitedMessage: Message) => {
                if (message.member?.voice.channelID === connenction?.voice.channelID) {
                    switch (awaitedMessage.content) {
                        case `play`:
                        case `start`:
                        case `resume`:
                            dispatcher?.resume();
                            break;
                        case `pause`:
                            dispatcher?.pause();
                            break;
                        case `stop`:
                        case `close`:
                        case `end`:
                            dispatcher?.end();
                            break;
                    }
                }

                if (dispatcher) {
                    return true;
                }

                return false;
            });

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
