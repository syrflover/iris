import { IFlags, Flag, IBaseCommandParseResult } from '@syrflover/command-parser';

export interface ISayCommandParseResult extends IBaseCommandParseResult {
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
