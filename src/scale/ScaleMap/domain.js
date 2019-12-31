const normalize = (a, b) => {
    return (b -= (a = +a)) 
        ? (x => isNaN(x = +x) ? unknown : (x - a) / b)
        : (isNaN(b) ? NaN : 0.5);
};

export const domainSetter = state => {
    let listeners = [];
    return {
        addDomainListener: func => listeners.push(func),
        removeDomainListener: toRmv => listeners = listeners.filter(func => func !== toRmv),
        notifyDomainListeners: () => listeners.forEach(func => {
            state[func] ? state[func]() : state.removeDomainListener(func);
        }),
        setDomains: domains => {
            state.domains = domains;
            state.notifyDomainListeners();
            return state.domains;
        },
    };
};

export const domainGetter = state => ({
    getDomain: idx => state.domains[idx],
    getDomains: () => state.domains,
});

export const domainNormalizer = state => ({
    setNormalizer: () => {
        const { domains } = state;
        const len = domains.length;
        const d0 = domains[0][0];
        const d1 = domains[len - 1][domains[len - 1].length - 1];

        return state.normalize = (d1 < d0) ? normalize(d1, d0) : normalize(d0, d1);
    },
    normalize: () => {},
});
