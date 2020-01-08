const matchToCount = (arg, diff) => diff < 0
    ? arg.slice(0, diff)
    : arg.concat(Array(diff).fill(undefined));

export const parseArg = (arg, count) => {
    if (Array.isArray(arg)) {
        return arg.length === count ? arg : matchToCount(arg, count - arg.length);
    } else {
        return Array(count).fill(arg);
    }
};

export const parseArrayArg = (arg, count) => {
    if (Array.isArray(arg) && Array.isArray(arg[0])) {
        return arg.length === count ? arg : matchToCount(arg, count - arg.length);
    } else {
        return Array(count).fill(arg);
    }
}

export const allUndefined = arr => arr.findIndex(el => el !== undefined) === -1;

export default {
    parseArg,
    parseArrayArg,
    allUndefined,
};
