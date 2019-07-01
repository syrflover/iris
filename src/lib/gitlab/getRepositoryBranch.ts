import axios from 'axios';
import { env } from '../../env';

export interface IGitLabRepositoryBranch {
    name: string;
    merged: boolean;
    protected: boolean;
    default: boolean;
    developers_can_push: boolean;
    developers_can_merge: boolean;
    can_push: boolean;
    commit: {
        author_email: string; // "john@example.com";
        author_name: string; // "John Smith";
        authored_date: string; // "2012-06-27T05:51:39-07:00";
        committed_date: string; // "2012-06-28T03:44:20-07:00";
        committer_email: string; // "john@example.com";
        committer_name: string; // "John Smith";
        id: string; // "7b5c3cc8be40ee161ae89a06bba6229da1032a0c";
        short_id: string; // "7b5c3cc";
        title: string; // "add projects API";
        message: string; // "add projects API";
        parent_ids: string[];
    };
}

// export function getRepositoryBranch(gitlabURL: string, id: number): any;
export const getRepositoryBranch = (
    gitlabURL: string,
    id: number,
    branch: string,
): Promise<IGitLabRepositoryBranch> =>
    new Promise(async (resolve, reject) => {
        //     /projects/:id/repository/branches/:branch
        try {
            const result = await axios
                .get(`${gitlabURL}/api/v4/projects/${id}/repository/branches/${branch}`, {
                    headers: {
                        'private-token': env.GITLAB_TOKEN,
                    },
                })
                .then((r) => r.data);

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });

// getRepositoryBranch('https://git.meu.works', 70, 'master').then(console.log);
