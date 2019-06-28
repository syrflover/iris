import { assert } from 'chai';

import { commandParser, IFlags, Flag, IBaseCommandParseResult } from '../../src/lib/commandParser';

describe('test commandParser', () => {
    it('default value', () => {
        interface IResult extends IBaseCommandParseResult {
            int: number;
            float: number;
            string: string;
            boolean: boolean;
        }

        const input = 'hello world';

        const flags: IFlags = {
            int: {
                type: Flag.int,
                default: 23,
            },
            float: {
                type: Flag.float,
                default: 21.4,
            },
            string: {
                type: Flag.string,
                default: 'default',
            },
            boolean: {
                type: Flag.boolean,
                default: false,
            },
        };

        const result = commandParser<IResult>(input, flags);

        assert.deepStrictEqual(result, {
            content: 'hello world',
            int: 23,
            float: 21.4,
            string: 'default',
            boolean: false,
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

        it('true', () => {
            interface IResult extends IBaseCommandParseResult {
                boolean: boolean;
            }

            const input = '--boolean hello world';

            const flags: IFlags = {
                boolean: {
                    type: Flag.boolean,
                    default: false,
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'hello world',
                boolean: true,
            });
        });

        it('false', () => {
            interface IResult extends IBaseCommandParseResult {
                boolean: boolean;
            }

            const input = '--boolean false hello world';

            const flags: IFlags = {
                boolean: {
                    type: Flag.boolean,
                    default: true,
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'hello world',
                boolean: false,
            });
        });
    });

    describe('multiple flags', () => {
        it('int float string boolean', () => {
            interface IResult extends IBaseCommandParseResult {
                int: number;
                float: number;
                string: string;
                boolean: boolean;
            }

            const input = '--int 132 --float 1.8 --string Lois --boolean Revive City';

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
                boolean: {
                    type: Flag.boolean,
                    default: false,
                },
            };

            const result = commandParser<IResult>(input, flags);

            assert.deepStrictEqual(result, {
                content: 'Revive City',
                int: 132,
                float: 1.8,
                string: 'Lois',
                boolean: true,
            });
        });
    });

    describe('throw error', () => {
        it('must be float', (done) => {
            interface IResult extends IBaseCommandParseResult {
                float: number;
            }

            const input = '--float abc hello world';

            const flags: IFlags = {
                float: {
                    type: Flag.float,
                    default: 0,
                },
            };

            try {
                const result = commandParser<IResult>(input, flags);
            } catch (error) {
                if (error.message === 'float must be float') {
                    done();
                }
            }
        });

        it('must be int', (done) => {
            interface IResult extends IBaseCommandParseResult {
                int: number;
            }

            const input = '--int abc hello world';

            const flags: IFlags = {
                int: {
                    type: Flag.int,
                    default: 0,
                },
            };

            try {
                const result = commandParser<IResult>(input, flags);
            } catch (error) {
                if (error.message === 'int must be int') {
                    done();
                }
            }
        });
    });
});
