import { scaleLinear } from 'd3-scale';
import setScaleMap from './scaleMap';

const linear = (domains, range) => {
    const scaleMap = setScaleMap(domains, range);
    const scales = domains.map(domain => scaleLinear(
        domain,
        scaleMap.interpolate(domain),
    ));
};

// We'll have a universal scaleMapper that will create an array of domain->ranges with a lookup function
// This mapper will be returned and then, for each, domain-range pair, we'll instanciate a scale.
// Finally, each of the public methods we'll then need to be overwritten to a catch-all for any normal scale input
// These new public methods will utilize the mapper to pass the value to the correct scale and vice versa.
// We can have a separate continous.js for overwriting each scale method defined in that file, then tackle the
// scale-specific methods in each of their dedicate modules.

export default linear;
