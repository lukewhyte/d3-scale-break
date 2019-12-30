import { interpolate } from 'd3-interpolate';

export const rangeSetter = state => ({
    setRange: range => state.range = range,
})

export const rangeGetter = state => ({
    getRange: domain => {
        const [d0, d1] = domain;
        const [r0, r1] = state.range;
        return (d1 < d0) ? [
            interpolate(r1, r0)(state.normalize(d0)),
            interpolate(r1, r0)(state.normalize(d1))
        ] : [
            interpolate(r0, r1)(state.normalize(d0)),
            interpolate(r0, r1)(state.normalize(d1))
        ];
    },
});
