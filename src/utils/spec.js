import test from 'tape';
import utils from './index';

test('utils.parseArg should convert/equalize to array', t => {
    let result = utils.parseArg('Hello', 4);
    let expected = ['Hello','Hello','Hello','Hello'];
    t.deepEqual(result, expected);

    result = utils.parseArg([8,8], 6);
    expected = [8,8,undefined,undefined,undefined,undefined];
    t.deepEqual(result, expected);

    const fizz = { bop: 'bap!!' }
    result = utils.parseArg([fizz, fizz, fizz], 2);
    expected = [fizz, fizz];
    t.deepEqual(result, expected);

    t.end();
});

test('utils.allUndefined should test if array is completely full of undefined vals', t => {
    let arr = [undefined, 12, undefined];
    let result = utils.allUndefined(arr);
    let expected = false;
    t.equals(result, expected);

    arr = [undefined, undefined];
    result = utils.allUndefined(arr);
    expected = true;
    t.equals(result, expected);

    t.end();
});
