import { IFlags, Flag, IBaseCommandParseResult } from '../../lib/commandParser';

export interface ILeaveCommandParseResult extends IBaseCommandParseResult {
    all: boolean;
}

export const flags: IFlags = {
    all: {
        type: Flag.boolean,
        default: false,
    },
};
