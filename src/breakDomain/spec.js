import test from 'tape';
import breakDomain from './index';

test('break should take a dataset and breakpoints then return scale broke domain', t => {
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
