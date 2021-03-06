import Listener from './listener-factory';

const getNewDomains = () => [[0,1]];

const d3Normalize = (a, b) => (b -= (a = +a)) 
    ? (x => isNaN(x = +x) ? undefined : (x - a) / b)
    : (isNaN(b) ? NaN : 0.5);

const setNormalizer = _domains => {
    try {
        const len = _domains.length;
        const d0 = _domains[0][0];
        const d1 = _domains[len - 1][_domains[len - 1].length - 1];
        return (d1 < d0) ? d3Normalize(d1, d0) : d3Normalize(d0, d1);
    } catch(e) {
        console.error(`Your domains could not be parsed. Check they are properly formatted. Err msg: ${e}`);
    }
};

const checkScopes = (state, domains) => {
    const scopes = state.scopes.getAll();
    if (scopes.length && scopes.length !== domains.length) {
        state.scopes.clear();
        console.error('domains: scopes.length does not match domains.length');
    }
};

export const domainSetter = (state, _domains) => ({
    listener: new Listener(state),
    normalize: setNormalizer(_domains),
    set: domains => {
        checkScopes(state, domains);
        _domains.splice(0, _domains.length, ...domains);
        state.domains.normalize = setNormalizer(_domains);
        state.domains.listener.notifySubscribers();
        return _domains.slice();
    },
});

export const domainGetter = (state, _domains) => ({
    get: idx => _domains[idx],
    getAll: () => _domains.slice(),
    getExtent: () => {
        const d = _domains;
        return [
            d[0][0],
            d[d.length - 1][d[d.length - 1].length - 1],
        ];
    },
});

export default state => {
    const _domains = getNewDomains();
    return {
        domains: Object.assign(
            {},
            domainSetter(state, _domains),
            domainGetter(state, _domains),
        ),
    };
};
