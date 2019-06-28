import { Message } from 'discord.js';

import { CommandFunc } from './index';

export const uwuH = `\`\`\`haskell
uwu :: Maybe String -> String
uwu "이것봐라" -- "uwu 이것봐라"
uwu Nothing  -- "uwu"
\`\`\``;

export const uwu: CommandFunc = (
    parameter: string,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            await message.channel.send(`${parameter} uwu`);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
