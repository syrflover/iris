import { IFlags, Flag, IBaseCommandParseResult } from 'command-parser';

export interface ILeaveCommandParseResult extends IBaseCommandParseResult {
    all: boolean;
}

export const flags: IFlags = {
    all: {
        type: Flag.boolean,
        default: false,
    },
};
