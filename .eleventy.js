const pluginSass = require("eleventy-plugin-sass");
const eleventyRemark = require("@fec/eleventy-plugin-remark");
const eleventyHelmetPlugin = require("eleventy-plugin-helmet");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const outdent = require("outdent");

const remark = require("remark");
const remarkRehype = require("remark-rehype");
const raw = require("rehype-raw");
const stringify = require("rehype-stringify");
const math = require("remark-math");
const toc = require("remark-toc");
const gfm = require("remark-gfm");
const footnotes = require("remark-footnotes");
const highlight = require("rehype-highlight");
const mathjax = require("rehype-mathjax");
const directive = require("remark-directive");
const tufte = require("remark-tufte");


const listify = function (arr) {
  // ['a'] => 'a'
  // ['a', 'b'] => 'a and b'
  // ['a', 'b', 'c'] => 'a, b and c'
  if (arr.length == 1) return arr[0];
  if (arr.length == 2) return arr.join(" and ");
  return `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`;
};

const date = function (d) {
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

module.exports = function (eleventyConfig) {
  // use remark to process markdown
  //
  // this allows use to use all of the remark plugins, including tufte-css
  // specific ones, which is nice.
  //
  // unfortunately, this means we can't use eleventy-plugin-syntaxhighlight
  // with code fences because remark processes the code fences first (usually
  // -- plugin application order is apparently not deterministic).
  // tracking: https://github.com/11ty/eleventy/issues/1777
  //
  // using prism through remark-prism is prohibitively slow (~10x slowdown),
  // but I would prefer prism because 1) no client side js, 2) more features
  // and 3) more languages supported.

  const processor = remark({
    commonmark: true,
    footnotes: true,
  })
    .use(gfm)
    .use(directive)
    .use(footnotes, { inlineNotes: true })
    .use(toc, { tight: true })
    .use(math)
    .use(tufte.wrapSections)
    .use(tufte.newThought)
    .use(tufte.blockquoteAttribution)
    .use(tufte.imageToFigure)
    .use(tufte.figure)
    .use(tufte.cite)
    .use(tufte.sans)
    .use(tufte.sidenote)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(highlight)
    .use(mathjax)
    .use(raw)
    .use(stringify);
  function markdown() {
    return {
      set: () => { },
      render: async (str) => {
        const { contents } = await processor.process(str);
        return contents;
      },
    };
  }
  eleventyConfig.setLibrary("md", markdown());

  // helmet
  eleventyConfig.addPlugin(eleventyHelmetPlugin);

  // RSS
  eleventyConfig.addPlugin(pluginRss)

  // scss preprocessing
  eleventyConfig.addWatchTarget("src/css/*");
  eleventyConfig.addPlugin(pluginSass, {
    watch: ["src/**/*.{scss,sass}", "!node_modules/**"],
  });

  // publication shortcode
  eleventyConfig.addShortcode("publication", function (ref) {
    return outdent`
    <div class="publication entry">
    <span class="entry__title">${ref.parsed.title}</span> <br>
    <span class="entry__authors">${listify(
      ref.parsed.author.map(
        (d) => `<span class="entry__author">${d.given} ${d.family}</span>`
      )
    )}</span> <br>
    ${ref.parsed["container-title"] ? `<span class="entry__venue">${ref.parsed["container-title"]}</span><br>` : ""}
    <span class="entry__description">${ref.description}</span><br>
    <a href="${ref.website}">[Website]</a> <a href="${ref.pdf}">[PDF]</a>
    </div>
    `;
  });

  // project shortcode
  eleventyConfig.addShortcode("project", function (project) {
    return outdent`
    <div class="entry">
    <span class="entry__title">${project.title}</span> <br>
    <span class="entry__description">${project.description}</span>
    <a href="${project.link}">[Link]</a><br>
    </div>
    `;
  });

  // blog shortcode
  eleventyConfig.addShortcode("blog", function (blog) {
    return outdent`
    <a href="${blog.url}" class="entry"><div>
    <span class="entry__title">${blog.data.title}</span> <br>
    <span class="entry__venue">${blog.data.description}</span> <br>
    <span class="entry__description">Published ${date(blog.date)}</span>
    </div></a>
    `;
  });


  // pretty list
  eleventyConfig.addFilter("listify", listify);
  eleventyConfig.addFilter("datefmt", date);

  // copy assets folder
  eleventyConfig.addPassthroughCopy("src/assets");

  // other settings
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
