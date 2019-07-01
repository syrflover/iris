import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '../../lib/commandParser';
import { spawnp } from '../../lib/spawnp';
import { env } from '../../env';
import { shouldUseYarn } from '../../lib/shouldUseYarn';

export const update: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const { result: updateLog, time: gitPullTime } = await spawnp('git', ['pull']);

            const alreadyUpToDate = 'Already up to date.' === updateLog.trim();

            await message.channel.send(`${alreadyUpToDate ? '이미 최신 버전이에요' : updateLog}`);

            resolve();

            if (!alreadyUpToDate && env.NODE_ENV !== 'development') {
                const pm = (await shouldUseYarn()) ? 'yarn' : 'npm';

                await message.channel.send(`업데이트 받는데 ${gitPullTime}ms 만큼 걸렸어요`);

                const { time: buildTime } = await spawnp(pm, ['run', 'build']);

                await message.channel.send(`빌드 하는데 ${buildTime}ms 만큼 걸렸어요`);

                await message.channel.send('재시작 할 거예요');

                await F.sleep(1000);

                process.exit(0);
            }
        } catch (error) {
            reject(error);
        }
    });
