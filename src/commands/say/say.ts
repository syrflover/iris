import * as F from 'nodekell';

import { Message, StreamDispatcher } from 'discord.js';

import { CommandFunc } from '../index';
import { StateError } from '../../state';
import { siri } from '../../lib/siri';
import { voiceware } from '../../lib/voiceware';
import { replacer } from '../../lib/replacer';
import { ISayCommandParseResult } from './flags';

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

export const say: CommandFunc<ISayCommandParseResult> = (
    { content, effect, name }: ISayCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        if (!message.member?.voice.channel) {
            reject(new StateError('음성 채널에 입장하여 주세요', message));
            return;
        }

        const hasSomeIgnorePattern = await F.some((reg) => reg.test(content), ignoreRegExp);

        if (hasSomeIgnorePattern) {
            reject(new StateError('Ignore regexp test', message));
            return;
        }

        const voices = await import('../../voices.json');

        const voice = await F.find(({ name: voicename }) => voicename === name, voices);

        const sayText = replacer([...replaceRegExp], content);

        if (!voice) {
            reject(new StateError('해당 목소리를 가진 사람이 없어요', message));
            return;
        }

        const connection = await message.member.voice.channel.join();

        let dispatcher: StreamDispatcher;

        switch (voice.type) {
            case 'siri': {
                const sayFile = await siri(sayText, voice.name);

                /* const sayStream = fs.createReadStream(sayFile, {
                    autoClose: true,
                }); */

                dispatcher = connection.play(sayFile, {
                    volume: 0.7,
                });
                break;
            }
            case 'voiceware': {
                const { speaker, dbsize } = voice.params!;

                const sayURL = await voiceware(sayText, {
                    effect,
                    speaker,
                    dbsize,
                });

                dispatcher = connection.play(sayURL, {
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
