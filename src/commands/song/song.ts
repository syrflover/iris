import { Message, MessageEmbed } from 'discord.js';

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
    trackSC,
} from '../../lib/soundcloud';
import { env } from '../../env';
import { prefixes } from '../../client';
import { awaitMessage } from '../../lib/awaitMessage';
import { success } from '../../handler/message';
import { stateStore } from '../../store/stateStore';
import { ms } from '../../lib/ms';

const sc = new SC(env.SOUNDCLOUD_CLIENT_ID);

export const song: CommandFunc<IBaseCommandParseResult, void> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const scTrack = await trackSC(sc, content);

            const { user } = scTrack;

            const stream = await $(
                scTrack,
                streamHeaderURLSC(sc),
                streamHeaderSC(sc),
                streamSegmentsSC,
                streamSC(sc),
            );

            const connenction = await message.member?.voice.channel?.join();

            let dispatcher = connenction?.play(stream);
            let startDate: number;

            dispatcher?.on('start', async () => {
                resolve();

                startDate = Date.now();
                await message.client.user?.setPresence({
                    activity: {
                        name: `${scTrack.title}`,
                        type: 'LISTENING',
                        url: scTrack.permalink_url,
                    },
                });
            });

            dispatcher?.on('close', async () => {
                dispatcher = undefined;
                _ = undefined;

                const { name, type } = await stateStore.read();
                await message.client.user?.setPresence({
                    activity: {
                        name,
                        type,
                    },
                });
            });

            dispatcher?.setVolume(0.08);

            let _: Promise<void> | undefined = awaitMessage(
                prefixes,
                message,
                async (awaitedMessage: Message) => {
                    if (!dispatcher) {
                        return { stop: true };
                    }

                    const succ = () => success([, awaitedMessage, '']);

                    if (message.member?.voice.channelID === connenction?.voice?.channelID) {
                        switch (awaitedMessage.content) {
                            case 'track':
                                const current_duration = ms(Date.now() - startDate, {
                                    long: true,
                                });
                                const full_duration = ms(scTrack.full_duration, {
                                    long: true,
                                });

                                const embed = new MessageEmbed();
                                embed.setTitle(scTrack.title);
                                embed.setURL(scTrack.permalink_url);
                                embed.setAuthor(user.username, user.avatar_url, user.permalink_url);
                                embed.setDescription(scTrack.description || 'No Description');
                                embed.setThumbnail(scTrack.artwork_url);
                                embed.setFooter(`${current_duration} / ${full_duration}`);
                                embed.setTimestamp(new Date(scTrack.created_at));

                                await awaitedMessage.channel.send({ embed });
                                await succ();
                                return { stop: false };
                            case `play`:
                            case `start`:
                            case `resume`:
                                dispatcher?.resume();
                                await succ();
                                return { stop: false };
                            case `pause`:
                                dispatcher?.pause();
                                await succ();
                                return { stop: false };
                            case `stop`:
                            case `close`:
                            case `end`:
                                dispatcher?.end();
                                await succ();
                                return { stop: true };
                        }
                    }

                    return { stop: false };
                },
            );
        } catch (error: any) {
            reject(new StateError(error.message, message));
        }
    });
