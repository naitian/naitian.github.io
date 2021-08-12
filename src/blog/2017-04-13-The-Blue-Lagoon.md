---
title: The Blue Lagoon
author: Naitian Zhou
description: The exciting world of speech synthesis
permalink: /blog/2017/04/13/The-Blue-Lagoon/
tags:
    - post
    - ai
    - machine-learning
---
## The Blue Lagoon

*"The Blue Lagoon is a 1980 American romance and adventure film directed by
Randal Kleiser"*

This phrase is stuck in my head. Not because I'm a huge fan of poorly rated
movies, but because it's a test phrase that Google likes to use to show off its
speech synthesis algorithms. Speech synthesis has kinda been stuck in my head
too.

## Tacotron Yum

   Recently, researchers at Google published a paper describing a text-to-speech
generation model called “Tacotron”. It uses deep learning to learn how to
generate audio based on input text. Besides catching my attention due to the
delicious sounding title, the paper intrigued me because of the problems that
arise when trying to synthesize speech from text. Current speech synthesis
models in production rely primarily on concatenation of pre-recorded words, with
some smoothing to make the words flow together more. The problem with this
method is that the length of words and intonation are not taken fully into
consideration, causing the synthesized audio to sound robotic and unnatural.

   Synthesizing speech is a non-trivial problem, mainly because there is a
lot of interpolation involved. Raw text does not provide a lot of clues for the
tone, inflection, and expressiveness. The inflection in asking a question, such
as "It's your birthay today?", is significantly different from that in a statement
such as "It's your birthday today!" In addition, individual voices,
obviously, differ by a lot, based on gender, nationality, etc. It's hard to
teach a computer to generalize the important parts.

   Tacotron takes a different approach from the current concatenative
methods: it uses an “end-to-end” approach, wherein it learns from text/speech
pairs to determine how to directly generate the raw spectrogram given an input
text. This allows for it to include features such as a natural rhythm of speech,
incorporate stress and intonation. The strength of a deep learning model is that
it can naturally incorporate features that may otherwise go overlooked. Since it
learns from recordings, for example, and uses that to generate speech, the
generated audio also includes mouth-sounds and breathing that make the speech
sound more human.

   Speech synthesis is an incredibly relevant application of computer
science, which is why I found the topic so interesting. Text to speech could be
used to automatically generate audiobooks, create dialogue procedurally, and
provide accurate verbal translations. Personal assistant applications that use a
conversational interface would require natural speech synthesis for a more
immersive user experience.

## Additional Reading

You can read the Tacotron paper [here](https://arxiv.org/abs/1703.10135) (arxiv
1703.10135).

You can read about another one of Google's speech synthesis projects, WaveNet,
[here](https://deepmind.com/blog/wavenet-generative-model-raw-audio/) (website)
or [here](https://arxiv.org/abs/1609.03499) (paper; arxiv 1609.03499).
