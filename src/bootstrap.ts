import { client } from './client';
import { env } from './env';
import { paths } from './lib/resolvePath';
import { mkdir } from './lib/mkdir';
import { sayStore } from './store/sayStore';

const bootstrap = async () => {
    try {
        // say cache directory
        await mkdir(paths.cache);

        // say session file
        await sayStore.initialize({});

        // connect discord gateway
        await client.login(env.DISCORD_TOKEN);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

bootstrap();
