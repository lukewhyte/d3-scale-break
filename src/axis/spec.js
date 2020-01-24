import fs from 'fs';
import path from 'path';
import test from 'tape';
import * as d3 from 'd3';
import jsdom from 'jsdom';
import { axisLeft, axisRight } from './index';
import linear from '../scale/linear';

const file = file => fs.readFileSync(path.join(__dirname, file), "utf8").replace(/\n\s*/mg, "");

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
    const axis = axisRight(linear([ [0,50], [50,100] ], [0,1000])).ticks(5, 's');

    let result = axis.tickArguments();
    let expected = [ [ 5, 's' ], [ 5, 's' ] ];
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

test('axis draws the expected elements', t => {
    const scale = linear([ [0,50], [50,100], [100, 150] ], [0,500]);
    const axis = axisLeft(scale);

    const result = (new jsdom.JSDOM('<!DOCTYPE html><svg><g></g></svg>')).window.document.body;
    const expected = (new jsdom.JSDOM(file('./mocks/axis-left.html'))).window.document.body;
    d3.select(result).select('g').call(axis);
    t.equal(result.outerHTML, expected.outerHTML);
    
    t.end();
});
