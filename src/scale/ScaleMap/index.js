import {
    domainGetter,
    domainSetter,
    domainNormalizer,
} from './domain';
import {
    rangeGetter,
    rangeSetter,
} from './range';

const unit = [0, 1];

function ScaleMap(domains=unit, range=unit) {
    let state = {
        domains,
        range,
    };
    let instance = Object.assign(
        state,
        domainGetter(state),
        domainSetter(state),
        domainNormalizer(state),
        rangeGetter(state),
        rangeSetter(state),
    );
    instance.setNormalizer();
    return instance;
}

export default ScaleMap;
