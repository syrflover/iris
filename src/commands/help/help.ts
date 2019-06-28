import * as F from 'nodekell';

import { CommandFunc, commandList } from '../index';
import { Message } from 'discord.js';
import { IBaseCommandParseResult } from '../../lib/commandParser';

export const help: CommandFunc = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const command = await F.find(([name]) => name === content, commandList);

        if (command) {
            const [, { usage }] = command;

            try {
                await message.channel.send(usage);
                resolve();
            } catch (e) {
                reject(e);
            }
            return;
        }

        const r1 = commandList
            .map(([name]) => `- ${name}\n\n`)
            .join('')
            .trim();

        try {
            await message.channel.send(`\`\`\`markdown\n${r1}\`\`\``);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
