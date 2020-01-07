import test from 'tape';
import { LinearScaleMap as ScaleMap } from './index';

test('ScaleMap.domains.get and ScaleMap.domains.getAll should return respective domains', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);

    let result = scaleMap.domains.getAll();
    let expected = [[-40, 90], [91, 800], [801, 3960]];
    t.deepEqual(result, expected);

    result = scaleMap.domains.get(1);
    expected = [91, 800];
    t.deepEqual(result, expected);

    t.end();
});

test('ScaleMap.domains.set should notify listeners', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);
    scaleMap.domains.testOne = () => scaleMap.booya = () => 'Booya!!';
    scaleMap.domains.testTwo = () => scaleMap.wamp = () => 'Wamp wamp';
    scaleMap.domains.listener.addSubscriber('domains.testOne');
    scaleMap.domains.listener.addSubscriber('domains.testTwo');
    scaleMap.domains.listener.removeSubscriber('domains.testTwo');
    scaleMap.domains.listener.notifySubscribers();

    let result = [
        typeof scaleMap.booya,
        typeof scaleMap.wamp,
    ];
    let expected = ['function', 'undefined'];
    t.deepEqual(result, expected);

    t.end();
});

test('ScaleMap.domains.normalize calculates input\'s position between domain', t => {
    let scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);
    let result = scaleMap.domains.normalize(1960);
    let expected = 0.5
    t.equal(result, expected);

    scaleMap = ScaleMap([[-0.4, 1]], [-50,100]);
    result = scaleMap.domains.normalize(-0.2);
    expected = 0.14285714285714288;
    t.equal(result, expected);

    scaleMap = ScaleMap([[100, 80], [79,0]], [-50,100]);
    result = scaleMap.domains.normalize(60);
    expected = 0.6;
    t.equal(result, expected);

    t.end();
});

test('ScaleMap.domains.normalize updates normalizer after ScaleMap.domains.set runs', t => {
    let scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [-50,100]);
    scaleMap.domains.set([[100,50], [49,0]]);

    let result = scaleMap.domains.normalize(60);
    let expected = 0.6;
    t.equal(result, expected);

    t.end();
});

test('ScaleMap.range.getSlice maps subdomain values to correct position in range and returns subrange', t => {
    let scaleMap = ScaleMap([[0, 100], [101, 800], [801, 1000]], [0,100]);
    let result = scaleMap.range.getSlice(scaleMap.scopes.get(0));
    let expected = [0, 10];
    t.deepEqual(result, expected);

    scaleMap = ScaleMap([[100,50], [49,0]], [10,0]);
    result = scaleMap.range.getSlice(scaleMap.scopes.get(0));
    expected = [10,5];
    t.deepEqual(result, expected);

    t.end();
});

test('ScaleMap.range.set should modify the range and the system should adjust', t => {
    let scaleMap = ScaleMap([[100,50], [49,0]], [-50,100]);
    scaleMap.range.set([0, 100]);

    let result = scaleMap.range.get();
    let expected = [0,100];
    t.deepEqual(result, expected);

    t.end();
});

test('ScaleMap.range.set should notify listeners', t => {
    const scaleMap = ScaleMap([[-40, 90], [91, 800], [801, 3960]], [0,100]);
    scaleMap.range.testOne = () => scaleMap.booya = () => 'Booya!!';
    scaleMap.range.testTwo = () => scaleMap.wamp = () => 'Wamp wamp';
    scaleMap.range.listener.addSubscriber('range.testOne');
    scaleMap.range.listener.addSubscriber('range.testTwo');
    scaleMap.range.listener.removeSubscriber('range.testTwo');
    scaleMap.range.listener.notifySubscribers();

    let result = [
        typeof scaleMap.booya,
        typeof scaleMap.wamp,
    ];
    let expected = ['function', 'undefined'];
    t.deepEqual(result, expected);

    t.end();
});

test('ScaleMap.scales.set should set and refresh scales list and handle dynamic domains/ranges', t => {
    let scaleMap = ScaleMap([[100,50], [49,-4000]], [0,100]);
    let scale = scaleMap.scales.get(1);
    let result = Math.floor(scale(-2000));
    let expected = 51;
    t.equal(result, expected);

    scaleMap.domains.set([[0,100]]);
    scale = scaleMap.scales.get(0);
    result = scale(60);
    expected = 60;
    t.equal(result, expected);

    scaleMap.range.set([0,1000]);
    result = scale(50);
    expected = 500;
    t.equal(result, expected);

    t.end();
});

test('ScaleMap.mapValToIdx should return correct domain/scale idx for input domain val', t => {
    let scaleMap = ScaleMap([[-120,10], [11, 1000], [1001, 8000]], [5, 995]);
    let result = scaleMap.mapValToIdx(888);
    let expected = 1;
    t.equal(result, expected);

    scaleMap = ScaleMap([[100,50], [49,0]], [5, 995]);
    result = scaleMap.mapValToIdx(2);
    expected = 1;
    t.equal(result, expected);

    scaleMap.domains.set([[8000, 1001], [1000, 11], [10, -120], [-121, -4000]]);
    result = scaleMap.mapValToIdx(-2354);
    expected = 3;
    t.equal(result, expected);

    result = scaleMap.mapValToIdx(10000);
    expected = 0;
    t.equal(result, expected);

    result = scaleMap.mapValToIdx(-5000);
    expected = 3;
    t.equal(result, expected);

    t.end();
});

test('ScaleMap.mapVal returns the correct value in range from a value in domain', t => {
    let scaleMap = ScaleMap([[-1000,10], [11, 1000]], [0, 100]);
    let result = scaleMap.mapVal(-500);
    let expected = 25;
    t.equal(result, expected);
    t.end();
});

test('ScaleMap.scopes.set and ScaleMap.scopes.get should manage val range and respond to domain changes', t => {
    let scaleMap = ScaleMap([[-120,10], [11, 1000], [1001, 8000]], [0, -100]);
    scaleMap.scopes.set([[0,0.5],[0.51,0.75],[0.76,1]]);
    let result = scaleMap.mapVal(10);
    let expected = -50;
    t.equal(result, expected);

    scaleMap.domains.set([[-10000,19],[20, 40],[41, 500000]]);
    scaleMap.range.set([0,200]);
    result = scaleMap.mapVal(30);
    expected = 126;
    t.equal(result, expected);

    t.end();
});
