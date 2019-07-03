import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from 'command-parser';
import { spawnp } from '../../lib/spawnp';
import { StateError } from '../../state';

export const version: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            const { stdout } = await spawnp('git', ['rev-parse', '--short', 'HEAD']);
            await message.channel.send(stdout);
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
