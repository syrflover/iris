import * as F from 'nodekell';

import { Message } from 'discord.js';

import { IFlags, IBaseCommandParseResult } from '../lib/commandParser';

import { uwu, uwuUsage } from './uwu';
import { state, stateUsage } from './state';
import { rm, rmUsage } from './rm';
import { leave, leaveUsage } from './leave';
import { say, sayUsage, sayFlags } from './say';
import { sayEnable, sayEnableUsage, sayEnableFlags } from './sayEnable';
import { sayDisable, sayDisableUsage } from './sayDisable';
import { help, helpUsage } from './help';
import { random, randomUsage } from './random';

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
    usage: string;
};

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    ['help', { run: F.curry(help), flags: {}, usage: helpUsage }],
    ['uwu', { run: F.curry(uwu), flags: {}, usage: uwuUsage }],
    ['state', { run: F.curry(state), flags: {}, usage: stateUsage }],
    ['rm', { run: F.curry(rm), flags: {}, usage: rmUsage }],
    ['leave', { run: F.curry(leave), flags: {}, usage: leaveUsage }],
    ['say', { run: F.curry(say), flags: sayFlags, usage: sayUsage }],
    ['sayEnable', { run: F.curry(sayEnable), flags: sayEnableFlags, usage: sayEnableUsage }],
    ['sayDisable', { run: F.curry(sayDisable), flags: {}, usage: sayDisableUsage }],
    ['random', { run: F.curry(random), flags: {}, usage: randomUsage }],
];

export const commandMap: CommandMap = new Map(commandList);
