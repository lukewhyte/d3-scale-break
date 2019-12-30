const constant = x => () => x;

const normalize = (a, b) => {
    return (b -= (a = +a)) 
        ? x => (x - a) / b 
        : constant(isNaN(b) ? NaN : 0.5);
};

export const domainSetter = state => {
    let listeners = [];
    return {
        addDomainListener: func => listeners.push(func),
        removeDomainListener: toRmv => listeners = listeners.filter(func => func !== toRmv),
        notifyDomainListeners: () => listeners.forEach(func => state[func]()),
        setDomains: domains => {
            state.domains = domains;
            state.notifyDomainListeners();
            return state.domains;
        },
    };
};

export const domainGetter = state => ({
    getDomain: idx => state.domains[idx],
    getAllDomains: () => state.domains,
});

export const domainNormalizer = state => ({
    setNormalizer: () => {
        const { domains } = state;
        const len = domains.length;
        const d0 = domains[0][0];
        const d1 = domains[len - 1][domains[len - 1].length - 1];

        state.removeDomainListener('setNormalizer');
        state.addDomainListener('setNormalizer');

        return state.normalize = (d1 < d0) ? normalize(d1, d0) : normalize(d0, d1);
    },
    normalize: () => {},
});
