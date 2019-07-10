import { IFlags, Flag, IBaseCommandParseResult } from 'command-parser';

export interface IImageCommandParseResult extends IBaseCommandParseResult {
    nsfw: boolean;
}

export const flags: IFlags = {
    nsfw: {
        type: Flag.boolean,
        default: false,
    },
};
