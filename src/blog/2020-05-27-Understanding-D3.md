---
title: Understanding D3
author: Naitian Zhou

description: A blog post
permalink: /blog/2020/05/27/Understanding-D3/

---
> This is a first draft. I will likely revise (multiple times) in the future
> for clarity. But hopefully, even in its current state, you might find this
> useful.

## Table of Contents

## The strange case of D3

Dr. Jekyll: D3 is famous for being an incredibly versatile visualization
library.

Mr. Hyde: D3 is _infamous_ for having a steep learning curve and being difficult
to understand past copy and pasting examples.

I have experienced the dark side of D3, but recently, I feel as if I have had
minor breakthrough, so hopefully I can in turn provide you with some sort of
lightbulb moment.

But just as a disclaimer: in no way do I profess to be an expert (or anywhere
close). I've still a lot to learn. I just think something clicked for me.

## The big idea (and why it's so hard)

Having gained some understanding, I now know this is the mantra you must repeat
to yourself.

> D3 gives you **functions** to work with **data** bound to **elements**.

Does that sound kind of familiar? It probably should. Here's the first sentence
on the D3 website.

> D3.js is a JavaScript library for manipulating documents based on data

and later on...

> D3 allows you to bind arbitrary data to a Document Object Model (DOM), and
> then apply data-driven transformations to the document

That leads me to believe D3 is difficult to learn because it relies on a very
simple and powerful concept -- too simple to warrant understanding when just
starting out and too powerful to appreciate without building and seeing lots of
examples.

## Let's start with just a line

We will begin with the three basic parts to working with D3. We will have an
element in the DOM (element). We will have some data, with which we'll draw a
line (data). And we'll use D3 to put those things together (functions).

D3 has a lot of conventions. These are useful to learn as a stepping stone to
learning the concepts, so I will try to use a few of them here.

This is what the result looks like.

