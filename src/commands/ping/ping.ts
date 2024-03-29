import { IBaseCommandParseResult } from '@syrflover/command-parser';
import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { StateError } from '../../state';
import { request } from '../../lib/request';

export const ping: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const { response, url, latency, error } = (await request([content]))[0];

            const result = error
                ? `\`${url}\`  :arrow_right:  \`${error}\``
                : `\`${url}\`  :arrow_right:  \`${response!.status_code}\` | \`${latency}ms\``;

            await message.channel.send(result);
            resolve();
        } catch (error: any) {
            reject(new StateError(error.message, message));
        }
    });
