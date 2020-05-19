import { DateTime } from 'luxon';
import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { spawnp } from '../../lib/spawnp';
import { StateError } from '../../state';

export const version: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            const { stdout } = await spawnp('git', ['log', '-1', '--pretty="%h|%cd"']);

            const [id, dt] = stdout.replace(/"/g, '').split('|');

            const date = DateTime.fromJSDate(new Date(dt)).toFormat('yyyy/LL/dd HH:mm:ss ZZZ');

            await message.channel.send(`${id} | ${date}`);
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
