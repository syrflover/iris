import * as F from 'nodekell';

import { Message } from 'discord.js';

import { IFlags, IBaseCommandParseResult } from '../lib/commandParser';

import { uwu, uwuDescription } from './uwu';
import { state, stateDescription } from './state';
import { rm, rmDescription } from './rm';
import { leave, leaveDescription } from './leave';
import { say, sayDescription, sayFlags } from './say';
import { sayEnable, sayEnableDescription, sayEnableFlags } from './sayEnable';
import { sayDisable, sayDisableDescription } from './sayDisable';
import { help, helpDescription } from './help';
import { random, randomDescription } from './random';

// export type CommandParseResult = ISayCommandParseResult | ISayEnableCommandParseResult;

export type CommandFunc<C extends IBaseCommandParseResult = IBaseCommandParseResult> = (
    commandParseResult: C,
    message: Message,
) => Promise<void>;

export type CurriedCommandFunc<
    C extends IBaseCommandParseResult = IBaseCommandParseResult
> = F.CurriedFunction2<C, Message, Promise<void>>;

export type CommandInfo = {
    // FIX ME (TYPE ERROR)
    run: CurriedCommandFunc<any>;
    flags: IFlags;
    description: string;
};

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    ['help', { run: F.curry(help), flags: {}, description: helpDescription }],
    ['uwu', { run: F.curry(uwu), flags: {}, description: uwuDescription }],
    ['state', { run: F.curry(state), flags: {}, description: stateDescription }],
    ['rm', { run: F.curry(rm), flags: {}, description: rmDescription }],
    ['leave', { run: F.curry(leave), flags: {}, description: leaveDescription }],
    ['say', { run: F.curry(say), flags: sayFlags, description: sayDescription }],
    [
        'sayEnable',
        { run: F.curry(sayEnable), flags: sayEnableFlags, description: sayEnableDescription },
    ],
    ['sayDisable', { run: F.curry(sayDisable), flags: {}, description: sayDisableDescription }],
    ['random', { run: F.curry(random), flags: {}, description: randomDescription }],
];

export const commandMap: CommandMap = new Map(commandList);
