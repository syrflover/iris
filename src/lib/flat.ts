import { Flat } from 'nodekell';

export const flat = <T>(xs: T[]): Flat<Iterable<T>>[] => {
    const res: Flat<Iterable<T>>[] = [];

    for (const x of xs) {
        if (Array.isArray(x)) {
            for (const y of x) {
                res.push(y);
            }
        } else {
            res.push(x);
        }
    }

    return res;
};

// logger.debug(flat([1, 2, 3, [4, 5, 6]]));
