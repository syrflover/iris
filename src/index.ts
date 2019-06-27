import * as F from 'nodekell';

import * as Discord from 'discord.js';

import { env } from './env';
import { toState } from './state';
import { commands } from './commands';
import {
    ignoreBot,
    checkPrefix,
    checkCommand,
    runCommand,
    success,
    catcher,
} from './handler/message';
import { mkdir } from './lib/mkdir';
import { paths } from './lib/resolvePath';

const client = new Discord.Client();

const prefixes = ['> ', 'iris.'];

try {
    mkdir(paths.cache);
} catch (e) {
    console.error(e);

    process.exit(1);
}

client.login(env.DISCORD_TOKEN).catch((error) => {
    console.error(error);

    process.exit(1);
});

client.on('error', (error) => {
    console.error(error);

    process.exit(1);
});

client.on('ready', () => console.info('ready'));

client.on('message', (message) => {
    F.run(
        message,
        // F.tap((m) => console.log(m.content)),
        toState(true),
        ignoreBot,
        checkPrefix(prefixes),
        checkCommand(commands),
        runCommand,
        success,
    ).catch(catcher);
});
