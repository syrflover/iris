import * as F from 'nodekell';

import { Message } from 'discord.js';

import { uwu } from './uwu';
import { state } from './state';
import { rm } from './rm';
import { leave } from './leave';
import { say } from './say';
import { sayEnable } from './sayEnable';
import { sayDisable } from './sayDisable';
import { help } from './help';
import { random } from './random';

export type CommandFunc = (parameter: string, message: Message) => Promise<any>;

export type CurriedCommandFunc = F.CurriedFunction2<
    string,
    Message,
    Promise<any>
>;

export type CommandInfo = { run: CurriedCommandFunc; description: string };

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    ['help', { run: F.curry(help), description: 'help' }],
    ['uwu', { run: F.curry(uwu), description: 'uwu' }],
    ['state', { run: F.curry(state), description: 'state' }],
    ['rm', { run: F.curry(rm), description: 'rm' }],
    ['leave', { run: F.curry(leave), description: 'leave' }],
    ['say', { run: F.curry(say), description: 'say' }],
    ['sayEnable', { run: F.curry(sayEnable), description: 'sayEnable' }],
    ['sayDisable', { run: F.curry(sayDisable), description: 'sayDisable' }],
    ['random', { run: F.curry(random), description: 'random' }],
];

export const commandMap: CommandMap = new Map(commandList);
