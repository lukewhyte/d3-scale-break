const normalize = (a, b) => (b -= (a = +a)) 
    ? (x => isNaN(x = +x) ? undefined : (x - a) / b)
    : (isNaN(b) ? NaN : 0.5);

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
    getDomainExtent: () => {
        const d = state.domains;
        return [
            d[0][0],
            d[d.length - 1][d[d.length - 1].length - 1],
        ];
    },
});

export const domainNormalizer = state => ({
    setNormalizer: () => {
        const { domains } = state;
        try {
            const len = domains.length;
            const d0 = domains[0][0];
            const d1 = domains[len - 1][domains[len - 1].length - 1];

            return state.normalize = (d1 < d0) ? normalize(d1, d0) : normalize(d0, d1);
        } catch(e) {
            console.error(`Your domains could not be parsed. Check they are properly formatted. Err msg: ${e}`);
        }
    },
    normalize: () => {},
});
