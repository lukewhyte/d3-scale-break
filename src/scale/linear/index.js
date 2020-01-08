import { LinearScaleMap as ScaleMap } from '../ScaleMap';
import continuous, { copy } from '../continuous';
import { parseArg } from '../../utils';

export const linearish = scales => {
    function ticks(count) {
        return scales.mapScales((scale, idx) => scale.ticks(count[idx]));
    }

    function tickFormat(count, specifier) {
        return scales.mapScales((scale, idx) => scale.tickFormat(count[idx], specifier[idx]));
    }

    function nice(count) {
        const nScales = scales.mapScales((scale, idx) => scale.nice(count[idx]));
        return scales.domain(nScales.map(scale => scale.domain())); // This is hacky, but I'm running out of time
    }

    return Object.assign(scales, {
        ticks: count => ticks(parseArg(count, scales.domain().length)),
        tickFormat: (count, specifier) => tickFormat(
            parseArg(count, scales.domain().length),
            parseArg(specifier, scales.domain().length),
        ),
        nice: count => nice(parseArg(count, scales.domain().length)),
    });
};

const linear = (domains, range) => {
    const scale = continuous(ScaleMap(domains, range));

    scale.copy = () => copy(scale, linear());

    return linearish(scale);
};

export default linear;
