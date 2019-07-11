import * as fs from 'fs';

export interface IEnv {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
    OWNER_ID: string;
    USE_SSH_IN_SH: boolean;
    SSH_USER_IP: string;
    SSH_PORT: string;
    SSH_KEY_PATH: string;
}

const getEnv = () => {
    const e = fs.readFileSync('./.env.json', { encoding: 'utf8' });
    const parsed = JSON.parse(e);

    return parsed as IEnv;
};

export const env = getEnv();
