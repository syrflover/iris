import type { Message } from 'discord.js';

import type { IFlags } from '@syrflover/command-parser';

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
import { node, nodeDescription } from './node';
import { sh, shDescription } from './sh';
import { shutdown, shutdownFlags, shutdownDescription } from './shutdown';
import { version, versionDescription } from './version';
import { uptime, uptimeDescription } from './uptime';
// import { image, imageDescription, imageFlags } from './image';
// import { ping, pingDescription } from './ping';
import { song, songDescription } from './song';
import { ec2, ec2Description } from './ec2';
import { pritunl, pritunlDescription } from './pritunl';

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
            contents: [{ optional: false, name: 'name' }],
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
            contents: [
                { optional: true, name: 'beginOrEnd' },
                { optional: true, name: 'end' },
            ],
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
        'node',
        {
            run: node,
            flags: {},
            description: nodeDescription,
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
    /* [
        'image',
        {
            run: image,
            flags: imageFlags,
            description: imageDescription,
            contents: [],
        },
    ], */
    /* [
        'ping',
        {
            run: ping,
            flags: {},
            description: pingDescription,
            contents: [{ optional: false, name: 'url' }],
        },
    ], */
    [
        'song',
        {
            run: song,
            flags: {},
            description: songDescription,
            contents: [{ optional: false, name: 'song_url' }],
        },
    ],
    [
        'ec2',
        {
            run: ec2,
            flags: {},
            description: ec2Description,
            contents: [{ optional: true, name: 'start or stop' }],
        },
    ],
    [
        'pritunl',
        {
            run: pritunl,
            flags: {},
            description: pritunlDescription,
            contents: [{ optional: false, name: 'pritunl-client command' }],
        },
    ],
];

export const commandMap: CommandMap = new Map(commandList);
