import tape from 'tape';
import { LinearScaleMap as ScaleMap } from './index';

tape('ScaleMap.getDomain and ScaleMap.getAllDomains should return respective domains', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);

    let result = scaleMap.getDomains();
    let expected = [[-40, 90], [91, 800], [801, 3960]];
    t.deepEqual(result, expected);

    result = scaleMap.getDomain(1);
    expected = [91, 800];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.setDomains should notify listeners', t => {
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
    let result = scaleMap.getRange(0);
    let expected = [0, 10];
    t.deepEqual(result, expected);

    scaleMap = ScaleMap([[100,50], [49,0]], [10,0]);
    result = scaleMap.getRange(0);
    expected = [10,5];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.setRange should modify the range and the system should adjust', t => {
    let scaleMap = ScaleMap([[100,50], [49,0]], [-50,100]);
    scaleMap.setRange([0, 100]);

    let result = scaleMap.getRange(0);
    let expected = [0,50];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.setRange should notify listeners', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);
    scaleMap.testOne = () => scaleMap.booya = () => 'Booya!!';
    scaleMap.testTwo = () => scaleMap.wamp = () => 'Wamp wamp';
    scaleMap.addRangeListener('testOne');
    scaleMap.addRangeListener('testTwo');
    scaleMap.removeRangeListener('testTwo');
    scaleMap.notifyRangeListeners();

    let result = [
        typeof scaleMap.booya,
        typeof scaleMap.wamp,
    ];
    let expected = ['function', 'undefined'];
    t.deepEqual(result, expected);

    t.end();
});

tape('ScaleMap.setScales should set and refresh scales list and handle dynamic domains/ranges', t => {
    let scaleMap = ScaleMap([[100,50], [49,-4000]], [0,100]);
    let scale = scaleMap.getScale(1);
    let result = Math.floor(scale(-2000));
    let expected = 51;
    t.equal(result, expected);

    scaleMap.setDomains([[0,100]]);
    scale = scaleMap.getScale(0);
    result = scale(60);
    expected = 60;
    t.equal(result, expected);

    scaleMap.setRange([0,1000]);
    result = scale(50);
    expected = 500;
    t.equal(result, expected);

    t.end();
});

tape('ScaleMap.mapValToIdx should return correct domain/scale idx for input domain val', t => {
    let scaleMap = ScaleMap([[-120,10], [11, 1000], [1001, 8000]], [5, 995]);
    let result = scaleMap.mapValToIdx(888);
    let expected = 1;
    t.equal(result, expected);

    scaleMap = ScaleMap([[100,50], [49,0]], [5, 995]);
    result = scaleMap.mapValToIdx(2);
    expected = 1;
    t.equal(result, expected);

    scaleMap.setDomains([[8000, 1001], [1000, 11], [10, -120], [-121, -4000]]);
    result = scaleMap.mapValToIdx(-2354);
    expected = 3;
    t.equal(result, expected);

    t.end();
});

tape('ScaleMap.mapValToRange returns the correct value in range from a value in domain', t => {
    let scaleMap = ScaleMap([[-1000,10], [11, 1000]], [0, 100]);
    let result = scaleMap.mapValToRange(-500);
    let expected = 25;
    t.equal(result, expected);
    t.end();
});

tape('ScaleMap.setScopes and ScaleMap.getScopes should manage val range and respond to domain changes', t => {
    let scaleMap = ScaleMap([[-120,10], [11, 1000], [1001, 8000]], [0, -100]);
    scaleMap.setScopes([[0,0.5],[0.51,0.75],[0.76,1]]);
    let result = scaleMap.mapValToRange(10);
    let expected = -50;
    t.equal(result, expected);

    scaleMap.setDomains([[-10000,19],[20, 40],[41, 500000]]);
    scaleMap.setRange([0,200]);
    result = scaleMap.mapValToRange(30);
    expected = 126;
    t.equal(result, expected);

    t.end();
});
