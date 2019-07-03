import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '../../lib/commandParser';
import { spawnp } from '../../lib/spawnp';
import { StateError } from '../../state';

export const sh: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        const [cmd, ...params] = content.split(' ');

        try {
            const { time } = await spawnp(cmd, params, (data) => message.channel.send(data));

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
