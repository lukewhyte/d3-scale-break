import * as d3Axis from 'd3-axis';
import { parseArg, parseArrayArg, allUndefined } from '../utils';

const slice = Array.prototype.slice;

const setAxis = axes => {
    function dispatch(context) {
        axes.forEach(axis => axis(context));
    }

    function scale(args) {
        return axes.map(axis => axis.scale());
    }

    function ticks(args) {
        return axes.forEach((axis, idx) => axis.ticks(args[idx])), dispatch;
    }

    function tickArguments(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickArguments(args[idx])), dispatch) 
            : axes.map(axis => axis.tickArguments());
    }

    function tickValues(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickValues(args[idx])), dispatch) 
            : axes.map(axis => axis.tickValues());
    }

    function tickFormat(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickFormat(args[idx])), dispatch) 
            : axes.map(axis => axis.tickFormat());
    }

    function tickSize(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickSize(args[idx])), dispatch) 
            : axes.map(axis => axis.tickSize());
    }

    function tickSizeInner(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickSizeInner(args[idx])), dispatch) 
            : axes.map(axis => axis.tickSizeInner());
    }

    function tickSizeOuter(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickSizeOuter(args[idx])), dispatch) 
            : axes.map(axis => axis.tickSizeOuter());
    }

    function tickPadding(args) {
        return !allUndefined(args) 
            ? (axes.forEach((axis, idx) => axis.tickPadding(args[idx])), dispatch) 
            : axes.map(axis => axis.tickPadding());
    }

    return Object.assign(dispatch, {
        scale: arg => scale(parseArg(arg, axes.length)),
        ticks: (arg, arg2) => ticks(
            parseArg(arg, axes.length),
            parseArg(arg2, axes.length),
        ),
        tickArguments: arg => tickArguments(parseArrayArg(arg, axes.length)),
        tickValues: arg => tickValues(parseArrayArg(arg, axes.length)),
        tickFormat: arg => tickFormat(parseArg(arg, axes.length)),
        tickSize: arg => tickSize(parseArg(arg, axes.length)),
        tickSizeInner: arg => tickSizeInner(parseArg(arg, axes.length)),
        tickSizeOuter: arg => tickSizeOuter(parseArg(arg, axes.length)),
        tickPadding: arg => tickPadding(parseArg(arg, axes.length)),
    });
    
};

export function axisTop(scales) {
    return setAxis(scales.mapScales(scale => d3Axis.axisTop(scale)));
}
  
export function axisRight(scales) {
    return setAxis(scales.mapScales(scale => d3Axis.axisRight(scale)));
}
  
export function axisBottom(scales) {
    return setAxis(scales.mapScales(scale => d3Axis.axisBottom(scale)));
}
  
export function axisLeft(scales) {
    return setAxis(scales.mapScales(scale => d3Axis.axisLeft(scale)));
}
