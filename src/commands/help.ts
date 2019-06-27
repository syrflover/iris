import * as F from 'nodekell';

import { CommandFunc, commandList } from './index';
import { Message } from 'discord.js';

export const help: CommandFunc = (
    parameter: string,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const command = await F.find(
            ([name]) => name === parameter,
            commandList,
        );

        if (command) {
            const [name, { description }] = command;

            const r0 = `#${name}\n\n##description\n\n${description}`;

            try {
                await message.channel.send(`\`\`\`markdown\n${r0}\`\`\``);
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
