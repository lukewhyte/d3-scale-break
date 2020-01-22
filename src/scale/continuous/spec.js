import test from 'tape';
import { interpolateRgb } from 'd3-interpolate';
import { LinearScaleMap as ScaleMap } from '../ScaleMap';
import continuous from './index';

test('continuous.domain should set the domain or return it', t => {
    const scale = continuous(ScaleMap([[0,50], [50, 100]], [0,1000]));
    let result = scale.domain();
    let expected = [[0,50], [50, 100]]
    t.deepEqual(result, expected);

    result = scale.domain([[-99, 0], [5,1000]]).domain();
    expected = [[-99, 0], [5,1000]];
    t.deepEqual(result, expected);

    t.end();
});

test('continuous.range should set the range or return it', t => {
    const scale = continuous(ScaleMap([[0,50], [50, 100]], [0,1000]));

    let result = scale.range();
    let expected = [0, 1000]
    t.deepEqual(result, expected);

    result = scale.range([-99, 0]).range();
    expected = [-99, 0];
    t.deepEqual(result, expected);

    t.end();
});

test('continuous.scope should set the scope or return it', t => {
    const scale = continuous(ScaleMap([[0,50], [50, 100]], [0,1000]));

    let result = scale.scope([[0,0.25],  [0.25, 1]]).scope();
    let expected = [[0,0.25],  [0.25, 1]]
    t.deepEqual(result, expected);

    t.end();
});

test('continuous should return the correct value', t => {
    const scale = continuous(ScaleMap([[-1000, -500], [-500, 0], [0, 500], [500, 1000]], [0,100]));

    let result = scale(500);
    let expected = 75;
    t.equal(result, expected);

    scale.scope([[0,0.25], [0.25,0.3], [0.3,0.5], [0.5,1]]);
    result = scale(500);
    expected = 50;
    t.equal(result, expected);

    scale.domain([[1000, 600], [600, 500], [500, 250], [250, 0]]);
    result = scale(550)
    expected = 27.5;
    t.equal(result, expected);

    scale.range([600,-1000000])
    result = scale(200);
    expected = -599760;
    t.equal(result, expected);

    t.end();
});

test('continuous.invert inverts the range val', t => {
    const scale = continuous(ScaleMap([[-40, 90], [90, 800], [800, 3960]], [0,100]));
    
    let result = scale.invert(100);
    let expected = 3960;
    t.equal(result, expected);

    result = scale.invert(30);
    expected = 1160;
    t.equal(result, expected);

    scale.range([0,-100])
    result = scale.invert(-30);
    expected = 1160;
    t.equal(result, expected);

    t.end();
});

test('continous.interpolate should set interpolator', t => {
    const scale = continuous(ScaleMap([[-40, 90], [90, 800], [800, 3960]], ['black', 'white']));
    scale.interpolate(interpolateRgb);
    
    const result = scale(95.88886653);
    const expected = 'rgb(8, 8, 8)';
    t.equal(result, expected);
    
    t.end();
});

test('continous.rangeRound should set range and interpolateRound', t => {
    const scale = continuous(ScaleMap([[-40, 90], [90, 800], [800, 3960]]));
    scale.rangeRound([0, 100]);
    
    const result = scale(95.88886653);
    const expected = 3;
    t.equal(result, expected);
    
    t.end();
});

test('continuous.unknown should return undefined or the unknown() value', t => {
    const scale = continuous(ScaleMap([[50,0],[0,-50]], [0,1000]));
    
    let result = scale.unknown()
    let expected = undefined;
    t.equal(result, expected);

    result = scale('fizz buzz');
    t.equal(result, expected);

    result = scale.unknown('You don\'t know me!!!').unknown();
    expected = 'You don\'t know me!!!';
    t.equal(result, expected);

    result = scale('fizz buzz');
    t.equal(result, expected);

    t.end();
});

test('continuous.clamp should clamp the range/domain, but gaps in domains should return unknown()', t => {
    const scale = continuous(ScaleMap([[50,0],[-25,-50]], [0,1000]));
    scale.clamp(false);
    scale.unknown('Par for the course, ol chap');
    
    let result = scale(100);
    let expected = -500;
    t.equal(result, expected);

    scale.clamp(true);
    result = scale(100);
    expected = 0;
    t.equal(result, expected);

    result = scale(-100);
    expected = 1000;
    t.equal(result, expected);

    result = scale(-10);
    expected = 'Par for the course, ol chap';
    t.equal(result, expected);

    t.end();
});

test('continuous.mapScales returns the inner scales', t => {
    const scales = continuous(ScaleMap([[50,0],[-25,-50]], [0,1000]));
    const result = scales.mapScales(scale => scale.domain())[1];
    const expected = [-25,-50];
    t.deepEqual(result, expected);
    t.end();
})
