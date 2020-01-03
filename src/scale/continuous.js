import { interpolateRound } from "d3-interpolate";

const continuous = scaleMap => {
    function scale (x) {
        return isNaN(x = +x) ? scaleMap.unknown : scaleMap.mapVal(x);
    }

    scale.invert = y => {
        const scale = scaleMap.getScales().find(scale => {
            const [r0, r1] = scaleMap.flip(scale.range());
            return (y >= r0) && (y <= r1);
        });
        return scale.invert(y);
    };

    scale.domain = function(_) {
        return arguments.length ? (scaleMap.setDomains(_), scale) : scaleMap.getDomains().slice();
    };

    scale.range = function(_) {
        return arguments.length ? (scaleMap.setRange(_), scale) : scaleMap.getRange().slice();
    };

    scale.scope = function(_) {
        return arguments.length ? (scaleMap.setScopes(_), scale) : scaleMap.getScopes().slice();
    };

    scale.rangeRound = function(_) {
        return scaleMap.setRange(_), scale.interpolate(interpolateRound), scale;
    }

    scale.clamp = function(_) {
        return arguments.length ? (scaleMap.getScales().forEach(scale => scale.clamp(_)), scale) : scaleMap.getScale(0).clamp();
    };

    scale.interpolate = function(_) {
        return arguments.length ? (scaleMap.getScales().forEach(scale => scale.interpolate(_)), scale) : scaleMap.getScale(0).interpolate();
    };

    scale.unknown = function(_) {
        return arguments.length ? (scaleMap.unknown = _, scale) : scaleMap.unknown;
    };
    
    return scale;
};

export default continuous;
