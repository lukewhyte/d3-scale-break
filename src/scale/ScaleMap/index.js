import mapper from './map';
import {
    domainGetter,
    domainSetter,
    domainNormalizer,
} from './domain';
import {
    rangeGetter,
    rangeSetter,
} from './range';
import {
    scalesSetter,
    scalesGetter,
} from './scales';
import {
    scopeSetter,
    scopeGetter,
} from './scope';

const unit = [0, 1];

export const utils = state => ({
    get unknown() { return state._unknown },
    set unknown(name) { state._unknown = name; },
    flip: ([a, b]) => b < a ? [b, a] : [a, b],
});

export function LinearScaleMap(domains=unit, range=unit) {
    let state = {
        _unknown: undefined,
        scaleType: 'scaleLinear',
        domains,
        range,
        scales: [],
        scopes: [],
    };

    const init = state => {
        state.setNormalizer();
        state.addDomainListener('setNormalizer');

        state.setScales();
        state.addDomainListener('setScales');
        state.addRangeListener('setScales');
        state.addScopeListener('setScales');

        state.addDomainListener('sanitizeScopes');
        return state;
    };

    return init(Object.assign(
        state,
        utils(state),
        mapper(state),
        domainGetter(state),
        domainSetter(state),
        domainNormalizer(state),
        rangeGetter(state),
        rangeSetter(state),
        scalesSetter(state),
        scalesGetter(state),
        scopeSetter(state),
        scopeGetter(state),
    ));
}
