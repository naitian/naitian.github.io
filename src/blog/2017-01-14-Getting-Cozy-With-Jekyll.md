---
title: Getting Cozy with Jekyll
author: Naitian Zhou
description: A quick guide to easily generating new Jekyll posts with Python and Mustache
permalink: /blog/2017/01/14/Getting-Cozy-With-Jekyll/
tags:
    - post
    - Jekyll
    - Python
    - Technical
---

## The Problem

I've been having lots of fun with this blog, and Jekyll makes it easy to write
posts. I love the simplicity involved in creating a post and publishing it.
However, there were some irritations involved when starting to write a post: I
had to write the front matter manually every single time. As it turns out, I was
basically copying and pasting the front matter and changing values every time.
There must be a better way!

There isn't an easy fix for this. Since the front matter is specific to every
post, there's nothing I can specify in the Jekyll configuration. So the question
was: what do?

## The Solution

After a little bit of research into preexisting solutions, I decided it would be
easiest to just write my own little script. I have a special set up, where, in
addition to just blog posts, I also have art and project posts that I want to
semi-automate the generation of also.

I ended up writing a Python script that basically walks me through the front
matter requirements for each post. The interface looks a little bit like this:

```
blog > title: Getting Cozy with Jekykll
blog > author(Naitian Zhou):
blog > cover(required): TODO
blog > desc(A blog post): A quick guide to easliy generating new Jekyll psts with Python and Mustache
Would you like to add a tag? (y/N)y
blog > tag > name: Python
```

This generates a file `_drafts/getting-cozy-with-jekyll.md` with the following
content:

```
---
title: Getting Cozy with Jekyll
author: Naitian Zhou
cover: /assets/TODO
description: A quick guide to easily generating new Jekyll posts with Python and Mustache
tags:
    - Python
---
```

A couple of interesting notes: I implemented very basic default values, which
allowed me to leave the `Author: ` field blank, and included the ability to add
lists to the front matter.

In fact, I even made it so that I could specify more JSON schemas for posts and
the script would automatically be able to handle those as well. Here's the
relevant directory structure:

```
 - //other Jekyll files
 - _templates/
   - schemas.json
   - art.mustache
   - blog.mustache
   - project.mustache
 - _utils/
   - help.py
```

I used the mustache templating language for easy templating. The art.mustache
file looks like this:

{% raw %}
```
---
title: {{title}}
src: {{img}}
{{#other}}
others:
{{/other}}
{{#other}}
   - {{file}}
{{/other}}
description: {{desc}}
---
```
{% endraw %}

This method gives me a lot of flexibility to flesh out the templates in the
future. I could even add content into the body text, in addition to the front
matter.

I used Python and the `pystache` library to take the input and render out the
correct files.

To take input, I wrote a recursive function that looks at the schema specified
by the `schemas.json` file.

Here is the entirety of the schemas file:

```json
{
    "blog": {
        "title": "required",
        "author": "Naitian Zhou",
        "cover": "required",
        "desc": "A blog post",
        "tag": [
            {"name": ""}
        ]
    },
    "art": {
        "title": "required",
        "img": "required",
        "desc": "An art piece",
        "other": [
            {"file": ""}
        ]
    },
    "project": {
        "title": "",
        "thumb": "",
        "desc": "A project page",
        "tech": [
            {"name": ""}
        ]
    }    
}
```

The function looks like this:

```python
def prompt(title, obj):
    """Prompt for input

    :obj: Empty Object
    :returns: Filled-in object

    """
    for key in obj:
        if type(obj[key]) is list:
            if input('Would you like to add a {}? (y/N)'.format(key)) == 'y':
                while True:
                    obj[key].append(prompt('{} > {}'.format(title, key), copy.deepcopy(obj[key][0])))
                    if input('Finished? (y/N)') == 'y':
                        break
            obj[key] = obj[key][1:] if len(obj[key]) >= 2 else None
        else:
            message = '{} > {}: '.format(title, key) if obj[key] == '' else '{} > {}({}): '.format(title, key, obj[key])
            val = input(message)
            if val != '':
                obj[key] = val
    return obj
```

It prompts you for the requisite values (and keeps the default if you don't
enter anything), and recursively goes into lists if lists are present. It will
then return an `OrderedDict` that we can feed into `pystache.render()`.

Now whenever I want to write a new blog post, I can just call

```
$ _utils/help.py new blog
```

and it will hold my hand as we navigate through the front matter options.

You can find all of the files on the [Github for my blog](
https://github.com/naitian/PV2).

More specifically, here are the [Python
script](https://github.com/naitian/PV2/blob/master/_util/help.py) and the
[template directory](https://github.com/naitian/PV2/tree/master/_templates)
