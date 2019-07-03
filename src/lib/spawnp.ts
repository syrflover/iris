import { spawn } from 'child_process';

import * as F from 'nodekell';

export const spawnp = (
    c: string,
    a: string[],
    f: (data: string) => any = F.fnothing,
): Promise<{ result: string; time: number }> =>
    new Promise((resolve, reject) => {
        const begin = Date.now();

        const cmd = spawn(c, a);

        let stdout = '';
        let stderr = '';

        cmd.stdout.on('data', (buf: Buffer) => {
            const data = buf.toString();
            stdout += `${data}\n`;
            f(data);
        });

        cmd.stdout.on('error', (e) => {
            cmd.kill();
            reject(e);
        });

        cmd.stderr.on('data', (buf: Buffer) => {
            const data = buf.toString();
            stderr += `${data}\n`;
            f(data);
        });

        cmd.on('exit', () => {
            const end = Date.now();

            const r = {
                result: stderr.trim().length > 0 ? stderr : stdout,
                time: end - begin,
            };

            resolve(r);
        });

        cmd.stderr.on('error', (e) => {
            cmd.kill();
            reject(e);
        });

        cmd.on('error', (e) => {
            cmd.kill();
            reject(e);
        });
    });
