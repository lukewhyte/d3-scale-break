import * as scales from 'd3-scale';

const getNewScales = () => [];

export const scalesSetter = (state, _scales) => ({
    add: (domain, idx) => scales[state.scaleType](
        domain,
        state.range.getSlice(state.scopes.get(idx)),
    ),
    update: (domain, idx) => state.scales.get(idx).domain(domain).range(
        state.range.getSlice(state.scopes.get(idx)),
    ),
    set: () => {
        const scales = state.domains.getAll().map((domain, idx) => {
            return state.scales.get(idx) ? state.scales.update(domain, idx) : state.scales.add(domain, idx);
        });
        return _scales.splice(0, scales.length, ...scales);
    },
});

export const scalesGetter = (state, _scales) => ({
    get: idx => _scales[idx],
    getAll: () => _scales,
});

export default state => {
    const _scales = getNewScales();
    return {
        scales: Object.assign(
            {},
            scalesSetter(state, _scales),
            scalesGetter(state, _scales),
        ),
    };
};
