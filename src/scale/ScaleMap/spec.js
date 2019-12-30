import tape from 'tape';
import ScaleMap from './index';

tape('ScaleMap.getDomain and ScaleMap.getAllDomains should return respective domains', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);

    let result = scaleMap.getAllDomains();
    let expected = [[-40, 90], [91, 800], [801, 3960]];
    t.deepEqual(result, expected);

    result = scaleMap.getDomain(1);
    expected = [91, 800];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.setDomains should set domains and notify listeners', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);
    scaleMap.testOne = () => scaleMap.booya = () => 'Booya!!';
    scaleMap.testTwo = () => scaleMap.wamp = () => 'Wamp wamp';
    scaleMap.addDomainListener('testOne');
    scaleMap.addDomainListener('testTwo');
    scaleMap.removeDomainListener('testTwo');
    scaleMap.notifyDomainListeners();

    let result = [
        typeof scaleMap.booya,
        typeof scaleMap.wamp,
    ];
    let expected = ['function', 'undefined'];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.normalize calculates input\'s position between domain', t => {
    let scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);
    let result = scaleMap.normalize(1960);
    let expected = 0.5
    t.equal(result, expected);

    scaleMap = ScaleMap([[-0.4, 1]], [-50,100]);
    result = scaleMap.normalize(-0.2);
    expected = 0.14285714285714288;
    t.equal(result, expected);

    scaleMap = ScaleMap([[100, 80], [79,0]], [-50,100]);
    result = scaleMap.normalize(60);
    expected = 0.6;
    t.equal(result, expected);

    t.end();
});

tape('ScaleMap.setNormalizer updates normalizer after ScaleMap.setDomains runs', t => {
    let scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [-50,100]);
    scaleMap.setDomains([[100,50], [49,0]]);

    let result = scaleMap.normalize(60);
    let expected = 0.6;
    t.equal(result, expected);

    t.end();
});

tape('ScaleMap.getRange maps subdomain values to correct position in range and returns subrange', t => {
    let scaleMap = ScaleMap([[0, 100], [101, 800], [801, 1000]], [0,100]);
    let result = scaleMap.getRange(scaleMap.getDomain(0));
    let expected = [0, 10];
    t.deepEqual(result, expected);

    scaleMap = ScaleMap([[100,50], [49,0]], [10,0]);
    result = scaleMap.getRange(scaleMap.getDomain(0));
    expected = [10,5];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.setRange should modify the range and the system should adjust', t => {
    let scaleMap = ScaleMap([[100,50], [49,0]], [-50,100]);
    scaleMap.setRange([0, 100]);

    let result = scaleMap.getRange(scaleMap.getDomain(0));
    let expected = [0,50];
    t.deepEqual(result, expected);

    t.end();
});
