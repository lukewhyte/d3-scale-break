export default state => ({
    _isOutsideDomains: v => {
        const n = state.normalize;
        const [e0, e1]  = state.flip(state.getDomainExtent());
        return (n(v) < n(e0)) || (n(v) > n(e1));
    },
    _handleOutsideDomains: v => {
        const n = state.normalize;
        const d = state.domains;
        const extent  = state.getDomainExtent();
        const [firstIdx, lastIdx] = extent[1] < extent[0] ? [d.length -1, 0] : [0, d.length - 1];
        return n(state.flip(extent)[0]) > n(v) ? firstIdx : lastIdx;
    },
    mapValToIdx: v => {
        const n = state.normalize;
        return state._isOutsideDomains(v) ? state._handleOutsideDomains(v) : state.domains.findIndex(domain => {
            const [d0, d1] = state.flip(domain);
            return (n(v) >= n(d0)) && (n(v) <= n(d1)); 
        });
    },
    mapVal: val => {
        const idx = state.mapValToIdx(val);
        return idx === -1 ? state.unknown : state.getScale(idx)(val);
    },
});