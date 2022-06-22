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

<span class="l1">I'm a recent alum of the University of Michigan (<span
style="color: #00274C">go blue!</span>)</span><span class="l2">, where I
studied computer science, data science and linguistics.</span> Right now, I'm
doing research with [David Jurgens](https://blablablab.si.umich.edu) in the UM
School of Information. In the past, I've also worked on social computing with
[Tanu Mitra](https://faculty.washington.edu/tmitra/) in the UW Information
School and on social dialogue agents with [Jon
May](https://www.isi.edu/~jonmay/) at USC ISI.

I'm interested in some mixture of computational social science, natural language
processing and digital humanities. I also care a lot about the news, data
journalism, data visualization and crossword puzzles.

<figure class="profilepic">
<img src="assets/selfie.png" alt="A collection of photos of my face."/>
<figcaption>
<p>
<a href="https://web.eecs.umich.edu/~fouhey/#:~:text=One%20picture%20is%20hard%20to%20identify%20a%20person%20with.">"One picture is hard to identify a person with" ~ David Fouhey</a>
</p>
</figcaption>
</figure>


## Updates

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
