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

        const [a, b] = t.map((e) => parseInt(e, 10));

        // end - begin > 1073741824 occurs unknown error
        const er = F.isNil(b) ? a > 1073741824 : b - a > 1073741824;

        /* if (c.length > 0) {
            reject(new StateError('parameter length must under 3', message));
            return;
        } */

        if (er) {
            reject(new StateError('end - begin > 1073741824 occurs unknown error', message));
            return;
        }

        try {
            const r = F.isNil(a)
                ? t.length > 2
                    ? t[F.random(t.length)]
                    : F.random()
                : F.isNil(b)
                ? F.random(a + 1)
                : t.length > 2
                ? t[F.random(t.length)]
                : F.random(a, b + 1);

            await message.channel.send(r);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
