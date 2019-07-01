import { spawn } from 'child_process';

export const spawnp = (c: string, a: string[]): Promise<{ result: string; time: number }> =>
    new Promise((resolve, reject) => {
        const begin = Date.now();

        const cmd = spawn(c, a);

        let stdout = '';
        let stderr = '';

        cmd.stdout.on('data', (data: Buffer) => {
            stdout += `${data.toString()}\n`;
        });

        cmd.stdout.on('error', (e) => {
            cmd.kill();
            reject(e);
        });

        cmd.stderr.on('data', (d) => {
            stderr += `${d.toString()}\n`;
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
