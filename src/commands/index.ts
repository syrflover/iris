import * as F from 'nodekell';

import { Message } from 'discord.js';

import { uwu } from './uwu';
import { state } from './state';
import { rm } from './rm';
import { leave } from './leave';
import { say } from './say';
import { sayEnable } from './sayEnable';
import { sayDisable } from './sayDisable';

export type CommandFunc = (parameter: string, message: Message) => Promise<any>;

export type CurriedCommandFunc = F.CurriedFunction2<
    string,
    Message,
    Promise<any>
>;

export type CommandInfo = { run: CurriedCommandFunc; help: string };

export type CommandMap = Map<string, CommandInfo>;

const commandList: [string, CommandInfo][] = [
    ['uwu', { run: F.curry(uwu), help: 'uwu' }],
    ['state', { run: F.curry(state), help: 'state' }],
    ['rm', { run: F.curry(rm), help: 'rm' }],
    ['leave', { run: F.curry(leave), help: 'leave' }],
    ['say', { run: F.curry(say), help: 'say' }],
    ['sayenable', { run: F.curry(sayEnable), help: 'sayEnable' }],
    ['saydisable', { run: F.curry(sayDisable), help: 'sayDisable' }],
];

export const commands: CommandMap = new Map(commandList);
