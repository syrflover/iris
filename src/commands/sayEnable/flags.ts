import { IFlags, Flag, IBaseCommandParseResult } from '../../lib/commandParser';

export interface ISayEnableCommandParseResult extends IBaseCommandParseResult {
    effect: number;
    name: string;
}

export const flags: IFlags = {
    effect: {
        type: Flag.int,
        default: 0,
    },
    name: {
        type: Flag.string,
        default: 'yuna',
    },
};
