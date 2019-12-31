export const scopeSetter = state => {
    let listeners = [];
    return {
        addScopeListener: func => listeners.push(func),
        removeScopeListener: toRmv => listeners = listeners.filter(func => func !== toRmv),
        notifyScopeListeners: () => listeners.forEach(func => {
            state[func] ? state[func]() : state.removeRangeListener(func);
        }),
        setScopes: scopes => {
            if (scopes.length === state.domains.length) {
                state.scopes = scopes;
            } else {
                state.scopes = [];
            }
            state.notifyScopeListeners();
            return state.scope;
        },
        sanitizeScopes: () => {
            if (state.scopes.length !== state.domains.length ) {
                state.scopes = [];
            }
        },
    };
}

export const scopeGetter = state => ({
    getScope: idx => {
        return state.scopes[idx];
    },
    getScopes: () => state.scopes,
});
