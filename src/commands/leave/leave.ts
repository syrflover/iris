import type { Message } from 'discord.js';
import { StateError } from '../../state';
import { CommandFunc } from '..';
import { ILeaveCommandParseResult } from './flags';

export const leave: CommandFunc<ILeaveCommandParseResult> = (
    { all }: ILeaveCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise((resolve, reject) => {
        if (all) {
            message.client.voice?.connections.forEach((connection) => {
                connection.channel.leave();
            });

            process.nextTick(() => resolve());
            return;
        }
        const voiceChannel = message.member?.voice.channel;

        if (voiceChannel) {
            try {
                voiceChannel.leave();
                resolve();
            } catch (error: any) {
                reject(new StateError(error.message, message));
            }
            return;
        }
        reject(new StateError('음성 채널에 입장하여 주세요', message));
    });
