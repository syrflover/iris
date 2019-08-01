import * as F from 'nodekell';
import * as _ from 'lodash/fp';

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
import { env } from './env';
import { healthcheck } from './healthcheck';
import { stringifyJSON } from '@syrflover/simple-store';

export const client = new Discord.Client();

const prefixes = env.NODE_ENV === 'development' ? ['< ', 'illya.'] : ['> ', 'iris.'];

client.once('error', (error) => {
    console.error(error);

    process.exit(1);
});

client.once('ready', async () => {
    console.info('ready');

    const channel = client.channels.get(env.PING_NOTIFICATION_CHANNEL_ID) as Discord.TextChannel;

    // healthcheck
    F.interval(60e3, async () => {
        const isSuccess = (status_code: number) =>
            [200, 201, 202, 203, 204, 205, 206, 207, 208].includes(status_code);

        // send message on occurs error
        F.run(
            healthcheck(env.PING_SERVERS),
            _.filter((r) => !!r.error || !isSuccess(r.response ? r.response.status_code : 0)),
            F.then((r) => (r.length > 0 ? stringifyJSON(r, undefined, 4) : '')),
            F.then((r) => r.length > 0 && !!channel.send(`\`\`\`json\n${r}\`\`\``)),
        );
    });
});

client.on('message', (message) => {
    alwaysSay(prefixes, message).catch(catcher);

    F.run(
        message,
        // F.tap((m) => console.log(m.content)),
        toState(true),
        checkPrefix(prefixes),
        ignoreBot,
        checkCommand(commandMap),
        runCommand,
        success,
    ).catch(catcher);
});
