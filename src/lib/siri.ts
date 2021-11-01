import * as fs from 'fs/promises';
import { spawn } from 'child_process';
import { createHash } from 'crypto';

import * as shortid from 'shortid';
import { logger } from '../logger';

import { paths } from './resolvePath';

const hash = (algorithm: string, ...xs: string[]) => {
    const hash = createHash(algorithm);

    xs.forEach((x) => hash.update(x));

    return hash.digest('hex');
};

const exists = (path: string) =>
    fs
        .access(path)
        .then(() => true)
        .catch(() => false);

export const siri = (content: string, name: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const hashed = hash('md5', name, content);
        const sayFile = `${paths.cache}/${hashed}.aiff`;

        if (await exists(sayFile)) {
            return resolve(sayFile);
        }

        let say;

        if (name == 'yuna') {
            say = spawn('say', [`"${content}"`, '-o', sayFile]);
        } else {
            say = spawn('say', [`"${content}"`, '-v', name, '-o', sayFile]);
        }

        let audioBuf;

        say.stdout.on('end', () => {
            resolve(sayFile);
        });

        say.on('error', (error) => {
            reject(error);
        });

        /* say.stdout.on('data', (data) => {
            // audioBuf = data;
            logger.log(data);
        }); */

        say.stdout.on('error', (error) => {
            reject(error);
        });

        say.stderr.on('error', (error) => {
            reject(error);
        });

        say.stderr.on('data', (data) => {
            reject(data);
        });
    });
};
