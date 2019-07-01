/*
  https://github.com/facebook/create-react-app/blob/master/packages/create-react-app/createReactApp.js#L301
*/

import { exec } from 'child_process';

export const shouldUseYarn = (): Promise<boolean> =>
    new Promise((resolve, reject) => {
        exec('yarnpkg --version', (error) => resolve(!!error));
    });
