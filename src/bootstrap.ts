import { client } from './client';
import { env } from './env';
import { paths } from './lib/resolvePath';
import { sayStore } from './store/sayStore';
import { stateStore } from './store/stateStore';
import { mkdirp } from 'simply-store/build/lib/fs';

const bootstrap = async () => {
    try {
        // say cache directory
        await mkdirp(paths.cache);

        // say session file
        await sayStore.initialize({});

        // state store file
        await stateStore.initialize({ name: '> help', type: 'PLAYING' });

        // connect discord gateway
        await client.login(env.DISCORD_TOKEN);

        // sync state
        const { name, type } = await stateStore.read();
        await client.user.setPresence({
            game: {
                name,
                type,
            },
        });
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

bootstrap();
