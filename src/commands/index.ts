import * as F from 'nodekell';

import { Message } from 'discord.js';

import { IFlags, IBaseCommandParseResult } from '../lib/commandParser';

import { uwu, uwuDescription } from './uwu';
import { state, stateDescription, stateFlags } from './state';
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
    requireContent: boolean;
};

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    ['help', { run: F.curry(help), flags: {}, description: helpDescription, requireContent: true }],
    ['uwu', { run: F.curry(uwu), flags: {}, description: uwuDescription, requireContent: true }],
    [
        'state',
        {
            run: F.curry(state),
            flags: stateFlags,
            description: stateDescription,
            requireContent: true,
        },
    ],
    ['rm', { run: F.curry(rm), flags: {}, description: rmDescription, requireContent: true }],
    [
        'leave',
        {
            run: F.curry(leave),
            flags: {},
            description: leaveDescription,
            requireContent: false,
        },
    ],
    [
        'say',
        { run: F.curry(say), flags: sayFlags, description: sayDescription, requireContent: true },
    ],
    [
        'sayEnable',
        {
            run: F.curry(sayEnable),
            flags: sayEnableFlags,
            description: sayEnableDescription,
            requireContent: false,
        },
    ],
    [
        'sayDisable',
        {
            run: F.curry(sayDisable),
            flags: {},
            description: sayDisableDescription,
            requireContent: false,
        },
    ],
    [
        'random',
        { run: F.curry(random), flags: {}, description: randomDescription, requireContent: true },
    ],
];

export const commandMap: CommandMap = new Map(commandList);
