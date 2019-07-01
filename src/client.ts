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

client.once('error', (error) => {
    console.error(error);

    process.exit(1);
});

client.once('ready', () => {
    console.info('ready');

    /* let count = 0;

    F.interval(5000, () => {
        if (count > prefixes.length - 1) {
            count = 0;
        }

        const pf = prefixes[count++];

        client.user.setPresence({ game: { name: `${pf}help`, type: 'PLAYING' } });
    }); */
});

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
