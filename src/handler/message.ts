import * as F from 'nodekell';

import { Message } from 'discord.js';

import { StateType, StateError } from '../state';
import { CommandMap } from '../commands';

import * as emoji from '../lib/emoji';
import { commandParser } from '../lib/commandParser';
import { env } from '../env';

export const success = ([_, message]: StateType<any, Message>) => message.react(emoji.success);

export const ignoreBot = (
    state: StateType<boolean, Message>,
): Promise<StateType<boolean, Message>> =>
    new Promise((resolve, reject) => {
        const [, message] = state;

        const isBot = message.author.bot || message.author.id !== message.client.user.id;

        if (isBot) {
            resolve(state);
            return;
        }
        reject(new StateError('오빠가 너 같은 애랑 놀지 말랬어요', message));
    });

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
                if (command.owner && message.author.id !== env.OWNER_ID) {
                    reject(
                        new StateError(
                            '해당 명령어는 저의 오빠 또는 허가받은 사람만 사용할 수 있어요',
                            message,
                        ),
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

export const catcher = (error: any) => {
    if (error instanceof StateError) {
        const message = error.dm;
        if (error.message === 'Ignore regexp test') {
            message.react(emoji.fail);
            return;
        }
        if (error.message !== 'Invalid Prefix') {
            message.react(emoji.fail);
            message.reply(error.message);
            return;
        }
        return;
    }
    console.error(error);
};
