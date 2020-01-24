const sorter = (a, b) => a - b;

const fillBins = (data, points) => {
    const bins = [0];
    let i = 0, j = 0;
    while(i < points.length) {
        if (data[j] <= points[i]) {
            bins[i] += 1;
            j += 1;
        } else {
            i += 1;
            bins[i] = 0;
        }
    }
    bins[i] = data.slice(j).length;
    return bins;
};

export default (data, points) => {
    const bins = fillBins(data.sort(sorter), points.sort(sorter));
    const count = data.length;
    return bins.reduce((res, bin, i) => {
        const last = res[i - 1] ? res[i - 1][1] : 0;
        const next = ((last * 100) + (+(bin / count).toFixed(2) * 100)) / 100; // Fuck you, JavaScript
        res.push([last, next > 1 ? 1 : next > 0.95 ? 1 : next]);
        return res;
    }, []).filter(s => {
        return !(s[0] === 0 && s[1] === 0) && !(s[0] === 1 && s[1] === 1)
    });
};
