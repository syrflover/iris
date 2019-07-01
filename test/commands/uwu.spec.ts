import { assert } from 'chai';
import { uwu } from '../../src/commands/uwu';
import { Message } from '../Message';
import { commandParser } from '../../src/lib/commandParser';

describe('test command uwu', () => {
    it('result', async () => {
        const command = commandParser('test message', {});
        const message = new Message() as any;

        const r = await uwu(command, message);

        assert.strictEqual(r, 'test message uwu');
    });
});
