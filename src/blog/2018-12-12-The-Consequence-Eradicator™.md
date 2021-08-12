---
title: The Consequence Eradicator™
author: Naitian Zhou
description: Unfortunately, our Conrad doesn't have a soft British accent.
permalink: /blog/2018/12/12/The-Consequence-Eradicator/

---


## Table of Contents

## MHacks 11 (and the customary apologies)

I have been kind of terrible about keeping up this blog. Sorry about that. That said,
a lot has happened since the last blog post almost a full year ago. For one thing, I
am a college kid now!

![Go Blue!](https://media.giphy.com/media/xWBUky3nYTGDwCUH0T/giphy.gif)

I also had a great time as a tech intern for Capital One over the summer (something I'm
definitely going to be writing about very soon).

But let's get back to this story.

MHacks 11 was held at the University of Michigan from October 12 - 14. I convinced my
friend, David, to fly up to Ann Arbor all the way from Charlottesville for the event.

What follows is the story of how David (UVA '19), Renee (also U-M '22), and I did our parts in
contributing to the eerie convergence between the Simpsons and reality.

## Conrad: the Consequence Eradicator

<iframe width="560" height="315" src="https://www.youtube.com/embed/edoo6dH19ko" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You don't need to watch the whole video (though I highly encourage it). Basically, Lisa and a
team of programmers write an artificial intelligence (Conrad) to predict the outcomes of
social media posts.

Thusly inspired, we made a Chrome extension which predicts the reactions a post on Facebook
would get.

## Step 1: Data Collection

Fortunately for us, [@minimaxir](https://github.com/minimaxir) on Github had a relatively large
dataset of public posts from large Facebook pages, and their reactions. The dataset is linked
[here](https://github.com/minimaxir/interactive-facebook-reactions). I only found out later that
he also did our exact same project, but whatever.

Anyway, that was data collection.


## Step 2: Data Preprocessing

We chose only to look at posts with text content (so we ignored shared links, photos, videos, etc.)
We also only considered posts less than 1000 characters long, and which had more than 11 non-like
reacts.

## Step 3: Modelling

We spent most of Saturday doing preprocessing, and then eventually realized we still had to actually
build a model. We started off by trying a random forest regression with bag of words. Results were not
great.

After tweaking the hyperparameters around a bit, it became clear results weren't improving.

That's when we took the leap to using `gensim` and `doc2vec` to generate sentence embeddings.
This meant that, instead of just using word frequency, we used a much more complex model to encode
posts which took into account word order.

This yielded much better results, especially after I also normalized the target output.

## Step 4: Building the Extension

At this point, it was the morning of demos, and while we had a halfway decent model, the chrome
extension was non-existent.

So came the mad scramble, in which I was literally writing code as we walked to the IM building.
I wrote a small Flask API backend, which the Chrome extension was supposed to call.

Initially, I didn't want to deal with the Chrome messaging protocol, so I tried to make the call
directly from the content script (which ran as Javascript code on the client with no extra
permissions).

We ran into a roadblock, where cross origin requests were forbidden. I tried to overcome this
by editing my `/etc/hosts` file to redirect some ancillary Facebook domain to `localhost`. This
_almost_ worked, except Facebook also expected https-only requests, so I was stuck with having
to do the _correct_ thing of using Chrome's messaging protocol.

By this point, I'm writing the code while we are standing at our demo table.

It turned out to actually be super easy to use the messaging protocol, but that didn't stop me
from screwing up 11 times before I finally got everything working.

![Literally Me Celebrating](https://media.giphy.com/media/l2JejtUtX0ImRvLnq/giphy.gif)

This was me when I finally got the Chrome extension to work.

## Wrap-Up

Unfortunately, I have no screenshots of the actual app working, _but_ if you want to run the janky
code for yourself, it's all open source on [Github](https://github.com/naitian/conrad).

I learned a lot through this hackathon. It was the first hackathon project that I did with a
heavy data science workflow.

This hackathon was a blast, and [David](http://davidzhao.me) and [Renee](https://github.com/reneeli411)
were awesome teammates.
