import { IFlags, Flag, IBaseCommandParseResult } from '@syrflover/command-parser';

export interface IStateCommandParseResult extends IBaseCommandParseResult {
    type: string;
}

export const flags: IFlags = {
    type: {
        type: Flag.string,
        default: 'playing',
    },
};
