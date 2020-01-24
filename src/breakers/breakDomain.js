import { extent } from 'd3-array';

const low = e0 => point => point > e0;

const high = e1 => point => point < e1;

const isInExtent = (low, high) => point => low(point) && high(point);

const setDomain = (e0, e1, breaks) => breaks.reduce((r, b, i) => {
    r.push([
        b,
        breaks.length === (i + 1) ? e1 : breaks[i + 1]
    ]);
    return r;
}, [[e0, breaks[0]]]);

export default (data, points) => {
    const [e0, e1] = extent(data);
    const breaks = points.sort().filter(isInExtent(low(e0), high(e1)));
    return setDomain(e0, e1, breaks);
};
