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
            const [name, { flags, description, requireContent }] = command;

            let example = name;

            for (const flag in flags) {
                example += ` --${flag} <${flags[flag].type} = ${flags[flag].default}>`;
            }

            const a = `\`\`\`markdown
# usage

${example} ${requireContent ? `<message>` : ''}

# description

${description}
\`\`\``;

            try {
                await message.channel.send(a);
                resolve();
            } catch (e) {
                reject(e);
            }
            return;
        }

        const b = commandList
            .map(([name]) => `- ${name}\n\n`)
            .join('')
            .trim();

        try {
            await message.channel.send(`\`\`\`markdown\n${b}\`\`\``);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
