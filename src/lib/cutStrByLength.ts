export const cutStrByLength = async (str: string, len: number): Promise<string[]> => {
    if (str.length < len) {
        return [str];
    }
    return [str.slice(0, len - 1), ...(await cutStrByLength(str.slice(len - 1, -1), len))];
};
