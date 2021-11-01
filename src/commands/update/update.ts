import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { spawnp } from '../../lib/spawnp';
import { shouldUseYarn } from '../../lib/shouldUseYarn';
import { StateError } from '../../state';

export const update: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            // const f = (data: string) => message.channel.send(data);

            const { stdout: updateLog, time: gitPullTime } = await spawnp('git', ['pull']);

            const alreadyUpToDate = 'Already up to date.' === updateLog.trim();

            if (alreadyUpToDate) {
                await message.channel.send('이미 최신 버전이에요');

                resolve();
                return;
            }

            await message.channel.send(`업데이트 받는 데 ${gitPullTime / 1000}초 만큼 걸렸어요`);

            const pm = (await shouldUseYarn()) ? 'yarn' : 'npm';

            const { time: installTime } = await spawnp(pm, ['install']);

            await message.channel.send(`패키지 설치하는 데 ${installTime / 1000}초 만큼 걸렸어요`);

            const { stderr: buildStderr, time: buildTime } = await spawnp(pm, ['run', 'build']);

            if (buildStderr.length > 0) {
                reject(new StateError(buildStderr, message));
                return;
            }

            await message.channel.send(`빌드 하는 데 ${buildTime / 1000}초 만큼 걸렸어요`);

            resolve();

            await message.channel.send('재시작 할 거예요');

            process.exit(0);
        } catch (error: any) {
            reject(new StateError(error.message, message));
        }
    });
