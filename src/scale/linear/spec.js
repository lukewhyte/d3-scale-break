import test from 'tape';
import linear from './index';

test('linear.ticks sets ticks in correct format', t => {
    const scale = linear([[0,50],[50,100]], [0,1000]);
    
    let result = scale.ticks(5);
    let expected = [ [ 0, 10, 20, 30, 40, 50 ], [ 50, 60, 70, 80, 90, 100 ] ];
    t.deepEqual(result, expected);

    result = scale.ticks([5,2]);
    expected = [ [ 0, 10, 20, 30, 40, 50 ], [ 60, 80, 100 ] ];
    t.deepEqual(result, expected);

    t.end();
});

test('linear.tickFormat sets tick format', t => {
    const scale = linear([[0,0.5],[0.5,1]], [0,1000]);
    const ticks = scale.ticks(5);
    const tickFormat = scale.tickFormat(5, "+%")
    
    let result = ticks[0].map(tickFormat[0]);
    let expected = [ '+0%', '+10%', '+20%', '+30%', '+40%', '+50%' ];
    t.deepEqual(result, expected);

    t.end();
});

test('linear.nice runs continuous.nice on each of the domains', t => {
    const scale = linear([[-9.87653, 119.8782], [211.88, 99876]]);
    let result = scale.nice().domain()[0];
    let expected = [-10, 120];
    t.deepEqual(result, expected);
    t.end();
})
