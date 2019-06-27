import { Message } from 'discord.js';
import { StateError } from '../state';

export const leave = (parameter: string, message: Message): Promise<void> =>
    new Promise((resolve, reject) => {
        if (parameter === 'all') {
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
