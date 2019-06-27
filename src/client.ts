import * as F from 'nodekell';

import * as Discord from 'discord.js';

import { toState } from './state';
import { commandMap } from './commands';
import {
    ignoreBot,
    checkPrefix,
    checkCommand,
    runCommand,
    success,
    catcher,
} from './handler/message';
import { alwaysSay } from './lib/alwaysSay';

export const client = new Discord.Client();

const prefixes = ['> ', 'iris.'];

client.on('error', (error) => {
    console.error(error);

    process.exit(1);
});

client.on('ready', () => console.info('ready'));

client.on('message', (message) => {
    alwaysSay(prefixes, message).catch(catcher);

    F.run(
        message,
        // F.tap((m) => console.log(m.content)),
        toState(true),
        ignoreBot,
        checkPrefix(prefixes),
        checkCommand(commandMap),
        runCommand,
        success,
    ).catch(catcher);
});
