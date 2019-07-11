import { IFlags, Flag, IBaseCommandParseResult } from 'command-parser';

export interface IImageCommandParseResult extends IBaseCommandParseResult {
    nsfw: boolean;
    date: string | null;
}

export const flags: IFlags = {
    nsfw: {
        type: Flag.boolean,
        default: false,
    },
    // YYYYMMDD 20190712
    date: {
        type: Flag.string,
        default: null,
    },
};
