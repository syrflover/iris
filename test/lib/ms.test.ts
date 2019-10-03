import { assert } from 'chai';

import { ms, DAY, HOUR, MINUTE, SECOND } from '../../src/lib/ms';

describe('test src/lib/ms.ts', () => {
    it('day hour minute second ms', () => {
        const r0 = ms(DAY + HOUR + MINUTE + SECOND + 1, { long: true });
        const r1 = ms(DAY * 2 + HOUR * 2 + MINUTE * 2 + SECOND * 2 + 720, { long: true });

        assert.strictEqual(r0, '1 day 1 hour 1 minute 1 second 1 ms');
        assert.strictEqual(r1, '2 days 2 hours 2 minutes 2 seconds 720 ms');
    });

    it('only ms', () => {
        const r0 = ms(1, { long: true });
        const r1 = ms(720, { long: true });

        assert.strictEqual(r0, '1 ms');
        assert.strictEqual(r1, '720 ms');
    });

    it('day / days, without ms', () => {
        const r0 = ms(DAY, { long: true });
        const r1 = ms(DAY * 2, { long: true });

        assert.strictEqual(r0, '1 day');
        assert.strictEqual(r1, '2 days');
    });

    it('day / days, with ms', () => {
        const r0 = ms(DAY + 720, { long: true });
        const r1 = ms(DAY * 2 + 720, { long: true });

        assert.strictEqual(r0, '1 day 720 ms');
        assert.strictEqual(r1, '2 days 720 ms');
    });

    it('hour / hours, without ms', () => {
        const r0 = ms(HOUR, { long: true });
        const r1 = ms(HOUR * 2, { long: true });

        assert.strictEqual(r0, '1 hour');
        assert.strictEqual(r1, '2 hours');
    });

    it('hour / hours, with ms', () => {
        const r0 = ms(HOUR + 720, { long: true });
        const r1 = ms(HOUR * 2 + 720, { long: true });

        assert.strictEqual(r0, '1 hour 720 ms');
        assert.strictEqual(r1, '2 hours 720 ms');
    });

    it('minute / minutes, without ms', () => {
        const r0 = ms(MINUTE, { long: true });
        const r1 = ms(MINUTE * 2, { long: true });

        assert.strictEqual(r0, '1 minute');
        assert.strictEqual(r1, '2 minutes');
    });

    it('minute / minutes, with ms', () => {
        const r0 = ms(MINUTE + 720, { long: true });
        const r1 = ms(MINUTE * 2 + 720, { long: true });

        assert.strictEqual(r0, '1 minute 720 ms');
        assert.strictEqual(r1, '2 minutes 720 ms');
    });

    it('second / seconds, without ms', () => {
        const r0 = ms(SECOND, { long: true });
        const r1 = ms(SECOND * 2, { long: true });

        assert.strictEqual(r0, '1 second');
        assert.strictEqual(r1, '2 seconds');
    });

    it('second / seconds, with ms', () => {
        const r0 = ms(SECOND + 720, { long: true });
        const r1 = ms(SECOND * 2 + 720, { long: true });

        assert.strictEqual(r0, '1 second 720 ms');
        assert.strictEqual(r1, '2 seconds 720 ms');
    });
});
