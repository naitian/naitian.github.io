---
title: If You Start Playing...
author: Naitian Zhou
permalink: /blog/2019/01/06/If-You-Start-Playing/

description: Part 1 of naitian.holiday festivities

---

## naitian.holiday

I discovered early December 2018 that there existed `.christmas` and `.holiday`
TLDs. Naturally, I had to purchase one, so I sprung for the non-denominational
(and, more importantly, cheaper) [naitian.holiday](https://naitian.holiday)
domain.

The next question, of course, was what I should do with it. I ended up using it
for two projects, so I definitely got my money's worth. One of the projects was
[if you start playing](https://naitian.holiday/iysp/?preset=umich).

## if you start playing...

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If you start playing YouTube Rewind 2018 at 11:53 and 2 seconds on New Year&#39;s Eve, Will Smith will say &quot;uhhhh that&#39;s hot&quot; at exactly midnight.</p>&mdash; Fab NZ (@fab_nz) <a href="https://twitter.com/fab_nz/status/1079555364759031808?ref_src=twsrc%5Etfw">December 31, 2018</a></blockquote>

Inspired by this meme format, I decided to make a New Year's countdown that
would automatically start playing these videos at the correct time.

Here are the specs for the project:

### specs

1. **client side**: it really doesn't need a backend, and I wanted to host on
   S3, serve through CloudFront, etc.
2. **customizable**: I want to be able to share links to custom videos /
   timestamps.
3. **dark theme**: for the nighttime countdown, of course.

### tech

Building out the application was actually pretty straightforward, thanks to the
Youtube iframe API.

To make it customizable and all on the client side, I used `window.location` to
get URL parameters.

```js
let url = new URL(window.location.href);
if (url.searchParams.get('custom')) {
   const id = url.searchParams.get('id');
   const timestamp = url.searchParams.get('timestamp');
   vid = {
       id,
       timestamp
   }
} else {
    // Get from list of presets
}
```

You can check it out at
[naitian.holiday/iysp/?preset=umich](https://naitian.holiday/iysp/?preset=umich).

The [Github Repo](https://github.com/naitian/startplaying).
