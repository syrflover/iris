import { spawn } from 'child_process';

import * as shortid from 'shortid';

import { paths } from './resolvePath';

export const siri = (content: string, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sayFile = `${paths.cache}/${shortid.generate()}.aiff`;
        const say = spawn('say', [`"${content}"`, '-v', name, '-o', sayFile]);

        say.stdout.on('end', () => {
            resolve(sayFile);
        });

        say.on('error', (error) => {
            reject(error);
        });

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
