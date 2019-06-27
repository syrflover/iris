import { Message } from 'discord.js';

import { CommandFunc } from './index';

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

// 헛소리 대사 집어 넣자 여중생 코스프레 같은 거 ㅇㅇ
