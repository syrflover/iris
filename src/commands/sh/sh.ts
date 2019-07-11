import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from 'command-parser';
import { spawnp } from '../../lib/spawnp';
import { StateError } from '../../state';
import { env } from '../../env';

const removeBashColorString = (st: string) => st.replace(/\[[0-9]+m/g, '').trim();

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

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
