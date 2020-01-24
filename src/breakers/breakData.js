import breakDomain from './breakDomain';
import breakScope from './breakScope';

export default (data, points) => ({
    domain: breakDomain(data, points),
    scope: breakScope(data, points),
});
