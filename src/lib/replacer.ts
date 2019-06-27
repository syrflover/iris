export const replacer = (
    replaceStrings: [RegExp | string, string][],
    s: string,
    index: number = 0,
): string => {
    const r = s.replace(replaceStrings[index][0], replaceStrings[index][1]);

    if (replaceStrings.length <= index + 1) {
        return r;
    }
    return replacer(replaceStrings, r, index + 1);
};
