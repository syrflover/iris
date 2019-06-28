export const enum Flag {
    float = 'float',
    int = 'int',
    string = 'string',
    // void,
}

export interface IFlags {
    [flag: string]: {
        type: Flag;
        default: any;
    };
}

export interface IBaseCommandParseResult {
    [flag: string]: any;
    content: string;
}

// export type Flags = [string, Flag][];

const parseParameter = (param: string, flag: { name: string; type: Flag }) => {
    const trimp = param.trim();

    switch (flag.type) {
        case Flag.float:
            const float = parseFloat(trimp);

            if (isNaN(float)) {
                throw new Error(`${flag.name} must be float`);
            }

            return float;
        case Flag.int:
            const int = parseInt(trimp, 10);

            if (isNaN(int)) {
                throw new Error(`${flag.name} must be int`);
            }

            return int;
        case Flag.string:
            return trimp;
        /*  case Flag.void:
              return ''; */
    }
};

export const commandParser = <R extends IBaseCommandParseResult = IBaseCommandParseResult>(
    input: string,
    flags: IFlags,
): R => {
    const st = input.split(' ').filter((e) => e.replace(/ /g, ''));

    const r = { content: input } as IBaseCommandParseResult;

    for (const flag in flags) {
        const flagIndex = st.findIndex((s) => s === `--${flag}`);

        const hasNotFlag = flagIndex === -1;

        const parameter = hasNotFlag
            ? flags[flag].default
            : parseParameter(st[flagIndex + 1], {
                  name: flag,
                  type: flags[flag].type,
              });

        r[flag] = parameter;
        r.content = r.content.replace(`--${flag} ${parameter}`, '').trim();
    }

    return r as R;
};
