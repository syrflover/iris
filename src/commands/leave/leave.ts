import { Message } from 'discord.js';
import { StateError } from '../../state';
import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '../../lib/commandParser';

export const leave: CommandFunc = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise((resolve, reject) => {
        if (content.trim() === 'all') {
            message.client.voiceConnections.forEach((connection) => {
                connection.channel.leave();
            });

            process.nextTick(() => resolve());
            return;
        }
        const voiceChannel = message.member.voiceChannel;

        if (voiceChannel) {
            try {
                voiceChannel.leave();
                resolve();
            } catch (error) {
                reject(new StateError(error.message, message));
            }
            return;
        }
        reject(new StateError('need you join voice channel', message));
    });
