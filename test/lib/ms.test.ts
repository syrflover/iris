import { assert } from 'chai';

import { ms, DAY, HOUR, MINUTE, SECOND } from '../../src/lib/ms';

describe('test src/lib/ms.ts', () => {
    it('day hour minute second millisecond', () => {
        const r = ms(DAY + HOUR + MINUTE + SECOND + 720);

        assert.strictEqual(r, '1 day 1 hour 1 minute 1 second 720 milliseconds');
    });

    it('day / days, no milliseconds', () => {
        const r0 = ms(DAY);
        const r1 = ms(DAY * 2);

        assert.strictEqual(r0, '1 day');
        assert.strictEqual(r1, '2 days');
    });

    it('day / days, milliseconds', () => {
        const r0 = ms(DAY + 720);
        const r1 = ms(DAY * 2 + 720);

        assert.strictEqual(r0, '1 day 720 milliseconds');
        assert.strictEqual(r1, '2 days 720 milliseconds');
    });

    it('hour / hours, no milliseconds', () => {
        const r0 = ms(HOUR);
        const r1 = ms(HOUR * 2);

        assert.strictEqual(r0, '1 hour');
        assert.strictEqual(r1, '2 hours');
    });

    it('hour / hours, milliseconds', () => {
        const r0 = ms(HOUR + 720);
        const r1 = ms(HOUR * 2 + 720);

        assert.strictEqual(r0, '1 hour 720 milliseconds');
        assert.strictEqual(r1, '2 hours 720 milliseconds');
    });

    it('minute / minutes, no milliseconds', () => {
        const r0 = ms(MINUTE);
        const r1 = ms(MINUTE * 2);

        assert.strictEqual(r0, '1 minute');
        assert.strictEqual(r1, '2 minutes');
    });

    it('minute / minutes, milliseconds', () => {
        const r0 = ms(MINUTE + 720);
        const r1 = ms(MINUTE * 2 + 720);

        assert.strictEqual(r0, '1 minute 720 milliseconds');
        assert.strictEqual(r1, '2 minutes 720 milliseconds');
    });

    it('second / seconds, no milliseconds', () => {
        const r0 = ms(SECOND);
        const r1 = ms(SECOND * 2);

        assert.strictEqual(r0, '1 second');
        assert.strictEqual(r1, '2 seconds');
    });

    it('second / seconds, milliseconds', () => {
        const r0 = ms(SECOND + 720);
        const r1 = ms(SECOND * 2 + 720);

        assert.strictEqual(r0, '1 second 720 milliseconds');
        assert.strictEqual(r1, '2 seconds 720 milliseconds');
    });
});
