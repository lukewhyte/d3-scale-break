import * as d3Axis from 'd3-axis';
import { parseArg, parseArrayArg, allUndefined } from '../utils';

const setAxis = axes => {
    const updateOrReturn = (method, args) => {
        if (allUndefined(args)) {
            return axes.map(axis => axis[method]());
        } else {
            return axes.forEach((axis, idx) => axis[method](args[idx])), dispatch;
        }
    }

    function dispatch(context) {
        axes.forEach(axis => context.append('g').call(axis));
    }

    function scale(args) {
        return axes.map(axis => axis.scale());
    }

    function ticks(args) {
        return axes.forEach((axis, idx) => axis.ticks(args[idx])), dispatch;
    }

    return Object.assign(dispatch, {
        scale: arg => scale(parseArg(arg, axes.length)),
        ticks: (arg, arg2) => ticks(parseArg(arg, axes.length), parseArg(arg2, axes.length)),
        tickArguments: arg => updateOrReturn('tickArguments', parseArrayArg(arg, axes.length)),
        tickValues: arg => updateOrReturn('tickValues', parseArrayArg(arg, axes.length)),
        tickFormat: arg => updateOrReturn('tickFormat', parseArg(arg, axes.length)),
        tickSize: arg => updateOrReturn('tickSize', parseArg(arg, axes.length)),
        tickSizeInner: arg => updateOrReturn('tickSizeInner', parseArg(arg, axes.length)),
        tickSizeOuter: arg => updateOrReturn('tickSizeOuter', parseArg(arg, axes.length)),
        tickPadding: arg => updateOrReturn('tickPadding', parseArg(arg, axes.length)),
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