<script src="https://d3js.org/d3.v5.min.js"></script>
<style>
    svg {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
<script>
function draw () {
    // Data
    const X = [1, 2, 3, 4, 5];
    const Y = [3, 5, 1, 6, 9];
    const data = X.map((x, i) => [x, Y[i]]);

    // Set sizes
    let width = 600;
    let height = 300;
    let margin = {top: 5, right: 0, bottom: 30, left: 30};

    // Create functions
    let xScale = d3.scaleLinear()
                    .domain(d3.extent(data.map(d => d[0])))
                    .range([0, width - margin.left - margin.right]);
    let yScale = d3.scaleLinear()
                    .domain(d3.extent(data.map(d => d[1])))
                    .range([height - margin.top - margin.bottom, 0]);
    let line = d3.line().x(d => xScale(d[0])).y(d => yScale(d[1]));
    let xAxis = d3.axisBottom().scale(xScale);
    let yAxis = d3.axisLeft().scale(yScale);

    // Create elements
    let svg = d3.select("figure.example > svg")
        .attr("width", width)
        .attr("height", height)

    let chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    let chart__line = chart.append("path")
        .attr("fill", "none")
        .attr("stroke", "black");
    let chart__xaxis = chart.append("g")
        .attr("class", "g__xaxis")
        .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`);
    let chart__yaxis = chart.append("g")
        .attr("class", "g__yaxis")

    // Bind data and call functions
    chart__line.datum(data)
        .attr("d", line);

    chart__xaxis.call(xAxis);
    chart__yaxis.call(yAxis);
}
window.onload = draw;
</script>
<figure class="example">
<h2 class="figure__title">Figure: Just a Line Plot</h2>
<svg>
</svg>
</figure>

### Set up

Let's start with the easiest part to set up: the DOM. This is all the HTML I
have:

```html
<figure class="example">
<h2 class="figure__title">Figure: Just a Line Plot</h2>
<svg>
</svg>
</figure>
```
We have a simple dataset (5 points to form a line).
```js
const X = [1, 2, 3, 4, 5];
const Y = [3, 5, 1, 6, 9];
```
Again, nothing special.

### The Code

This is the interesting part, but don't be intimidated. In fact, this chart is
made with only 16 lines of actual code.

First, let's define some variables we want to keep track of:
```js
let width = 600;
let height = 300;
// this is the margin convention
let margin = {top: 5, right: 0, bottom: 30, left: 30};
```
Remember our mantra: data, function, elements. Again, let's start with elements.

#### Elements
```js
// Create elements
// select SVG
let svg = d3.select("figure.example > svg")
    .attr("width", width)
    .attr("height", height)

// create chart
let chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
let chart__line = chart.append("path")
    .attr("fill", "none")
    .attr("stroke", "black");
let chart__xaxis = chart.append("g")
    .attr("class", "g__xaxis")
    .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`);
let chart__yaxis = chart.append("g")
    .attr("class", "g__yaxis")
```
I won't go too far into the details here, but the basic idea is we create all of
our chart elements under a single "chart" group. This has to do with the
convention of defining a size for the SVG, defining margins, and adjusting the
size of your "canvas" accordingly.

I want to stress that this _sets up_ our chart, but we've yet to actually draw
anything. We have added the **elements**, but we haven't set up any functions or
bound any data. So let's do some of that now.

#### Functions
```js
// Create functions
let xScale = d3.scaleLinear()
                .domain(d3.extent(data.map(d => d[0])))
                .range([0, width - margin.left - margin.right]);
let yScale = d3.scaleLinear()
                .domain(d3.extent(data.map(d => d[1])))
                .range([height - margin.top - margin.bottom, 0]);
let line = d3.line().x(d => xScale(d[0])).y(d => yScale(d[1]));
let xAxis = d3.axisBottom().scale(xScale);
let yAxis = d3.axisLeft().scale(yScale);
```
Here, we set up our scales, axes, as well as the line generator. This doesn't
draw anything either, because we've yet to put the functions and elements
together. Luckily for us, that step is pretty easy.

#### Data
```js
// Bind data and call functions
chart__line.datum(data)
    .attr("d", line);

chart__xaxis.call(xAxis);
chart__yaxis.call(yAxis);
```
I want to focus on two things here. First, notice how we now bind our data to
the `chart__line` element. We use `datum` because we are drawing one line, so
we're binding this one piece of data (singular: datum). Now, when we set the `d`
attribute, we can pass in a function that takes the datum (our array of
coordinates) as input and returns the line path as output.

Second, notice how we're drawing the axes. We set up the `xAxis` and `yAxis`
functions earlier, and the `.call` is essentially passing our selection as input
to the function. It's equivalent to `xAxis(chart__xaxis)`, for example, so don't
let the syntax scare you.

Using `.call` is convenient for chaining functions, and this pattern is
recommended for creating reusable charts. The idea is you can have a selection
of `svg`s with bound data, call your chart on that selection, and draw charts
using the bound data for each element in your selection.

## Why this way?

It's possible to create D3 graphics without following this pattern. I'd bet most
people (myself included) did not start creating graphics with this pattern. So
why take the extra effort to learn and implement these ideas?

There are a couple of reasons which go hand-in-hand.

1. This is the way D3 was designed to be used.[^1]
2. Because of this, when you implement things this way, things are more likely
   to "just work".
3. Also because of this, debugging becomes easier because you're not trying to
   resolve any conflicts between your mental model and the model D3 adopts.

I'll provide an example of how you might be tempted to do things, and how those
end up causing headaches later on. The tl;dr is that problems arise when you
don't separating elements, data, and functions effectively.

In the past, I used to do this a lot:
```js
// draw axes
g.append("path").datum(data).attr("d", line)
g.append("g").call(xAxis)
g.append("g").call(yAxis)
```
**Why is this bad?** We don't save our selections, and you can think of this as
treating the `path` element as bound to this specific `datum`.

**What does that mean?** If we want to change our data, we will update `data`
and run that code again, but since we don't keep a pointer to the `path`
element, we end up just appending another path. Instead of redrawing the line,
we draw a new line. Additionally, if we wanted our graphic to be responsive
(that is, resize when the browser window resizes), we need to update and redraw
our axes. That means we should also keep pointer to the axes elements.

**Moral of the story?** Set up your elements once, then use D3 functions to bind
data and draw many times. Since you're not creating a new element every update,
D3 can keep track of the current bound data and update accordingly. This also
lets you use D3 transitions more easily.


[^1]: I will qualify this statement by saying that, since I didn't design D3, technically I don't know if this is true. That said, having read a lot of Mike Bostock's (and others') writing on best practices for D3, this seems to be the "right way"
