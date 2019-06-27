import * as F from 'nodekell';

import { CommandFunc, commandList } from './index';
import { Message } from 'discord.js';

export const helpH = `\`\`\`haskell
{- show help message of commands -}
help :: Maybe String -> String
help "uwu"
help Nothing
\`\`\``;

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
            const [, { description }] = command;

            try {
                await message.channel.send(description);
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
