---
layout: base.njk
title: Naitian Zhou
---

<style type="text/css" media="screen">
.profilepic {
width: 70%;
margin: 0 auto;
}

.profilepic img {
width: 100%;
}
</style>

# <span class="l1">Hi, I'm **Naitian**.</span>

<span class="l1">That's pronounced naɪtjen like 🌙 💴.</span>

<!--
<input type="range" list="tickmarks" class="verbosity" max=3>
<datalist id="tickmarks">
  <option value="0" label="tl;dr">a tl;dr</option>
  <option value="1">the gist of it</option>
  <option value="2">the basics</option>
  <option value="3">my life story</option>
</datalist>
-->

<script type="text/javascript">
document.querySelector(".verbosity").addEventListener("change", (e) => {
    console.log("CHANGE")
    console.log(e.target.value)
})
</script>

I'm a PhD student at the UC Berkeley School of Information, where I'm advised
by David Bamman and supported by the NSF graduate research fellowship.

My research centers on developing computational methods to understand meaning
embedded in style. This draws on a variationist sociolinguistic / cultural
anthropological perspective of culture, and spans the fields of NLP,
computational social science, and cultural analytics. Methodologically, I am
interested in multimodal approaches to language, vision and speech. I also care
a lot about the news, data journalism, data visualization and crossword puzzles.

If you are interested in doing research or grad school, I am always happy to
chat about my experiences. If you are a Berkeley undergrad interested in doing
cultural analytics research, you should apply for a [UROP
opportunity](https://research.berkeley.edu/urap/application/) with my advisor,
David Bamman.

<figure class="profilepic">
<img src="assets/selfie.png" alt="A collection of photos of my face."/>
<figcaption>
<p>
<a href="https://web.eecs.umich.edu/~fouhey/#:~:text=One%20picture%20is%20hard%20to%20identify%20a%20person%20with.">"One picture is hard to identify a person with" ~ David Fouhey</a>
</p>
</figcaption>
</figure>

## Updates

- Dec. 2024: I will be traveling to CHR in Aarhus -- excited to meet folks there (hej!)
- Nov. 2024: I passed my prelim exams, and also turned 25! (old!)
- Nov. 2024: Our paper on [measuring diversity in Hollywood](https://www.pnas.org/doi/10.1073/pnas.2409770121) has been published to PNAS (science!)
- Sep. 2024: My paper [Once More, With Feeling](https://naitian.org/once-more-with-feeling) has been accepted to CHR 2024! (yippee!)
- Apr. 2024: Our paper on linguistic variation in memes has been accepted to NAACL 2024! (whoo!)
- Oct. 2023: I presented at NWAV51 about how zero-shot text-to-speech models erase phonological variation (schwa!)
- Mar. 2023: The NSF awarded me the Graduate Research Fellowship (wild!)
- Aug. 2022: I started my PhD at UC Berkeley (omg!)
- Jun. 2022: I ran my [first marathon](https://naitian.org/blog/banff-marathon/) (oof!)
- Mar. 5, 2022: Ran my first half marathon race (whoa!)
- Sometime between Dec. 2021 and Jan. 2022: Graduated from the University of
  Michigan (wow!)
- Dec. 22, 2021: Received an Honorable Mention for the CRA Outstanding
  Undergraduate Researcher Award (neat!)
- Nov. 26, 2021: Launched the [Spalling Bie](https://naitian.org/spalling-bie/)
  (cool!)

## Publications

{% for pub in publications %}
{% publication pub %}
{% endfor %}

## Code

I am writing or have written code for: [The Michigan
Daily](https://michigandaily.com) as the [managing online
editor](https://github.com/MichiganDaily), NBC News as a [Data
Graphics intern](https://muckrack.com/naitian-zhou), the Michigan Data Science
Team as a project leader, Capital One as a software engineering intern
(x2 summers) and, of course, myself as [`naitian`](https://github.com/naitian).

Here is a sampler of my work.

{% for proj in featured %}
{% project proj %}
{% endfor %}
