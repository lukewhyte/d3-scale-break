// We need to be able to pass multiple domains and just a single range.
// So our function should accept multiple domain arrays and a single range array
// It then runs rescale and solves piecewise as few times as necessary and breaks the
// domain down into as many chunks between zero and one as necessary base on the
// number of inputs. EG: domain([0,10],[11,80],[81,100]) = [0,0.1],[0.11,0.8],[0.81,1]
// Three normalize/interpolate functions are computed pased on these values and their equivelant
// portions of the range. EG: range(0,200) = domain[0] = [0,20]
// These are stored in an output function (just like in regular linearScale) that,
// when they recieve an input value, they convert the value to val btw 0 & 1, pick an output func
// and run it!!

import * as scale from './scale';

export default {
    ...scale,
};
