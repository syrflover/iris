import { readFile } from 'simply-store';

import { resolvePath } from '../resolvePath';

export const getLastCommitID = (branch: string) =>
    new Promise(async (resolve, reject) => {
        const remoteOriginBranchPath = resolvePath(`.git/refs/remotes/origin/${branch}`);

        try {
            const commitID = await readFile(remoteOriginBranchPath, 'utf-8');
            resolve(commitID);
        } catch (error) {
            reject(error);
        }
    });
