import * as scales from 'd3-scale';

export const scalesSetter = state => ({
    addScale: (domain, idx) => {
        const { scaleType } = state;
        return scales[scaleType](
            domain,
            state.getRange(idx)
        );
    },
    updateScale: (domain, idx) => state.getScale(idx).domain(domain).range(
        state.getRange(idx)
    ),
    setScales: () => state.scales = state.domains.map((domain, idx) => {
        return state.getScale(idx) ? state.updateScale(domain, idx) : state.addScale(domain, idx);
    }),
});

export const scalesGetter = state => ({
    getScale: idx => state.scales[idx],
    getScales: () => state.scales,
});