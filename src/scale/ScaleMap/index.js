import mapper from './map';
import domains from './domain';
import range from './range';
import scales from './scales';
import scopes from './scope';

const unit = [0, 1];

export const utils = state => ({
    get unknown() { return state._unknown },
    set unknown(name) { state._unknown = name; },
    flip: ([a, b]) => b < a ? [b, a] : [a, b],
});

export function LinearScaleMap(initDomains=[unit], initRange=unit) {
    let state = {
        scaleType: 'scaleLinear',
    };

    const init = state => {
        state.domains.set(initDomains);
        state.range.set(initRange);
        state.scales.set();

        state.domains.listener.addSubscriber('scales.set');
        state.range.listener.addSubscriber('scales.set');
        state.scopes.listener.addSubscriber('scales.set')

        return state;
    };

    return init(Object.assign(
        state,
        utils(state),
        mapper(state),
        domains(state),
        range(state),
        scales(state),
        scopes(state),
    ));
}
