import * as dotenv from 'dotenv';

export interface IEnv extends NodeJS.ProcessEnv {
    DISCORD_TOKEN: string;
}

const getEnv = () => {
    dotenv.config();

    return process.env as IEnv;
};

export const env = getEnv();
