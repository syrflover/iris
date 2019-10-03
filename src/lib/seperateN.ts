/**
 * @param {Number} xs target
 * @param {Number} n standard point
 *
 * @example
 * const r = seperateN(230, 99);
 * assert.deepStrictEqual([99, 99, 32], r);
 */

export const seperateN = async function* (
    xs: number,
    n: number,
    r: number[] = [],
): AsyncIterableIterator<number> {
    const notOverN = xs <= n;

    if (notOverN) {
        yield* [...r, xs];
    } else {
        yield* seperateN(xs - n, n, [...r, n]);
    }
};

/* export const seperateN = (xs: number, n: number, r: number[] = []): Promise<number[]> =>
    new Promise((resolve, reject) => {
        const notOverN = xs <= n;

        if (notOverN) {
            resolve([...r, xs]);
            return;
        }
        resolve(seperateN(xs - n, n, [...r, 99]));
    }); */

/* (async () => {
    for await (const e of seperateN(230, 99)) {
        console.log(e);
    }
})(); */
