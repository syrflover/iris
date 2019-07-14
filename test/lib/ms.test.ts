import { assert } from 'chai';

import { ms, DAY, HOUR, MINUTE, SECOND } from '../../src/lib/ms';

describe('test src/lib/ms.ts', () => {
    it('day hour minute second millisecond', () => {
        const r0 = ms(DAY + HOUR + MINUTE + SECOND + 1);
        const r1 = ms(DAY * 2 + HOUR * 2 + MINUTE * 2 + SECOND * 2 + 720);

        assert.strictEqual(r0, '1 day 1 hour 1 minute 1 second 1 millisecond');
        assert.strictEqual(r1, '2 days 2 hours 2 minutes 2 seconds 720 milliseconds');
    });

    it('only millisecond / milliseconds', () => {
        const r0 = ms(1);
        const r1 = ms(720);

        assert.strictEqual(r0, '1 millisecond');
        assert.strictEqual(r1, '720 milliseconds');
    });

    it('day / days, without milliseconds', () => {
        const r0 = ms(DAY);
        const r1 = ms(DAY * 2);

        assert.strictEqual(r0, '1 day');
        assert.strictEqual(r1, '2 days');
    });

    it('day / days, with milliseconds', () => {
        const r0 = ms(DAY + 720);
        const r1 = ms(DAY * 2 + 720);

        assert.strictEqual(r0, '1 day 720 milliseconds');
        assert.strictEqual(r1, '2 days 720 milliseconds');
    });

    it('hour / hours, without milliseconds', () => {
        const r0 = ms(HOUR);
        const r1 = ms(HOUR * 2);

        assert.strictEqual(r0, '1 hour');
        assert.strictEqual(r1, '2 hours');
    });

    it('hour / hours, with milliseconds', () => {
        const r0 = ms(HOUR + 720);
        const r1 = ms(HOUR * 2 + 720);

        assert.strictEqual(r0, '1 hour 720 milliseconds');
        assert.strictEqual(r1, '2 hours 720 milliseconds');
    });

    it('minute / minutes, without milliseconds', () => {
        const r0 = ms(MINUTE);
        const r1 = ms(MINUTE * 2);

        assert.strictEqual(r0, '1 minute');
        assert.strictEqual(r1, '2 minutes');
    });

    it('minute / minutes, with milliseconds', () => {
        const r0 = ms(MINUTE + 720);
        const r1 = ms(MINUTE * 2 + 720);

        assert.strictEqual(r0, '1 minute 720 milliseconds');
        assert.strictEqual(r1, '2 minutes 720 milliseconds');
    });

    it('second / seconds, without milliseconds', () => {
        const r0 = ms(SECOND);
        const r1 = ms(SECOND * 2);

        assert.strictEqual(r0, '1 second');
        assert.strictEqual(r1, '2 seconds');
    });

    it('second / seconds, with milliseconds', () => {
        const r0 = ms(SECOND + 720);
        const r1 = ms(SECOND * 2 + 720);

        assert.strictEqual(r0, '1 second 720 milliseconds');
        assert.strictEqual(r1, '2 seconds 720 milliseconds');
    });
});
