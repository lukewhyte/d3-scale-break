import { interpolate } from "d3-interpolate";
import Listener from './listener-factory';

const _range = [0,100];

export const rangeSetter = state => ({
    listener: new Listener(state),
    set: range => {
        _range.splice(0, _range.length, ...range);
        state.range.listener.notifySubscribers();
        return _range.slice();
    },
});

export const rangeGetter = state => ({
    get: () => _range.slice(),
    getSlice: ([s0, s1]) => {
        const [r0, r1] = state.range.get();
        return (s1 < s0) ? [
            interpolate(r1, r0)(s0),
            interpolate(r1, r0)(s1)
        ] : [
            interpolate(r0, r1)(s0),
            interpolate(r0, r1)(s1)
        ];
    }, 
});

export default state => ({
    range: Object.assign(
        {},
        rangeSetter(state),
        rangeGetter(state),
    ),
})
