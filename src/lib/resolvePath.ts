import * as path from 'path';
import * as fs from 'fs';

export const resolvePath = (p: string) => {
    const appDir = fs.realpathSync(process.cwd());
    return path.resolve(appDir, p);
};

export const paths = {
    cache: resolvePath('.cache'),
};
