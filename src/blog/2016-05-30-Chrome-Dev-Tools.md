---
title: Chrome Developer Tools
author: Naitian Zhou
cover: /assets/cdt-cover.svg
description: An introduction to Chrome Developer Tools, originally written for TJ Dev Club.
permalink: /blog/2016/05/30/Chrome-Dev-Tools/
---
## Chrome Dev Tools
A good grasp of how to use Chrome (or equivalent) Dev Tools are one of the most fundamental skills a web developer must have. From monitoring network calls to debugging Javascript to testing out CSS style changes, Dev Tools provides a useful repertoire of functions to help you develop, test, and optimize a web page.

## Why Chrome?
There is not a particular reason why I chose Chrome Dev Tools over other browsers, other than that I use Chrome and Chrome Dev Tools more than other browsers. Chrome Dev Tools does offer a lot of useful features, some of which may apply to cutting-edge web development standards, that may not be present on other browsers.

## Opening Chrome Dev Tools
Windows: F12 or Ctrl+Shift+I
Linux: Ctrl+Shift+I
Mac: Cmd+Opt+I

## CDT and the DOM
DOM stands for Document Object Model. It's a convention for representing and manipulating objects in HTML, XML, and XHTML documents (characterized by the angle brackets).

### What can I do?
1. Inspect any element
2. View and change CSS rules
3. View the element's box model

### Inspecting Elements
There are several ways to select and inspect a particular element. One can:

Click on the element selection tool, then click on an element to jump to that position in the document.

<img src="/assets/cursor-deselected.png" height="200" />

Click on a specific element in the Dev Tools _Elements_ view.

<img src="/assets/click-element.png" height="200" />

### What Can I Do With These Elements?
Now that you have selected an element, you can right-click on the element to see some of the actions you can do:

<img src="/assets/actions.png" height="200">

Especially notable is the ability to toggle states such as active, hover, etc.

## Styling
One of the most useful aspects of Dev Tools is the ability to change styles easily.

With an element selected, you can easily view its styles.

The "Styles" tab contains all of the CSS rules that govern the selected element.

<img src="/assets/styles-tab.png" height="400">

We can see that the selected element has an id of "overlay", and a class of "shell", and that there are CSS rules defined for those selectors. The overridden styles are struck through. You can also toggle element state in this tab.

If you have animations or transitions with a timing function defined, you can also use the cubic bezier editor to help you with your animations.

<img src="/assets/bezier.png" height="200">

### Box Model
The Computed Box Model provides the final computed values of margin, padding, width, height, etc. This is particularly useful when creating responsive layouts, or when there's an awkward gap in your layout that you can't find the source of. You can access this view by clicking on the computed tab.

<img src="/assets/computed.png" height="400">

## Network
Another very useful aspect of Dev Tools is the _Network_ tab. This allows you to view all requests made from this webpage. This includes requests for images, files, fonts, scripts, etc. 

It also helps you determine if there is a major bottleneck to page load times. In this image, try to find at least one request of each of the following types:

1. HTML Document
2. Font
3. Stylesheet
4. Javascript File
5. Image

<img src="/assets/network-tab.png" height="400">

### Example Case Study
Cubemania is a Rubik's Cube timing website that allows users to save their times. I use it a lot. Let's analyze some of the requests it makes, specifically when a user logs in.

<img src="/assets/cubemania-home.png" height="200" alt="Cubemania Home Screen">

Now let's open up Chrome Dev Tools and switch over to the Network Tab.

<img src="/assets/cubemania-pre.png" height="200">

Make sure that the red "record" button in the top left is active.

Now I'll click log in and see what requests are made.

We're hit by a barrage of requests. Let's look at the most interesting ones...

<img src="/assets/cubemania-barrage.png" height="200">

There's a POST request at the very top. Usually these are for form submissions. Let's click it open and take a more detailed look.

<img src="/assets/cubemania-post-1.png" height="200">

This a lot of information! We can deduce some things about how Cubemania works on the server side! For example, we now know that this POST request is making a call to the `http://www.cubemania.org/session` endpoint, and that our session is stored in a `_Cubemania_session` cookie. We can also see all of our request headers, which we might be able to use to recreate this request manually. If we scroll further down, we see the really interesting bit: the form data.

<img src="/assets/cubemania-post-form.png" height="200">

Now, I blacked out my password, of course, but as you can see, we know exactly what fields are passed into the POST request! Now, you might notice that there is also an `authenticity_token` field. This is generated on the server side to try to make sure that you cannot spoof these requests. A bit of light Googling reveals that this is common in Ruby on Rails web apps. However, if we access the contents of the HTML first, we will be able to find the token and pass it into the POST request.

## Resources Tab
The resources tab contains information on the majority of client-side storage options. This includes local storage and cookies. 
### Local Storage
If we click open the local storage section, we can find that Cubemania stores all of my times in the local storage. 

<img src="/assets/cubemania-storage.png" height="400px">

### Cookies
We can also view the cookies that Cubemania has stored. In here we do indeed see the `_Cubemania_session` cookie we saw mentioned previously.

## Exercises
1) Go on the [Cubemania](http://www.cubemania.org) website and answer these questions:
- Click on the 'Users' tab. What type of CSS selector is used to apply the yellow background on hover effect?
- Search for "naitian" in the search box. Monitor the network traffic. What is/are the query string parameter(s) of the search query? What is/are the value(s) of the parameter? Is this request a GET request or POST request? Why does that make sense?

2) Visit this wonderful lawn care website: [http://kamronsoldozy.github.io](http://kamronsoldozy.github.io)
- Look in the Console. What are some errors? Are any of these errors related to each other?
- Based on these errors, what part of the home page is broken? What is it supposed to do?
- How can we fix this?

Bonus) Solve a Rubik's cube in under 30 seconds.

## Further Reading
Chrome Developer Tools has a lot more to offer than just what we covered here. If you'd like to find out more, here are some materials to keep you occupied.

- [Google Official Dev Tools Site](https://developers.google.com/web/tools/chrome-devtools/?hl=en)
- [Chrome Developers YouTube Channel](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw)
- [Totally Tooling Tips](https://developers.google.com/web/shows/ttt/?hl=en)


## Exercise Answers
>1a.) `#content a`

>1b.) Parameter: `q`, Value: `naitian`, `GET` request, There is no need for a `POST` request, since this value does not need to be kept confidential.

>2a.) There are three errors. The failure to load `jquery.min.js` is directly tied to the `Uncaught ReferenceError: $ not defined`.

>2b.) By viewing the details of the `ReferenceError`, we see that we need jQuery in image_slide.js, which is supposed to provide an image slider.

>2c.) If we load in jQuery, the image slider *should* no longer be broken, and will alternate between the 2 images.
