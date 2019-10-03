import * as F from 'nodekell';

import { Message } from 'discord.js';
import { commandParser } from '@syrflover/command-parser';

import { StateType, StateError } from '../state';
import { CommandMap } from '../commands';

import * as emoji from '../lib/emoji';
import { env } from '../env';
import { cutStrByLength } from '../lib/cutStrByLength';
import { logger } from '../logger';

export const send = async (message: Message, str: string, option?: any) => {
    const r = await cutStrByLength(str, 2000);

    return F.forEach((e) => message.channel.send(e, option), r);
};

export const success = ([_, message]: StateType<any, Message>) => message.react(emoji.success);

export const checkPrefix = F.curry(
    (prefixes: string[], state: StateType<boolean, Message>): Promise<StateType<string, Message>> =>
        new Promise(async (resolve, reject) => {
            const [, message] = state;
            const content = message.content.trim();

            const prefixInMessage = await F.find((pf) => content.startsWith(pf), prefixes);

            if (prefixInMessage) {
                resolve([content.replace(prefixInMessage, ''), message, '']);
                return;
            }
            reject(new StateError('Invalid Prefix', message));
        }),
);

export const ignoreBot = (state: StateType<string, Message>): Promise<StateType<string, Message>> =>
    new Promise((resolve, reject) => {
        const [, message] = state;

        if (message.author.id === message.client.user.id) {
            reject(new StateError('self', message));
            return;
        }
        if (message.author.bot) {
            reject(new StateError('오빠가 너 같은 애랑 놀지 말랬어요', message));
            return;
        }
        resolve(state);
    });

export const checkCommand = F.curry(
    (
        commandMap: CommandMap,
        state: StateType<string, Message>,
    ): Promise<StateType<(message: Message) => Promise<any>, Message>> =>
        new Promise((resolve, reject) => {
            const [content, message, _] = state;
            const [inputCommand, ...parameter] = content.split(' ');

            const command = commandMap.get(inputCommand);

            if (command) {
                if (command.owner && !env.OWNERS.includes(message.author.id)) {
                    reject(
                        new StateError(
                            '해당 명령어는 저의 오빠 또는 허가받은 사람만 사용할 수 있어요',
                            message,
                        ),
                    );
                    return;
                }

                if (command.onlyProd && env.NODE_ENV === 'development') {
                    reject(
                        new StateError('해당 명령어는 개발 환경에서는 사용할 수 없어요', message),
                    );
                    return;
                }

                const commandParseResult = commandParser(parameter.join(' '), command.flags);

                const curried = F.curry(command.run);

                resolve([curried(commandParseResult), message, _]);
                return;
            }
            reject(new StateError('해당 명령어를 찾을 수 없어요', message));
        }),
);

export const runCommand = (
    state: StateType<(message: Message) => Promise<any>, Message>,
): Promise<StateType<boolean, Message>> =>
    new Promise((resolve, reject) => {
        const [run, message, _] = state;

        run(message)
            .then(() => resolve([true, message, _]))
            .catch((error) => reject(new StateError(error.message, message)));
    });

export const catcher = async (error: any) => {
    if (error instanceof StateError) {
        const message = error.dm;
        if (error.message === 'self') {
            return;
        }
        if (error.message === 'Ignore regexp test') {
            await message.react(emoji.fail);
            return;
        }
        if (error.message !== 'Invalid Prefix') {
            logger.error(error);
            message.react(emoji.fail);
            await message.reply('에러가 발생하였어요');
            await message.reply(error.message);
            return;
        }
        return;
    }
    logger.error(error);
};
