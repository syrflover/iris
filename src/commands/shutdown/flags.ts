import { IFlags, Flag, IBaseCommandParseResult } from '@syrflover/command-parser';

export interface IShutdownCommandParseResult extends IBaseCommandParseResult {
    halt: boolean;
    reboot: boolean;
}

export const flags: IFlags = {
    halt: {
        short: 'h',
        type: Flag.boolean,
        default: false,
    },
    reboot: {
        short: 'r',
        type: Flag.boolean,
        default: false,
    },
};
