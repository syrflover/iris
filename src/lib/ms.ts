import mss = require('ms');

export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;
export const DAY = 86400000;

export const ms = (
    milliseconds: number,
    { long }: { long: boolean } = {
        long: true,
    },
) => {
    let mt = milliseconds;
    let result = '';

    if (mt >= DAY) {
        const t = Math.floor(mt / DAY) * DAY;

        result += `${mss(t, { long })} `;
        mt -= t;
    }

    if (mt >= HOUR) {
        const t = Math.floor(mt / HOUR) * HOUR;

        result += `${mss(t, { long })} `;
        mt -= t;
    }

    if (mt >= MINUTE) {
        const t = Math.floor(mt / MINUTE) * MINUTE;

        result += `${mss(t, { long })} `;
        mt -= t;
    }

    if (mt >= SECOND) {
        const t = Math.floor(mt / SECOND) * SECOND;

        result += `${mss(t, { long })} `;
        mt -= t;
    }

    if (mt > 0) {
        result += mss(mt, { long });
    }

    //     return `${result.trim()} ${mt > 0 ? `${mt} millisecond${mt > 1 ? 's' : ''}` : ''}`.trim();
    // return result.trim();

    return result.trim();
};
