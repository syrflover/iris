import { client } from './client';
import { env } from './env';
import { paths } from './lib/resolvePath';
import { mkdir } from './lib/mkdir';
import { sayStore } from './store/sayStore';

// say cache directory
try {
    mkdir(paths.cache);
} catch (error) {
    console.error(error);

    process.exit(1);
}

// say session file
sayStore.initialize().catch((e) => {
    console.error(e);

    process.exit(1);
});

// connect discord gateway
client.login(env.DISCORD_TOKEN).catch((error) => {
    console.error(error);

    process.exit(1);
});
