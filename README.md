## What is this?

`d3-scale-break` is a plugin that removes the complexity from adding scale breaks to graphics built in Mike Bostock's [D3](https://d3js.org/). It's useful when working with highly skewed data that can't be handled through normal continuous scales.

`d3-scale-break` allows multiple scales to be defined for a single dataset. It does this by interpolating an array of input domains (one for each scale) to a single range.

This:

```js
d3.scaleLinear()
    .domain([0, 10000])
    .range(0, 100);
```

Becomes this:

```js
d3sB.scaleLinear()
    .domain([ [0, 1000], [1000, 10000] ])
    .scope([ [0, 0.5], [0.5, 1] ])
    .range([0, 100]);
```

The `.scope` method denotes the percentage of the range that each subscale should occupy – in the above example it's 50% for each domain. You can denote gaps in the range with scope too, eg: `.scope([ [0, 0.2], [0.5, 1] ])`.

The plugin wraps `d3-scale` and `d3-axis` and provides all the same methods and functionality (with a couple caveats [explained below](#exceptions)).

This initial version only works with `scaleLinear`, but the plugin wrap's d3-scale's `continuous.js` and, if demand arises, by design could be expanded to function with the other continuous scales.

For usage examples, [check out this blog post](https://observablehq.com/@lukewhyte/handling-skewed-data-with-d3-scale-break).

## Installation

```
npm i -S d3-scale-break
```

This will install `d3-scale`, `d3-axis` and `d3-interpolate` as dependencies, but you'll need to install any other D3 libraries separately.

## API Reference

 * [scaleLinear](#scalelinear) ([.domain](#domain), [.scope](#scope), [.range](#range))
 * [axis](#axis)
 * [breakers](#breakers) ([.breakDomain](#breakdomain), [.breakScope](#breakscope), [.breakData](#breakdata))

### scaleLinear

<b>scaleLinear</b>([[<i>domain</i>, ]<i>range</i>])

Defines a continuous linear scale in exactly the same fashion as `d3.scaleLinear` with a specified [domain](#domain) and [range](#range).

<a name="domain" href="#domain">#</a> <i>continuous</i>.<b>domain</b>([<i>domain</i>])

Domain, if specified, should be an array of subdomains, each of which will set a subscale's domain to the specified array of numbers. All of the subdomains, collectively will interpolate to a single range. Domains can overlap or have gaps between them. Data points that fall into gaps between subdomains will not be render, but those outside of the entire array of subdomains will be treated according to standard `d3.clamp()` settings.

Unlike D3's standard `domain`, `d3-scale-break` does not support domain polymapping, thus <i>each subdomain array must contain only two numbers</i>, aka its extent.

```js
d3sB.scaleLinear()
    .domain([ [0, 1000], [1000, 10000], [10000, 100000] ]);
```

If no domain is specified, the method returns the current array of subdomains.

<a name="scope" href="#scope">#</a> <i>continuous</i>.<b>scope</b>([<i>scope</i>])

Scope, if specified, should be an array of subscopes. Each subscope should be an array of two values between 0 and 1, representing the percentage of the range that the scope's respective subscale should occupy.

```js
d3sB.scaleLinear()
    .domain([ [-10000, -100], [-100, 100], [100, 10000] ])
    .scope([ [0, 0.25], [0.25, 0.75], [0.75, 1] ])
    .range([0, 1000])
```

In the above example, the scope method delineates that within the range of 0 to 1000, the first subdomain should occupy the first 25% (0-250), the second subdomain the middle 50% (250-750) and the final subdomain the final 25% (750-1000).

If no scope is specified, the method returns the current array of subscopes.

<a name="range" href="#range">#</a> <i>continuous</i>.<b>range</b>([<i>range</i>])

There is no difference between D3's range method and `d3-scale-break`'s – all subscales will be interpolated to the single range.

### axis

Axis in `d3-scale-break` is designed to operate exactly like the `d3.axis` and is instantiated using the same four method names: `d3sB.axisLeft`, `d3sB.axisRight`, `d3sB.axisTop` and `d3sB.axisBottom`.

Under the hood, `d3-scale-break` generates a new `d3.axis` for each of subscales defined in the given scale:

```js
const x = d3sB.scaleLinear()
    .domain([ [0, 1000], [1000, 10000] ])
    .scope([ [0, 0.5], [0.5, 1] ])
    .range([0, 100])

const xAxis = d3sB.axisLeft(x)
```

In the above example, two axes will be drawn, one for each of the subscales. Each axis will also be given a class pertaining to its index (eg. `.axis-0` and `.axis-1`) so that they can be styled individually.

All of the standard `d3.axis` methods still exist. However, you have the ability to either pass a single set of parameters to them that will be transposed to each subaxis, or you can pass an array of parameters for each subaxis. For example, given two subaxis, you could pass in:

```js
d3sB.axisTop(x).tickVales([1,5,10], [10,100,1000,10000]);
```

<a name="exceptions" href="#exceptions">#</a> The exceptions to these rules are `ticks`, which will only allow you to pass the same rules for `ticks` to each subaxis and will not accept an array of subaxis parameters (use `tickArguments`, `tickFormat`, etc to bypass this) and `scale`, which cannot be used to set a new scale (do so instead on instantiation) and only returns the current array of subscales.

<b>One major difference between `d3-scale-break` axis and D3's axis is that <i>you must define your scale's domain before you pass it to your axes</i>, otherwise the plugin will not know how many subaxes to generate.</b>

### breakers

`d3-scale-break` provides two helper methods most useful for dealing with dynamic data.

<a name="breakdomain" href="#breakdomain">#</a> <i>d3sB</i>.<b>breakDomain</b>(<i>data, breakpoints</i>)

Pass an array of values – the dataset you intend to interpolate with your scale – and an array of breakpoints to `d3sB.breakDomain` and it will return an array of subdomains that you can pass to your scale. For instance:

```js
const data = [-1000, -965, -400, -20, 40, 99, 325];
const breakpoints = [-100, 100];

const domain = d3sB.breakDomain(data, breakpoints)
// [ [-1000, -965, -400], [-20, 40, 99], [325] ]
```

I've found it is useful to use a one dimensional clustering algorithm – like something found in the <a href="https://simplestatistics.org/" target="_blank">Simple Statistics</a> library – to define your break points.

<a name="breakscope" href="#breakscope">#</a> <i>d3sB</i>.<b>breakScope</b>(<i>data, breakpoints</i>)

Pass a an array of values (the dataset you intend to interpolate with your scale) and an array of breakpoints to `d3sB.breakScope` and it will return an array of subscopes that you can pass to your scale. The percentage given to each subscope will be defined by the number of datapoints that fall within its expected subscale. For instance:

```js
const data = [-1000, -965, -400, -20, 40, 99, 325];
const breakpoints = [-100, 100];

const scope = d3sB.breakScope(data, breakpoints)
// [ [0, 0.43], [0.43, 0.86], [0.86, 1] ]
```

<a name="breakdata" href="#breakdata">#</a> <i>d3sB</i>.<b>breakData</b>(<i>data, breakpoints</i>)

This is simply a wrapper method for `breakDomain` and `breakScope` that returns them both in the format:

```js
{
    domain: Array<Array>,
    scope: Array<Array>
}
```

Again, check out examples of how to use `d3-scale-break` [here](https://observablehq.com/@lukewhyte/handling-skewed-data-with-d3-scale-break).
