import * as F from 'nodekell';

import { Message } from 'discord.js';

import { IFlags, IBaseCommandParseResult } from 'command-parser';

import { uwu, uwuDescription } from './uwu';
import { state, stateDescription, stateFlags } from './state';
import { rm, rmDescription } from './rm';
import { leave, leaveDescription, leaveFlags } from './leave';
import { say, sayDescription, sayFlags } from './say';
import { sayEnable, sayEnableDescription, sayEnableFlags } from './sayEnable';
import { sayDisable, sayDisableDescription } from './sayDisable';
import { help, helpDescription } from './help';
import { random, randomDescription } from './random';
import { update, updateDescription } from './update';
import { host, hostDescription } from './host';
import { repl, replDescription } from './repl';
import { sh, shDescription } from './sh';
import { shutdown, shutdownFlags, shutdownDescription } from './shutdown';
import { version, versionDescription } from './version';
import { uptime, uptimeDescription } from './uptime';
import { image, imageDescription, imageFlags } from './image';

export type CommandFunc<C, R = any> = (commandParseResult: C, message: Message) => Promise<R>;

export type ContentInfo = {
    optional: boolean;
    name: string;
};

export type CommandInfo = {
    // FIX ME (TYPE ERROR)
    run: CommandFunc<any>;
    flags: IFlags;
    description: string | (() => Promise<string> | string);
    contents: ContentInfo[];
    owner?: boolean;
    onlyProd?: boolean;
};

export type CommandMap = Map<string, CommandInfo>;

export const commandList: [string, CommandInfo][] = [
    [
        'help',
        {
            run: help,
            flags: {},
            description: helpDescription,
            contents: [{ optional: true, name: 'command' }],
        },
    ],
    [
        'uwu',
        {
            run: uwu,
            flags: {},
            description: uwuDescription,
            contents: [{ optional: true, name: 'message' }],
        },
    ],
    [
        'state',
        {
            run: state,
            flags: stateFlags,
            description: stateDescription,
            contents: [{ optional: true, name: 'mode' }, { optional: false, name: 'name' }],
            owner: true,
        },
    ],
    [
        'rm',
        {
            run: rm,
            flags: {},
            description: rmDescription,
            contents: [{ optional: false, name: 'count' }],
        },
    ],
    [
        'leave',
        {
            run: leave,
            flags: leaveFlags,
            description: leaveDescription,
            contents: [],
        },
    ],
    [
        'say',
        {
            run: say,
            flags: sayFlags,
            description: sayDescription,
            contents: [{ optional: false, name: 'message' }],
        },
    ],
    [
        'sayEnable',
        {
            run: sayEnable,
            flags: sayEnableFlags,
            description: sayEnableDescription,
            contents: [],
        },
    ],
    [
        'sayDisable',
        {
            run: sayDisable,
            flags: {},
            description: sayDisableDescription,
            contents: [],
        },
    ],
    [
        'random',
        {
            run: random,
            flags: {},
            description: randomDescription,
            contents: [{ optional: true, name: 'beginOrEnd' }, { optional: true, name: 'end' }],
        },
    ],
    [
        'update',
        {
            run: update,
            flags: {},
            description: updateDescription,
            contents: [],
            owner: true,
            onlyProd: true,
        },
    ],
    [
        'host',
        {
            run: host,
            flags: {},
            description: hostDescription,
            contents: [],
        },
    ],
    [
        'repl',
        {
            run: repl,
            flags: {},
            description: replDescription,
            contents: [{ optional: false, name: 'code' }],
            owner: true,
        },
    ],
    [
        'sh',
        {
            run: sh,
            flags: {},
            description: shDescription,
            contents: [{ optional: false, name: 'shell' }],
            owner: true,
        },
    ],
    [
        'shutdown',
        {
            run: shutdown,
            flags: shutdownFlags,
            description: shutdownDescription,
            contents: [],
            owner: true,
            onlyProd: true,
        },
    ],
    [
        'version',
        {
            run: version,
            flags: {},
            description: versionDescription,
            contents: [],
        },
    ],
    [
        'uptime',
        {
            run: uptime,
            flags: {},
            description: uptimeDescription,
            contents: [],
        },
    ],
    [
        'image',
        {
            run: image,
            flags: imageFlags,
            description: imageDescription,
            contents: [],
        },
    ],
];

export const commandMap: CommandMap = new Map(commandList);
