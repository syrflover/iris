import * as F from 'nodekell';

import { Message } from 'discord.js';

import { IFlags, IBaseCommandParseResult } from '../lib/commandParser';

import { uwu, uwuDescription } from './uwu';
import { state, stateDescription, stateFlags } from './state';
import { rm, rmDescription } from './rm';
import { leave, leaveDescription, leaveFlags } from './leave';
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

export type ContentInfo = {
    optional: boolean;
    name: string;
};

export type CommandInfo = {
    // FIX ME (TYPE ERROR)
    run: CurriedCommandFunc<any>;
    flags: IFlags;
    description: string;
    contents: ContentInfo[];
};

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    [
        'help',
        {
            run: F.curry(help),
            flags: {},
            description: helpDescription,
            contents: [{ optional: true, name: 'command' }],
        },
    ],
    [
        'uwu',
        {
            run: F.curry(uwu),
            flags: {},
            description: uwuDescription,
            contents: [{ optional: true, name: 'message' }],
        },
    ],
    [
        'state',
        {
            run: F.curry(state),
            flags: stateFlags,
            description: stateDescription,
            contents: [{ optional: true, name: 'mode' }, { optional: false, name: 'name' }],
        },
    ],
    [
        'rm',
        {
            run: F.curry(rm),
            flags: {},
            description: rmDescription,
            contents: [{ optional: false, name: 'count' }],
        },
    ],
    [
        'leave',
        {
            run: F.curry(leave),
            flags: leaveFlags,
            description: leaveDescription,
            contents: [],
        },
    ],
    [
        'say',
        {
            run: F.curry(say),
            flags: sayFlags,
            description: sayDescription,
            contents: [{ optional: false, name: 'message' }],
        },
    ],
    [
        'sayEnable',
        {
            run: F.curry(sayEnable),
            flags: sayEnableFlags,
            description: sayEnableDescription,
            contents: [],
        },
    ],
    [
        'sayDisable',
        {
            run: F.curry(sayDisable),
            flags: {},
            description: sayDisableDescription,
            contents: [],
        },
    ],
    [
        'random',
        {
            run: F.curry(random),
            flags: {},
            description: randomDescription,
            contents: [{ optional: true, name: 'beginOrEnd' }, { optional: true, name: 'end' }],
        },
    ],
];

export const commandMap: CommandMap = new Map(commandList);
