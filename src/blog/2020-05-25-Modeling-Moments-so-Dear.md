---
title: Modeling Moments so Dear
author: Naitian Zhou
description: You could call this a moment generating function, but you really shouldn't
permalink: /blog/2020/05/25/Modeling-Moments-so-Dear/
tags:
  - post
  - stats
---

##
In the time that you've started reading this, there's a
<span class="output time"></span> chance that you've experienced, as Jonathan
Larson put it, a moment so dear[^1].

## Table of Contents
{:toc}

## How do you measure a year?

_RENT_ is a Tony Award and Pulitzer Prize winning musical describing the
bohemian lifestyle of a group of young artists in Lower Manhattan. It remains
one of the longest running shows on Broadway.

Even if you haven't heard of the musical, you've probably heard one of its most
famous numbers: _Seasons of Love_, which has become a popular hit in its own
right. Here is the iconic first verse:

> Five hundred twenty-five thousand six hundred minutes \\
> Five hundred twenty-five thousand moments so dear \\
> Five hundred twenty-five thousand six hundred minutes \\
> How do you measure, measure a year?

I'm less interested in how to measure a year, and more interested in getting my
fair share of moments so dear.

## Send in the ~~Clowns~~ Stats

We know from the lyrics that there are 525,000 moments so dear in one year.
There are 525,600 minutes. That means there is, on average, one moment so dear
(MsD) approximately every 1.001 minutes.

It makes sense to model the distribution of our MsDs (MssD?) as exponential.
Exponential distributions are frequently used to model "waiting time" problems,
because they have a couple of properties, which are reflected in our scenario.

1. **The random variable (in our case, the amount of time until a moment so dear,
   since the last moment so dear) is always positive.** This makes sense, since we
   shouldn't ever say something like "the next moment so dear is -3 minutes from
   the previous moment so dear"
2. **The distribution is memoryless.** That means it doesn't matter if we have
   been waiting for 3 minutes or 3 hours, the probability of a moment so dear
   occurring in the next minute will always be the same. As the cast sings in
   _Finale B_, there is "no day but today".

With those conditions, I claim our moments so dear can be modeled as:

$$
M \sim \text{Exp}(\beta = 1.001)
$$

where $\beta$ is the mean, and $M$ is the random variable for minutes until
the next MsD.

At this point, you may be asking yourself, what are the implications?

The implications, my friend, are many.

## Calculating Probabilities

First, this means **we can make claims about, say, the probability of
experiencing a moment so dear**.

