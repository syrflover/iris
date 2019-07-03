import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from 'command-parser';
import { spawnp } from '../../lib/spawnp';
import { StateError } from '../../state';

export const sh: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        if (content.length === 0) {
            reject(new StateError('실행할 명령어를 입력하여 주세요', message));
        }

        const [cmd, ...params] = content.split(' ');

        try {
            const { time } = await spawnp(cmd, params, (data) => message.channel.send(data));

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
