import * as F from 'nodekell';
import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { spawnp } from '../../lib/spawnp';
import { StateError } from '../../state';
import { env } from '../../env';
import { ms } from '../../lib/ms';
import { flat } from '../../lib/flat';

const removeBashColorString = (st: string) => st.replace(/\[[0-9]+m/g, '').trim();

const generateClockEmojies = (
    hours: (number | string)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
) => flat(hours.map((e) => [`:clock${e}:`, `:clock${e}30:`]));

const clockEmojies = generateClockEmojies();

export const sh: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        if (content.length === 0) {
            reject(new StateError('실행할 명령어를 입력하여 주세요', message));
            return;
        }

        const [cmd, ...params] = content.split(' ');

        try {
            const cmda = env.USE_SSH_IN_SH ? 'ssh' : cmd;

            const paramsa = env.USE_SSH_IN_SH
                ? ['-i', env.SSH_KEY_PATH, env.SSH_USER_IP, '-p', env.SSH_PORT, cmd, ...params]
                : params;

            const { time } = await spawnp(cmda, paramsa, (data) =>
                message.channel.send(removeBashColorString(data)),
            );

            await message.channel.send(`${F.sample(clockEmojies)} ${ms(time)}`);

            resolve(null);
        } catch (error: any) {
            reject(new StateError(error.message, message));
        }
    });
