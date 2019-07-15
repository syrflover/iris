import axios from 'axios';

import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { StateError } from '../../state';

interface IRequestResult {
    url: string;
    latency: number;
    begin: number;
    response?: {
        headers: { [index: string]: string };
        status_code: number;
        method: string;
    };
    error?: string;
}

const request = (url: string) =>
    axios.post<IRequestResult[]>('https://request.syrflover.co', [url]).then((res) => res.data);

export const ping: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const { response, url, latency, error } = (await request(content))[0];

            const result = error
                ? `\`${url}\`  :arrow_right:  \`${error}\``
                : `\`${url}\`  :arrow_right:  \`${response!.status_code}\` | \`${latency}ms\``;

            await message.channel.send(result);
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
