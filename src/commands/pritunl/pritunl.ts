import type { Message } from 'discord.js';

import { CommandFunc } from '../index';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { StateError } from '../../state';
import { spawnp } from '../../lib/spawnp';

export const pritunl: CommandFunc<IBaseCommandParseResult, string> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            const { stdout, stderr } = await spawnp('pritunl-client', content.split(' '));

            if (stderr.length > 0) {
                throw new Error(stderr);
            }

            await message.channel.send(stdout);

            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
