import * as F from 'nodekell';

import { CommandFunc, commandList } from '../index';
import type { Message } from 'discord.js';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { StateError } from '../../state';

export const help: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const command = await F.find(([name]) => name === content, commandList);

        if (command) {
            const [name, { flags, description, contents }] = command;

            const exampleContents = contents
                .map((e) => `<${e.name}${e.optional ? '?' : ''}>`)
                .join(' ');

            let exampleCommand = name;

            for (const flag in flags) {
                exampleCommand += ` --${flag} <${flags[flag].type} = ${flags[flag].default}>`;
            }

            const a = `\`\`\`markdown
# usage

${exampleCommand.trim()} ${exampleContents}

# description

${typeof description === 'function' ? await description() : description}
\`\`\``;

            try {
                await message.channel.send(a);
                resolve();
            } catch (error) {
                reject(new StateError(error.message, message));
            }
            return;
        }

        const b = commandList
            .map(([name]) => `- ${name}\n\n`)
            .join('')
            .trim();

        try {
            await message.channel.send(
                `\`\`\`markdown\n${b}\n\n명령어에 대한 도움말을 보고 싶으시면 help <command> 를 입력하여 주세요\`\`\``,
            );
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
