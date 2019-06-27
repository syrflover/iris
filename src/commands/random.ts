import * as F from 'nodekell';

import { Message } from 'discord.js';

import { CommandFunc } from './index';

export const randomH = `\`\`\`haskell
{- returns random int -}
random :: Maybe () -> Int
random Nothing -- 0 ~ 4294967295

random :: Int -> Int
random 10      -- 0 ~ 9

random :: Int -> Int -> Int
random 14 23   -- 14 ~ 22

random :: [String] -> String
random ["엄지", "검지", "중지", "약지", "새끼"]
\`\`\``;

export const random: CommandFunc = (
    parameter: string,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const t = parameter.split(' ');

        const [a, ...b] = t.map((e) => parseInt(e, 10));

        try {
            const r = F.isNil(a)
                ? t.length > 1
                    ? t[F.random(t.length)]
                    : F.random()
                : F.random(a, ...b);

            await message.channel.send(r);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
