import { Message, ActivityType } from 'discord.js';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import { IBaseCommandParseResult } from '../../lib/commandParser';

const activityTypes: ActivityType[] = [
    'LISTENING',
    'PLAYING',
    'STREAMING',
    'WATCHING',
];

const toActivityType = (s: string) => {
    switch (s.toLocaleLowerCase().trim()) {
        case 'l':
        case 'listening':
            return activityTypes[0];
        case 'p':
        case 'playing':
            return activityTypes[1];
        case 's':
        case 'streaming':
            return activityTypes[2];
        case 'w':
        case 'watching':
            return activityTypes[3];
        default:
            return;
    }
};

export const state: CommandFunc = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        let [type, ...game] = content.split(' ');

        if (!toActivityType(type)) {
            game = [type, ...game];
            type = 'playing';
        }

        if (content.length === 0 || game.length === 0) {
            reject(new StateError('parameter must be string', message));
            return;
        }

        try {
            await message.client.user.setPresence({
                game: {
                    name: game.join(' '),
                    type: toActivityType(type),
                    url: 'https://syrflover.co',
                },
            });
            resolve();
        } catch (e) {
            reject(new StateError(e.message, message));
        }
    });
