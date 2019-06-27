import * as fs from 'fs';

export const mkdir = async (p: string) =>
    !fs.existsSync(p) ? await fs.promises.mkdir(p) : undefined;
