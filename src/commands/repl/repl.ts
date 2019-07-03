import * as NodeREPL from 'repl';

import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from 'command-parser';
import { Readable, Writable } from 'stream';

/* const writer: NodeREPL.REPLWriter = (output) => output;

const eval: NodeREPL.REPLEval = (evalCmd, context, file, cb) => {
    cb()
}  */

export const repl: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise((resolve, reject) => {
        // 코드 블럭(마크다운) 텍스트를 받아서 무슨 언어인지 알아낸 다음, 그 언어의 repl 툴을 돌리면 되지 않을까
        const input = new Readable({ encoding: 'utf8', read() {} });
        // input.push(content);
        const output = new Writable({ defaultEncoding: 'utf8', write() {} });

        const nodeREPL = NodeREPL.start({
            replMode: NodeREPL.REPL_MODE_STRICT,
            prompt: '',
            input,
            output,
        });

        nodeREPL.on('close', async () => {
            try {
                const result = nodeREPL.lastError || nodeREPL.last;
                const codeBox = `\`\`\`js\n${content}\n/*\n${result}\n*/\`\`\``;

                await message.channel.send(codeBox);

                resolve();
            } catch (error) {
                reject(error);
            }
        });

        nodeREPL.write(`${content.replace(/^```(js|javascript)/, '').replace(/```$/, '')}\n`);

        nodeREPL.close();
    });
