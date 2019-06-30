import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from '../../lib/commandParser';
import { StateError } from '../../state';

export const random: CommandFunc = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const t = content.split(' ');

        const [a, ...b] = t.map((e) => parseInt(e, 10));

        // end - begin < 1073741824 occurs error
        const er = isNaN(b[0]) ? a > 1073741824 : b[0] - a > 1073741824;

        if (er) {
            reject(new StateError('end - begin < 1073741824 occurs error', message));
            return;
        }

        try {
            const r = F.isNil(a)
                ? t.length > 1
                    ? t[F.random(t.length)]
                    : F.random()
                : F.random(a, ...b);

            await message.channel.send(r);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
