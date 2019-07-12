import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from 'command-parser';
import { StateError } from '../../state';

export const random: CommandFunc<IBaseCommandParseResult> = (
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
            reject(
                new StateError(
                    'begin과 end의 차이가 1073741824 이상일 때 알 수 없는 에러가 발생하여요',
                    message,
                ),
            );
            return;
        }

        try {
            const r = F.isNil(a)
                ? t.length > 1
                    ? t[F.random(t.length)]
                    : F.random()
                : F.isNil(b)
                ? F.random(a + 1)
                : t.length > 2
                ? t[F.random(t.length)]
                : F.random(a, b + 1);

            await message.channel.send(r);
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
