import * as NodeREPL from 'repl';

import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { Readable, Writable } from 'stream';
import { StateError } from '../../state';

/* const writer: NodeREPL.REPLWriter = (output) => output;

const eval: NodeREPL.REPLEval = (evalCmd, context, file, cb) => {
    cb()
}  */

export const node: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise((resolve, reject) => {
        const input = new Readable({ encoding: 'utf8', read() {} }); // tslint:disable-line: no-empty
        // input.push(content);
        const output = new Writable({ defaultEncoding: 'utf8', write() {} }); // tslint:disable-line: no-empty

        const nodeREPL = NodeREPL.start({
            replMode: NodeREPL.REPL_MODE_STRICT,
            prompt: '',
            input,
            output,
        });

        const c = content.replace(/^```(js|javascript)/, '').replace(/```$/, '');

        nodeREPL.on('close', async () => {
            try {
                const result = nodeREPL.lastError || nodeREPL.last;
                const codeBox = `\`\`\`js\n${result}\n\`\`\``;

                await message.channel.send(codeBox);

                resolve(null);
            } catch (error: any) {
                reject(new StateError(error.message, message));
            }
        });

        nodeREPL.write(`${c}\n`);

        nodeREPL.close();
    });
