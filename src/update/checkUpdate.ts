import { getLastCommitID } from '../lib/git/getLastCommitID';
import { getRepositoryBranch } from '../lib/gitlab/getRepositoryBranch';

export const chekcUpdate = (
    gitlabURL: string,
    projectID: number,
    branch: string,
): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        try {
            const localID = await getLastCommitID(branch);
            const gitlabID = await getRepositoryBranch(gitlabURL, projectID, branch).then(
                (r) => r.commit.id,
            );

            resolve(localID !== gitlabID);
        } catch (error) {
            reject(error);
        }
    });
