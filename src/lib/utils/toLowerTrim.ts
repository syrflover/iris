import * as F from 'nodekell';
import * as R from 'ramda';

export const toLowerTrim = F.pipe(
    R.toLower,
    R.trim,
);
