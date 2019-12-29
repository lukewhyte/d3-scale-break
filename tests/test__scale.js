import tape from 'tape'
import scaleBreak from '../'

tape("scaleLinear() has the expected defaults", test => {
  var s = scaleBreak.scaleLinear();
  test.equal(s, 'booya');
  test.end();
});