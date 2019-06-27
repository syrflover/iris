import * as F from 'nodekell';

import { Message } from 'discord.js';

import { uwu, uwuH } from './uwu';
import { state, stateH } from './state';
import { rm, rmH } from './rm';
import { leave, leaveH } from './leave';
import { say, sayH } from './say';
import { sayEnable, sayEnableH } from './sayEnable';
import { sayDisable, sayDisableH } from './sayDisable';
import { help, helpH } from './help';
import { random, randomH } from './random';

export type CommandFunc = (
    parameter: string,
    message: Message,
) => Promise<void>;

export type CurriedCommandFunc = F.CurriedFunction2<
    string,
    Message,
    Promise<void>
>;

export type CommandInfo = { run: CurriedCommandFunc; description: string };

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    ['help', { run: F.curry(help), description: helpH }],
    ['uwu', { run: F.curry(uwu), description: uwuH }],
    ['state', { run: F.curry(state), description: stateH }],
    ['rm', { run: F.curry(rm), description: rmH }],
    ['leave', { run: F.curry(leave), description: leaveH }],
    ['say', { run: F.curry(say), description: sayH }],
    ['sayEnable', { run: F.curry(sayEnable), description: sayEnableH }],
    ['sayDisable', { run: F.curry(sayDisable), description: sayDisableH }],
    ['random', { run: F.curry(random), description: randomH }],
];

export const commandMap: CommandMap = new Map(commandList);
