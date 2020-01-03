import { interpolate as interpolateValue } from "d3-interpolate";

export const interpolateSetter = state => {
    let listeners = [];
    return {
        addInterpolateListener: func => listeners.push(func),
        removeInterpolateListener: toRmv => listeners = listeners.filter(func => func !== toRmv),
        notifyInterpolateListeners: () => listeners.forEach(func => {
            state[func] ? state[func]() : state.removeInterpolateListener(func);
        }),
        setInterpolator: (interpolator=interpolateValue) => {
            state.interpolator = interpolator;
            state.notifyInterpolateListeners();
            return state.interpolator;
        },
    };
};

export const interpolateGetter = state => ({
    getInterpolator: () => state.interpolator ? state.interpolator : state.setInterpolator(),
});
