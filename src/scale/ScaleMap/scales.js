import * as scales from 'd3-scale';

let _scales = [];

export const scalesSetter = state => ({
    add: (domain, idx) => scales[state.scaleType](
        domain,
        state.range.getSlice(state.scopes.get(idx)),
    ),
    update: (domain, idx) => state.scales.get(idx).domain(domain).range(
        state.range.getSlice(state.scopes.get(idx)),
    ),
    set: () => _scales = state.domains.getAll().map((domain, idx) => {
        return state.scales.get(idx) ? state.scales.update(domain, idx) : state.scales.add(domain, idx);
    }),
});

export const scalesGetter = () => ({
    get: idx => _scales[idx],
    getAll: () => _scales,
});

export default state => ({
    scales: Object.assign(
        {},
        scalesSetter(state),
        scalesGetter(),
    ),
})
