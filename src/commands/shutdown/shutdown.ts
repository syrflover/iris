import * as F from 'nodekell';

import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IShutdownCommandParseResult } from './flags';
import { StateError } from '../../state';
import { spawnp } from '../../lib/spawnp';

export const shutdown: CommandFunc<IShutdownCommandParseResult> = (
    { content, reboot, halt }: IShutdownCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        if (reboot && halt) {
            reject(new StateError('두 옵션은 동시에 사용할 수 없어요', message));
            return;
        }

        if (!reboot && !halt) {
            reject(new StateError('두 옵션 중 하나는 꼭 사용해야 하여요', message));
            return;
        }

        if (reboot) {
            resolve(null);

            await F.sleep(1000);

            process.exit(0);
        }

        if (halt) {
            resolve(null);

            await F.sleep(1000);

            try {
                await spawnp('forever', ['stop', 'iris']);
                return;
            } catch (error: any) {
                reject(new StateError(error.message, message));
            }
        }
    });
