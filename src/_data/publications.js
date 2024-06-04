const Cite = require("citation-js");
const pubs = [
  {
    bibtex: `@misc{zhou2023social,
      title={Social Meme-ing: Measuring Linguistic Variation in Memes}, 
      author={Naitian Zhou and David Jurgens and David Bamman},
      year={2023},
      eprint={2311.09130},
      archivePrefix={arXiv},
      primaryClass={cs.CL}
}`,
    description: "Much work in the space of NLP has used computational methods to explore sociolinguistic variation in text. In this paper, we argue that memes, as multimodal forms of language comprised of visual templates and text, also exhibit meaningful social variation.",
    website: "https://naitian.org/social-memeing",
    pdf: "https://arxiv.org/abs/2311.09130"
  },
  {
    bibtex: `@inproceedings{zhou2020condolences,
      title={Condolences and empathy in online communities},
      author={Zhou, Naitian and Jurgens, David},
      booktitle={Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP)},
      pages={609--626},
      year={2020}}`,
    description:
      "In times of distress, we frequently go online to seek social support and condolence. But effectively providing that support to others is easier said than done. This study aims to computationally identify mechanisms and strategies for delivering effective and impactful condolence on social media.",
    website: "https://blablablab.si.umich.edu/projects/condolence/",
    pdf: "https://aclanthology.org/2020.emnlp-main.45.pdf",
  },
];
module.exports = function () {
  return pubs.map(d => ({
    parsed: Cite.input(d.bibtex)[0],
    ...d
  }));
};
