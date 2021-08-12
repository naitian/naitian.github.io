---
title: Matisse is a Team Player
author: Naitian Zhou
permalink: /blog/2019/07/26/Matisse-is-a-Team-Player/

description: Generating stories from book covers

---

{% include image.html file:"bookstory.png" caption:""
size:"fullwidth"%}

##
> Henri Matisse works well with others in the courtyard of the Kabbalist, and in
> the morning, Leonardo's shadow got to give the people what they want.

Two very influential artists, to be sure, but what was Matisse doing
collaborating with Kabbalists, and what exactly did the people want from
Leonardo's shadow?

## Table of Contents

## Some Context

In mid-June, Randall Munroe, the genius behind [xkcd](http://xkcd.com) and the
author of
[quite](https://www.amazon.com/Thing-Explainer-Complicated-Stuff-Simple/dp/0544668251/)
a
[few](https://www.amazon.com/What-If-Scientific-Hypothetical-Questions-ebook/dp/B00IYUYF4A)
[books](https://www.amazon.com/How-Absurd-Scientific-Real-World-Problems/dp/0525537090),
announced he was going on a book tour to promote his latest book: _How To:
Absurd Scientific Advice for Common Real-World Problems_

As part of the announcement, he introduced an interesting challenge:

> Write the best story using nothing but book covers.

The winner of the challenge would be rewarded by a visit from Munroe as part of
the tour. Even though Ann Arbor was already in the itinerary, I couldn't help
but think about this challenge... and how I could use some of my linguistics
knowledge to my advantage.

## The Project

I decided I would try to hack this challenge by acquiring a dataset of book
titles, and having a computer generate these stories for me.

I found a [list](https://github.com/uchidalab/book-dataset/) of over 200,000
books listed on Amazon, and a couple of Jupyter notebooks and Python packages
later, we were off to the races.

### Grammar School: Constituency

The key concept behind this project was something I learned in my introduction
to linguistics class last fall: constituency trees. The basic idea is that each
sentence can be represented as a combination of words and phrases
(constituents).

For example, a sentence is, in its base form, a noun phrase and a verb phrase:

`S -> NP VP`

And a noun phrase might be a noun, with optional adjectives and determiners, and
maybe a prepositional phrase.

`NP -> [DET] [ADJ] N [PP]`

And a prepositional phrase, in turn, might be a preposition followed by a noun
phrase.

`PP -> [P] [NP]`

And in this way, we can construct a very expressive and _productive_ grammar for
the English language. Productivity here means that, with even a limited
vocabulary, we can form many distinct sentences and thoughts.

So the main idea was we would label each book title as a noun phrase, verb phrase,
adjective phrase, etc. Then, we could use this grammar to compose sentences.

### The Nitty Gritty

Although there were over 200,000 books in the dataset, I couldn't use all of
them. In fact, out of 32 categories, I used only 10. Books with categories such
as cookbooks, calendars, etc were excluded because those titles were generally
not very useful.

The categories I ended up using were:

- Biographies & Memoirs
- Children's Books
- Engineering & Transportation
- History
- Humor & Entertainment
- Literature & Fiction
- Mystery, Thriller & Suspense
- Science Fiction & Fantasy
- Self-Help
- Teen & Young Adult

I also did some preprocessing on the titles before parsing the constituents.

```py
cleaned_titles = books.title.str.lower()  # Lowercase
cleaned_titles = cleaned_titles.str.replace(r"\(.+\)", "")  # Remove everything in parentheses
cleaned_titles = cleaned_titles.str.replace(r"\[.+\]", "")  # Remove everything in brackets
cleaned_titles = cleaned_titles.str.replace(r"(volume|vol\.) (\d+|\w+)", "")  # Remove volume numbers
cleaned_titles = cleaned_titles.str.replace(r"issue (\d+|\w+)", "")  # Remove issue numbers
cleaned_titles = cleaned_titles.str.strip('-, ')  # Remove dashes
cleaned_titles = cleaned_titles.apply(lambda x: x.split(':')[0])  # Only keep first part of title (no subtitles)
```

The last part -- getting rid of subtitles -- sometimes helped and sometimes did
not.

### Parsing

I used [benepar](https://pypi.org/project/benepar/), which is a state of the art
constituency parser that fits nicely into NLTK. I found that it provided decent
results. One issue that I ran into was handling more granular details such as
subject verb plurality alignment. In those cases, I wanted to know what the noun
was in the noun phrase, etc.

For this, I used a different grammar model: dependency grammar. In dependency
grammars, instead constituents, each word is dependent on exactly one other word
in the sentence. This image from Wikipedia is pretty good at showing the
difference between the two.

![Dependency vs Constituency](https://upload.wikimedia.org/wikipedia/commons/0/0d/Wearetryingtounderstandthedifference_%282%29.jpg)

I use the root of each dependency tree as the "active noun" or "active verb" in
the phrase, and their parts of speech include markers for plurality, properness,
verb tense, etc.

### Creating Sentences

Afterwards, it was just a process of returning a random sample for each
constituent. I wanted the sentence generation to be completely automated, but I
ended up adopting a more hybrid process where I would query for noun phrases,
for example, until I found one I thought was interesting, then move on to a verb
phrase.

### Gallery

Here are a couple more sentences I put together with the help of computers. Stay
tuned for an online interactive version in coming days that will let you
construct your own book cover stories.

![](https://imgur.com/w7eq9RN.jpg)
> Radioactive horses and ponies thank you for being a good friend, but not the
> hippopotamus.

![](https://imgur.com/PXWmSqe.jpg)
> 19 varieties of gazelle found apple, apples everywhere!

![](https://imgur.com/eLuT35e.jpg)
> The Russian Kremlin desperately seeking exclusivity around the world with
> Justin Bieber.
