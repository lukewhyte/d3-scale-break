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

export const mapper = state => ({
    mapValToIdx: val => state.domains.findIndex(([d0, d1]) => {
        const n = state.normalize;
        return (d1 < d0) ? (n(val) >= n(d1)) && (n(val) <= n(d0)) : (n(val) >= n(d0)) && (n(val) <= n(d1)); 
    }),
    mapValToRange: val => state.getScale(
        state.mapValToIdx(val)
    )(val),
});

export function LinearScaleMap(domains=unit, range=unit) {
    let state = {
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
