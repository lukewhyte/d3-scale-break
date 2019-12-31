import { interpolate } from 'd3-interpolate';

const getScope = (idx, state) => {
    if (state.getScope && state.getScope(idx)) {
        return state.getScope(idx);
    } else {
        const [d0, d1] = state.getDomain(idx);
        return [state.normalize(d0), state.normalize(d1)];
    }
};

export const rangeSetter = state => {
    let listeners = [];
    return {
        addRangeListener: func => listeners.push(func),
        removeRangeListener: toRmv => listeners = listeners.filter(func => func !== toRmv),
        notifyRangeListeners: () => listeners.forEach(func => {
            state[func] ? state[func]() : state.removeRangeListener(func);
        }),
        setRange: range => {
            state.range = range;
            state.notifyRangeListeners();
            return state.range;
        },
    }
};

export const rangeGetter = state => ({
    getRange: idx => {
        state.getScale(idx);
        const [d0, d1] = getScope(idx, state);
        const [r0, r1] = state.range;
        return (d1 < d0) ? [
            interpolate(r1, r0)(d0),
            interpolate(r1, r0)(d1)
        ] : [
            interpolate(r0, r1)(d0),
            interpolate(r0, r1)(d1)
        ];
    },
});
