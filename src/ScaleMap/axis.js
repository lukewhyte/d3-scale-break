import * as d3Axis from 'd3-axis';

const _methodMap = {};
const _axes = [];
let _axisType = '';

const _attachMethods = (axis, idx) => {
    Object.keys(_methodMap).forEach(method => {
        const { args, areIndexed } = _methodMap[method];
        if (areIndexed) {
            axis[method](...args[idx])
        } else {
            axis[method](...args);
        }
    });
    return axis;
};

export const axisSetter = state => ({
    set: () => {
        if (_axisType && d3Axis[_axisType]) {
            const axes = state.scales.getScales().map((scale, idx) => _attachMethods(d3Axis[_axisType](scale), idx));
            _axes.splice(0, _axes.length, ...axes);
        }
        return _axes.slice();
    },
    setMethod: (method, args, areIndexed) => {
        _methodMap[method] = { args, areIndexed }; 
        return state.axes.getAll();
    },
    setType: axisType => _axisType = axisType,
});

export const axisGetter = () => ({
    get: idx => _axes[idx],
    getAll: () => _axes.slice(),
});

export default state => ({
    axes: Object.assign(
        {},
        axisSetter(state),
        axisGetter(state),
    ),
});
