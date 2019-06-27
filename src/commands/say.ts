import * as fs from 'fs';

import * as F from 'nodekell';

import { Message, StreamDispatcher } from 'discord.js';

import { CommandFunc } from './index';
import { StateError } from '../state';
import { siri } from '../lib/siri';
import { voiceware } from '../lib/voiceware';
import { replacer } from '../lib/utils/replacer';

const replaceRegExp: [RegExp, string][] = [
    [/-|"|\\|'|\||`|\$/g, ''], // bug fix
    [/~/g, ''], // bug fix
    [/<@[0-9]+>/g, ''], // user id
    [/<#[0-9]+>/g, ''], // channel id
    [/<:.+:[0-9]+>/g, ''], // custom emoji id
];

const ignoreRegExp: RegExp[] = [
    /(http|https|ftp|telnet|news|mms):\/\/[^\"'\s()]+/i, // url
    /```.+```/is, // code block
    /g[?].*/, // shigure bot prefix
    /^shigure/, // shigure bot command
];

export const findVoice = (
    voices: typeof import('../voices.json'),
    content: string,
) => F.find(({ name }) => new RegExp(`--${name}`).test(content), voices);

export const say: CommandFunc = (
    parameter: string,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        if (!message.member.voiceChannel) {
            reject(new StateError('Need you join voice channel', message));
            return;
        }

        if (await F.some((reg) => reg.test(parameter), ignoreRegExp)) {
            reject(new StateError('Ignore regexp test', message));
            return;
        }

        const voices = await import('../voices.json');

        const voiceNames = voices.map(
            ({ name }) =>
                [new RegExp(`--${name}`, 'g'), ''] as [RegExp, string],
        );

        const sayText = replacer([...voiceNames, ...replaceRegExp], parameter);

        const voice = /--[a-z0-9]/i.test(parameter)
            ? await findVoice(voices, parameter)
            : await F.find(({ name }) => name === 'yuna', voices);

        if (!voice) {
            reject(new StateError('Has not this voice', message));
            return;
        }

        const connection = await message.member.voiceChannel.join();

        let dispatcher: StreamDispatcher;

        switch (voice.type) {
            case 'siri': {
                const sayFile = await siri(sayText, voice.name);

                const sayStream = fs.createReadStream(sayFile, {
                    autoClose: true,
                });

                dispatcher = connection.playStream(sayStream, {
                    volume: 0.7,
                });
                break;
            }
            case 'voiceware': {
                const { speaker, dbsize } = voice.params!;

                const sayURL = await voiceware(sayText, {
                    speaker,
                    dbsize,
                });

                dispatcher = connection.playArbitraryInput(sayURL, {
                    volume: 0.7,
                });
                break;
            }
        }

        dispatcher!.on('end', () => {
            resolve();
        });

        dispatcher!.on('error', (error) => {
            reject(new StateError(error.message, message));
        });
    });
