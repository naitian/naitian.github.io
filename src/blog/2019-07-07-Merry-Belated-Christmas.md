---
title: Merry Belated Christmas
author: Naitian Zhou
permalink: /blog/2019/07/07/Merry-Belated-Christmas/

description: The much delayed part 2 of naitian.holiday festivities

---

## Christmas in July

It's Independence Day when I'm writing this, which seems like a good time to
write about my winter holiday cards from last year. In a previous blog post, I
wrote about a small project I made with my
[naitian.holiday](https://naitian.holiday/isyp) domain name.  However, that
wasn't the original purpose for the domain. The first use for the domain was
digital holiday cards for some of my friends.

## Table of Contents

## Planning

> AKA all the things I wanted to do but didn't.

There were a couple of clear requirements that were non-negotiable:

1. There had to be at least some form of authentication (so not everyone can see
   everyone else's card)
2. Emails would be sent out notifying people of their cards.
3. Cards need to be personalized with:
    - Greeting
    - Name (duh)
    - Message

Later, I also decided a couple more requirements, both for fun and for
education:

1. Everything would be compiled and hosted statically on S3.
2. In the theme of using AWS for everything, I'd also send email notifications
   with Amazon's Simple Email Service (SES) and handle domain name /
   certificates with Route53.
3. Each person would only see pretty URLs (e.g. naitian.holiday/nate)
4. Cards would include these draggable Polaroid-style pictures from my Google
   Photos.

## Implementation

> AKA what I ended up doing

### Infrastructure

I will be totally honest with you and say I don't actually remember all the
details to the infrastructure on AWS, but it wasn't super complex. The gist is:

- All the static files are hosted with S3's static website hosting.
- I used Cloudfront as the CDN for the S3 files.
- I have a hosted zone for `naitian.holiday` in Route53 which points to the
  Cloudfront endpoint (which in turn points to the S3 bucket).
- Photos were hosted on Google Photos

### Design

Aesthetically, I decided to go for a festive red with a subtle gradient. I chose
a classy serif typeface and drew this freaking amazing ~~Christmas~~
non-denominational holiday tree.

### Build Process

Each card was defined as a yaml file. I wrote a Python script to read these yaml
files and used markdown to render them into HTML files. At the same time, I
generated the SES email template data for bulk sending the notification emails.

I also had a Makefile which would run the rendering script, compile the SCSS
into CSS, minify CSS and JS, and push everything to S3. There were also Make
steps which would send a test email and send out the actual emails.

### Authentication

One of the most interesting parts of this whole exercise was figuring out a good
authentication method. I definitely did not want to make anyone sign in or
create any accounts (partly also because I wanted this to be a totally static
site).

I ended up compromising with a "good-enough" authentication plan, which I had to
alter a little bit to also keep the pretty URLs. Here's how it ended up working:

1. When a card is rendered, it is actually placed in a directory named after its
   SHA256 hash.
2. This hash is used as an auth token in the link.
3. Not only is an HTML file generated with the card's content, another HTML page
   is generated with Javascript for authentication and a hidden input field
   containing a SHA256 hash of the token.
4. When a user navigates to the site (e.g. naitian.holidy/nate), they are
   actually navigating to the page with only the auth code.
    - On the client side, the token (if it's present) is hashed and compared
      to the correct token.
    - If incorrect, the user is rejected.
5. If correct, there is an XHR request that fetches the actual HTML and displays
   it.

This means the user would have a hard time even realizing that any
authentication had occurred in the first place.

To recap, for each card, the path structure looked like this:

```
naitian.holiday/<SHA256>/index.html   <- this is the HTML for the card
naitian.holiday/nate/index.html       <- this is the HTML for authentication
```

Of course, I also added a `robots.txt` which disallowed any crawling. This makes
it pretty difficult to find the (very much public) SHA256 paths of any of the
cards.

So, while not airtight, this worked well enough to prevent people from just
typing in names of other people to see their cards.

I also stored the tokens in local storage, so after the first visit, the token
isn't actually required.

Nifty.

### Email Notifications

Emails were surprisingly straightforward to set up. I used the Simple Email
Service from Amazon. Initially, I planned to do a lot more CSS for the HTML
emails, but ultimately decided against it for two reasons: it would have been
more work to implement and try to test, and I felt like it would feel more
personal if it was more "raw".

I had a `make` rule which would send just test emails to myself and a different
rule to send out the emails for real.
