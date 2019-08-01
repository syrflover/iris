import * as F from 'nodekell';
import * as _ from 'lodash/fp';

import { IPingServerConfiguration } from '../env';
import { request } from '../lib/request';

export const healthcheck = F.pipe(
    (a: IPingServerConfiguration[]) => a,
    _.map(({ url }) => url),
    request,
    // F.tap(saveRequestResult(env.PING_SERVERS)),
    /* requestResultToEmbed(client, env.PING_SERVERS),
    (e) => channel.send(e), */
);
