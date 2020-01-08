import test from 'tape';
import * as d3 from 'd3';
import jsdom from 'jsdom';
import { axisLeft, axisRight } from './index';
import linear from '../scale/linear';

test('axis.scales sets the scale or returns it', t => {
    const scale = linear([ [0,50], [50,100] ], [0,1000]);
    const axis = axisLeft(scale);

    let result = axis.scale().length;
    let expected = 2;
    t.equal(result, expected);

    t.end();
});

test('axis.tickArguments sets and retrieves tick arguments', t => {
    const axis = axisRight(linear([ [0,50], [50,100] ], [0,1000])).tickArguments([10]);

    let result = axis.tickArguments();
    let expected = [[10], [10]];
    t.deepEqual(result, expected);
    
    t.end();
});

test('axis.ticks sets tickArguments', t => {
    const axis = axisRight(linear([ [0,50], [50,100] ], [0,1000])).ticks([5,10]);

    let result = axis.tickArguments();
    let expected = [[5],[10]];
    t.deepEqual(result, expected);
    
    t.end();
});

test('axis.tickValues sets and retrieves tick values', t => {
    const axis = axisRight(linear([ [0,50], [50,100], [200, 300] ], [0,1000])).tickValues([1, 2, 3]);

    let result = axis.tickValues();
    let expected = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    t.deepEqual(result, expected);
    
    t.end();
});

// test('axis draws the expected elements', t => {
//     const scale = linear([ [0,50], [50,100], [100, 150] ], [0,1000]);
//     const axis = axisLeft(scale);

//     const body = (new jsdom.JSDOM("<!DOCTYPE html><svg><g></g></svg>")).window.document.body;

//     let result = d3.select(body).select('g').call(axis);
//     let expected = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
//     t.deepEqual(result, expected);
    
//     t.end();
// });
