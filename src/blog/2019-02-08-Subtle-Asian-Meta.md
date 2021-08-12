---
title: Subtle Asian Meta
author: Naitian Zhou
permalink: /blog/2019/02/08/Subtle-Asian-Meta/

description: Going one step deeper

---

> Shameless plug: If you, one of the 5 people who visit this blog every month,
> work in computational linguistics or related research, please contact me at
> naitian at umich.edu. I would love to pick your brain and maybe even work with
> you. Thank you and enjoy the rest of the show.

## Subtle Asian Data

I recently published a joke paper I wrote over the course of about three months
(with the help of David). While entirely a joke, it also contained entirely real
analysis of *subtle asian dating* user demographics and language.

Here's the abstract:

> Recent subtle asian Facebook groups have gained incredible popularity among
> young adult Asian diaspora. We focus on one of these groups – *subtle asian dating*
> – and conduct a content analysis on its posts to examine what it can tell us about
> the members of Asian youth subculture, and how their identity and culture affect
> their view of and approach to dating and relationships.

You can find the entire paper
[here](http://www-personal.umich.edu/~naitian/pub/subtleAsianData2019.pdf). I
highly recommend it -- what it lacks in insight, it makes up for in just how
ridiculous it is.

## The Critical Reaction

The obvious resulting course of action was to post my paper on *subtle asian
dating*. The post took off in popularity, gaining over 3.4 thousand reactions
and close to a thousand comments over the next three days.

The comments were pretty interesting to read at first, and for maybe the first
half of the first day, I was keeping up pretty closely as they rolled in.

That's when I made the following astute observation to my friend:

> So I think the breakdown in comments right now is:
>
> 50% about how it was typeset in latex
>
> 20% why did you do this
>
> 10% umich represent!
>
> 10% I'm ashamed to go to the same school as this guy
>
> And 10% miscellaneous

To which she responded:

> HAHA
>
> Misc tagging
>
> always

Naturally, after the commenting had died down, I had to check myself. How far
off was I with my predictions? (Hint: very)

Just how many comments _were_ misc tagging? (Hint: not that many)

Exactly how many people were impressed with my LaTeX skills? (Hint: my $\LaTeX$
skills are not very impressive)

## Subtle Asian Meta

So I went ahead and scraped all the comments from the post.

### Data Collection

For the curious, I did all the data collection in Chrome Dev Tools.

Terrible code, but it worked I guess.


### Analysis

I tossed the generated JSON object into Jupyter Notebook to see what I could
get. The following numbers are just for top level comments (this means replies
are excluded):

There were **618** comments. Almost **95%** of users tagged someone else in their
comment, so "misc tagging" was pretty accurate. However, I was more interested
in who commented _only_ to tag someone else. That is, the body of their comment
consisted only of a tag.

In that case, the number drops to less than **25%**. But wait, there's more.

How many people were impressed with my LaTeX? Surely less than 50%. And Shirley
would be correct. In fact, only **6.5%** (N=40) mentioned LaTeX in their
comments.

And how many people thought it was cool that I went to their school? Well, I
looked through the posts and filtered by any of the following keywords:

`
['school', 'michigan', 'hoo', 'blue', 'umich', 'mich', 'uva', 'virginia']
`

which encompasses both U-M and UVa. A couple of false positives? Probably. False
negatives? Also probably. But this gives us a general sense. Even fewer comments
matched the criteria for this filter: **5.8%** (N=36).

Finally, I took a cursory glance at who was incredulous, by filtering by the
following keywords:

`
['wtf', 'why', 'time', 'tf', 'believe']
`

And it turns out that only includes **5%** of posts.

In conclusion, I was totally wrong, but my version of reality was way funnier,
so who really won this fight?

So there you go. *subtle asian metadata*
