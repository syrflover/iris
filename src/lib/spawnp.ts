import { spawn } from 'child_process';

import * as F from 'nodekell';

export const spawnp = (
    c: string,
    a: string[],
    f: (data: string) => any = F.fnothing,
): Promise<{ stdout: string; stderr: string; time: number }> =>
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
                stdout,
                stderr,
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
