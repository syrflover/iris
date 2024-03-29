import '@syrflover/iterator/dist/types/global';

import * as fs from 'fs/promises';

import { client } from './client';
import { env } from './env';
import { paths } from './lib/resolvePath';
import { sayStore } from './store/sayStore';
import { stateStore } from './store/stateStore';
import { mkdirp } from '@syrflover/simple-store/build/lib/fs';
import { logger } from './logger';

const bootstrap = async () => {
    try {
        // say cache directory
        // await mkdirp('./.cache');
        await fs.mkdir(paths.cache, { recursive: true });

        // say session file
        await sayStore.initialize({});

        // state store file
        await stateStore.initialize({ name: '> help', type: 'PLAYING' });

        // connect discord gateway
        await client.login(env.DISCORD_TOKEN);
    } catch (error: any) {
        logger.error(error);

        process.exit(1);
    }
};

bootstrap();
