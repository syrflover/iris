import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '../../lib/commandParser';
import { spawnp } from '../../lib/spawnp';
import { env } from '../../env';

export const update: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const log = await spawnp('git', ['pull']);

            const alreadyUpToDate = 'Already up to date.' === log.trim();

            await message.channel.send(alreadyUpToDate ? '이미 최신 버전이어요' : log);

            resolve();

            if (!alreadyUpToDate && env.NODE_ENV !== 'development') {
                await F.sleep(1000);

                process.exit(0);
            }
        } catch (error) {
            reject(error);
        }
    });