<style>
    .vis svg {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    figure {
        margin: 2rem 0;
    }

    .color {
        font-weight: bold;
    }

    .color.blue {
        color: blue;
    }
    .color.red {
        color: red;
    }
    .color.black {
        color: black;
    }

    input.inline {
        min-width: 1ch;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        font-weight: bold;
        border: none;
        border-bottom: 1px dotted gray;
        text-align: center;
    }

    .output {
        border-bottom: 1px dotted gray;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

</style>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script>
    const startTime = new Date();
    const format = d3.format(".2%")
    const updateProbAnswer = function (el) {
        document.querySelector("span.prob.output").innerText = format(cdf(el.value));
    }
    const updateTimeProb = function () {
        let timeDiff = new Date() - startTime;
        timeDiff /= (60 * 1000);
        document.querySelectorAll("span.time.output").forEach(el => el.innerText = format(cdf(timeDiff)))
    }
    window.onload = function () {
        document.querySelectorAll("input.inline").forEach(el => {
            el.style.width = `${el.value.length}ch`;
            el.addEventListener("keyup", function (e) {
                e.target.style.width =  `${e.target.value.length}ch`
            })
        })
        document.querySelector("input.prob").addEventListener("change", e => {
            updateProbAnswer(e.target);
        })
        updateProbAnswer(document.querySelector("input.prob"));

        window.setInterval(updateTimeProb, 10)
        init();
    }


    let width = 600;
    let height = 350;
    let margins = {top: 5, right: 0, bottom: 40, left: 30}
    let svg, g, xAxis, yAxis;
    let pdfLine, pdfFill, cdfLine;
    let scaleX, scaleY, area, line;

    let COLORS = {
        gray: "#EFEFEF",
        blue: "#AAAAFF"
    }
    const LAMBDA = 525000 / 525600.0

    const pdf = (x) => LAMBDA * Math.E ** (-LAMBDA * x)

    const cdf = (x) => 1 - Math.E ** (-LAMBDA * x)

    const resize = function () {
        width = window.innerWidth * 0.9;
        svg.attr("width", width).attr("height", height);
        g.attr("width", width - margins.left - margins.right)
            .attr("height", height - margins.top - margins.bottom)
            .attr("transform", `translate(${margins.left}, ${margins.top})`);
        scaleX = d3.scaleLinear()
            .domain([0, 7])
            .range([0, width - margins.left - margins.right]);
        scaleY = d3.scaleLinear()
            .domain([0, 1])
            .range([height - margins.top - margins.bottom, 0]);
        area = d3.area().x(d => scaleX(d.x)).y1(d => scaleY(d.y)).y0(scaleY(0));
        line = d3.line().x(d => scaleX(d.x)).y(d => scaleY(d.y));
        xAxis = d3.axisBottom(scaleX)
        yAxis = d3.axisLeft(scaleY)
        update();
    }

    const init = function () {
        console.log("hello");
        svg = d3.select("figure.vis.distribution").append("svg");
        g = svg.append("g");
        pdfLine = g.append("path").attr("class", "pdf__line");
        pdfFill = g.append("path").attr("class", "pdf__fill");
        cdfLine = g.append("path").attr("class", "cdf__line");
        g__xaxis = g.append("g");
        g__yaxis = g.append("g");
        x__label = g.append("text");
        resize();
    }

    const update = function () {
        pdfdata = d3.range(0, width - margins.left - margins.right)
            .map(scaleX.invert)
            .map(x => ({
            x: x,
            y: pdf(x)
        }));
        cdfdata = d3.range(0, width - margins.left - margins.right)
            .map(scaleX.invert)
            .map(x => ({
            x: x,
            y: cdf(x)
        }));
        pdfFill.datum(pdfdata)
            .attr("d", area)
            .attr("fill", COLORS.blue)
            .attr("opacity", 0.8)
        pdfLine.datum(pdfdata)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            .attr("stroke", "black");
        cdfLine.datum(cdfdata)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            .attr("stroke", "red");
        g__xaxis.attr("transform", `translate(0, ${height - margins.top - margins.bottom})`)
            .call(xAxis);
        g__yaxis.call(yAxis);
        x__label.attr("transform", `translate(${width/2}, ${height - margins.top})`)
            .style("text-anchor", "middle")
            .text("minutes since last MsD");
    }
    window.onresize = resize;
</script>

<figure class="vis distribution">
</figure>

In this figure, the <span class="color black">black</span> line represents the
probability density function of our random variable $X$. The <span
class="color red">red</span> line, which is more interesting for us, represents
the cumulative density function. This value is the same as the <span
class="color blue">blue</span> area under the curve. You can interpret it as
<span class="color red">y</span> is the probability that we experience a moment
so dear in the first <span class="color red">x</span> minutes.

So if we want to know the probability of experiencing a moment so dear in the
five minutes following our previous MsD, we can plug in <input class="color red
inline prob" type="number" value="5"/> minutes and solve for <span class="color
red">y = <span class="prob output"></span></span>.

So there's a 99% chance that a moment so dear will occur within 5 minutes of the
previous one.

## Confidence Intervals

We might also be curious how confident we are in this model. After all, who's to
say there are always 525,000 moments so dear in a year? We should naturally
expect there to be some variance -- we might get some more dear moments in one
year, in a week, indeed in a minute, than the next!

Assuming we're right to use the exponential distribution, how good is our guess
of the parameters (in this case, the average waiting time)? Since we're looking
at means, we can use the Central Limit Theorem to give a rough confidence
interval. We know, for large $n$, the mean follows the normal distribution[^2]

$$
\mathcal{N}(\mu, \mu^2 / n)
$$


We can use this mean and standard deviation to calculate a 95% confidence
interval: we can state with 95% confidence that the true mean of our exponential
distribution lies in the interval $[ 0.9984, 1.004 ]$.

## Life Lessons

If you are like me, you may have been surprised by just how frequently these
moments so dear arise. After all, since you've loaded this page, there's a <span
class="time output"></span> chance that you've experienced a moment so dear.

I certainly didn't think that was the case, but maybe there's a lesson to be
learned here.  Maybe I _do_ experience a moment that I should hold dear every
minute or so.  Maybe we should cherish more of the little things and embrace the
delight that comes with our normal everyday life.

After all, the numbers never lie, right?

[^1]: assuming you experienced one immediately before this page load -- this provides a lower bound
[^2]: parameterized by the mean and the variance (notably, variance and not standard deviation)
