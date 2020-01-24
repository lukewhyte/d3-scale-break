import test from 'tape';
import breakDomain from './breakDomain';
import breakScope from './breakScope';
import breakData from './breakData';

test('breakDomain should take a dataset and breakpoints then return scale broke domain', t => {
    const data = [-400, -659, 0, 0, 0, -23, 40, 900, 439];
    const breakpoints = [-1100, 100, 901, -100];
    const result = breakDomain(data, breakpoints);
    const expected = [
        [-659, -100],
        [-100, 100],
        [100, 900]
    ];
    t.deepEqual(result, expected);
    t.end();
});

test('breakScope should take a dataset and breakpoints then return scale broke scope', t => {
    let data = [-10, 20, -450, 100, 200, 4000];
    let breakpoints = [-200, 100, 800, 6000];   
    let result = breakScope(data, breakpoints);
    let expected = [ [ 0, 0.17 ], [ 0.17, 0.67 ], [ 0.67, 0.84 ], [ 0.84, 1 ] ];
    t.deepEqual(result, expected);

    data = [1,2,3,4,5,6,7,8,9]
    breakpoints = [1,2,3,4,5,6,7,8,9]
    result = breakScope(data, breakpoints);
    expected = [ [ 0, 0.11 ], [ 0.11, 0.22 ], [ 0.22, 0.33 ], [ 0.33, 0.44 ], [ 0.44, 0.55 ], [ 0.55, 0.66 ], [ 0.66, 0.77 ], [ 0.77, 0.88 ], [ 0.88, 1 ] ];
    t.deepEqual(result, expected);

    data = [100000, 70000, 70000, 9300, 7200, 6700, 5500, 5000, 4500, 4300, 3600, 3500, 1300, 1000, 900, 800, -2000, -30000, -35000];
    breakpoints = [-2000, 9300];
    result = breakScope(data, breakpoints);
    expected = [ [ 0, 0.16 ], [ 0.16, 0.84 ], [ 0.84, 1 ] ];
    t.deepEqual(result, expected);

    t.end();
});

test('breakData should perform the above operations and return to equally lengthed arrays', t => {
    const data = [-10, -5, -3, 5, 200, 233, 297, 400, 505];
    const breakpoints = [-50, 0, 10, 90, 300, 506];
    const { domain, scope } = breakData(data, breakpoints);

    let result = domain.length === scope.length;
    let expected = true;

    t.equals(result, expected);
    t.end();
});
