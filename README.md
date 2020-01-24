## What is this?

`d3-scale-break` is a plugin that removes the complexity from adding scale breaks to graphics built in Mike Bostock's [D3](https://d3js.org/). It's useful when working with highly skewed data that can't be handled through normal continuous scales. 

The plugin wraps `d3-scale` and `d3-axis` and provides all the same methods and functionality (with a couple caveats explained below).

This initial version only works with `scaleLinear`, but the plugin wrap's d3-scale's `continuous.js` and, if demand ever arises, could be expanded to function with the other continuous scales.

For examples of how to use it, [check out this blog post](https://observablehq.com/d/66bd43c7d52b952a).

## Installation

```
npm i -S d3-scale-break
```

This will install `d3-scale`, `d3-axis` and `d3-interpolate` as dependencies, but you'll need to install any other D3 libraries separately.

## API Reference

 * [scaleLinear](#scale-linear) ([.domain](#domain), [.scope](#scope), [.range](#range))
 * [axis](#axis)
 * [breakers](#breakers) ([.breakDomain](#break-domain)), [.breakScope](#break-scope), [.breakData](#break-data))