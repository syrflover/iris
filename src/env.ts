import * as fs from 'fs';

export interface IPingServerConfiguration {
    name: string;
    url: string;
}

export interface IEnv {
    [key: string]: any;
    NODE_ENV: string;
    DISCORD_TOKEN: string;
    OWNERS: string[];
    USE_SSH_IN_SH: boolean;
    SSH_USER_IP: string;
    SSH_PORT: string;
    SSH_KEY_PATH: string;
    SOUNDCLOUD_CLIENT_ID: string;
    EC2_INSTANCE_ID: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
}

const getEnv = () => {
    const e = fs.readFileSync('./.env.json', { encoding: 'utf8' });
    const parsed = JSON.parse(e);

    return {
        ...process.env,
        ...parsed,
    };
};

export const env = getEnv() as IEnv;
