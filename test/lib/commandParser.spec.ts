import { assert } from 'chai';

import {
    commandParser,
    IFlags,
    Flag,
    IBaseCommandParseResult,
} from '../../src/lib/commandParser';

describe('commandParser test', () => {
    it('default value', () => {
        interface IResult extends IBaseCommandParseResult {
            effect: number;
            name: string;
        }

        const input = 'hello world';

        const flags: IFlags = {
            effect: {
                type: Flag.float,
                default: 0,
            },
            name: {
                type: Flag.string,
                default: 'yuna',
            },
        };

        const result = commandParser<IResult>(input, flags);

        assert.deepStrictEqual(result, {
            content: 'hello world',
            name: 'yuna',
            effect: 0,
        });
    });

    describe('single flag', () => {
        it('int', () => {
            interface IResult extends IBaseCommandParseResult {
                effect: number;
            }

            const input = '--effect 1 hello world';

            const flags: IFlags = {
                effect: {
                    type: Flag.int,
                    default: 0,
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'hello world',
                effect: 1,
            });
        });

        it('float', () => {
            interface IResult extends IBaseCommandParseResult {
                effect: number;
            }

            const input = '--effect 1.3 hello world';

            const flags: IFlags = {
                effect: {
                    type: Flag.float,
                    default: 0,
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'hello world',
                effect: 1.3,
            });
        });

        it('string', () => {
            interface IResult extends IBaseCommandParseResult {
                name: string;
            }

            const input = '--name chorong hello world';

            const flags: IFlags = {
                name: {
                    type: Flag.string,
                    default: 'yuna',
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'hello world',
                name: 'chorong',
            });
        });
    });

    describe('multiple flag', () => {
        it('int float string', () => {
            interface IResult extends IBaseCommandParseResult {
                int: number;
                float: number;
                string: string;
            }

            const input = '--int 132 --float 1.8 --string Lois Revive City';

            const flags: IFlags = {
                int: {
                    type: Flag.int,
                    default: 0,
                },
                float: {
                    type: Flag.float,
                    default: 0,
                },
                string: {
                    type: Flag.string,
                    default: 'Night',
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'Revive City',
                int: 132,
                float: 1.8,
                string: 'Lois',
            });
        });
    });
});
