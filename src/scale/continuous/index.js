import { interpolateRound } from "d3-interpolate";

export function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp())
        .unknown(source.unknown());
}

const continuous = scaleMap => {
    function scale (x) {
        return isNaN(x = +x) ? scaleMap.unknown : scaleMap.mapVal(x);
    }

    scale.invert = y => {
        const scale = scaleMap.scales.getAll().find(scale => {
            const [r0, r1] = scaleMap.flip(scale.range());
            return (y >= r0) && (y <= r1);
        });
        return scale.invert(y);
    };

    scale.domain = function(_) {
        return arguments.length ? (scaleMap.domains.set(_), scale) : scaleMap.domains.getAll();
    };

    scale.range = function(_) {
        return arguments.length ? (scaleMap.range.set(_), scale) : scaleMap.range.get();
    };

    scale.scope = function(_) {
        return arguments.length ? (scaleMap.scopes.set(_), scale) : scaleMap.scopes.getAll();
    };

    scale.rangeRound = function(_) {
        return scaleMap.range.set(_), scale.interpolate(interpolateRound), scale;
    }

    scale.clamp = function(_) {
        return arguments.length ? (scaleMap.scales.getAll().forEach(scale => scale.clamp(_)), scale) : scaleMap.scales.get(0).clamp();
    };

    scale.interpolate = function(_) {
        return arguments.length 
            ? (scaleMap.scales.getAll().forEach(scale => scale.interpolate(_)), scale)
            : scaleMap.scales.get(0).interpolate();
    };

    scale.unknown = function(_) {
        return arguments.length ? (scaleMap.unknown = _, scale) : scaleMap.unknown;
    };

    scale.mapScales = cb => {
        return scaleMap.scales.getAll().map(cb);
    };
    
    return scale;
};

export default continuous;
