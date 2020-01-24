export default state => ({
    _isOutsideDomains: v => {
        const n = state.domains.normalize;
        const [e0, e1]  = state.flip(state.domains.getExtent());
        return (n(v) < n(e0)) || (n(v) > n(e1));
    },
    _handleOutsideDomains: v => {
        const n = state.domains.normalize;
        const d = state.domains.getAll();
        const extent  = state.domains.getExtent();
        const [firstIdx, lastIdx] = extent[1] < extent[0] ? [d.length -1, 0] : [0, d.length - 1];
        return n(state.flip(extent)[0]) > n(v) ? firstIdx : lastIdx;
    },
    mapValToIdx: v => {
        const n = state.domains.normalize;
        return state._isOutsideDomains(v) ? state._handleOutsideDomains(v) : state.domains.getAll().findIndex(domain => {
            const [d0, d1] = state.flip(domain);
            return (n(v) >= n(d0)) && (n(v) <= n(d1)); 
        });
    },
    mapVal: val => {
        const idx = state.mapValToIdx(val);
        return idx === -1 ? state.unknown : state.scales.get(idx)(val);
    },
});
