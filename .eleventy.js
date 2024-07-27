const slugify = require("@sindresorhus/slugify");
const markdownIt = require("markdown-it");
const fs = require("fs").promises;
const matter = require("gray-matter");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const tocPlugin = require("eleventy-plugin-nesting-toc");
const { parse } = require("node-html-parser");
const htmlMinifier = require("html-minifier-terser");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const { headerToId, namedHeadingsFilter } = require("./src/helpers/utils");
const {
  userMarkdownSetup,
  userEleventySetup,
} = require("./src/helpers/userSetup");

const Image = require("@11ty/eleventy-img");

async function transformImage(src, cls, alt, sizes, widths = ["500", "700", "auto"]) {
  let options = {
    widths: widths,
    formats: ["webp", "jpeg"],
    outputDir: "./dist/img/optimized",
    urlPath: "/img/optimized",
  };

  // generate images, this is now async
  await Image(src, options);
  let metadata = Image.statsSync(src, options);
  return metadata;
}

async function getAnchorAttributes(filePath, linkTitle) {
  let fileName = filePath.replaceAll("&amp;", "&");
  let header = "";
  let headerLinkPath = "";
  if (filePath.includes("#")) {
    [fileName, header] = filePath.split("#");
    headerLinkPath = `#${headerToId(header)}`;
  }

  let noteIcon = process.env.NOTE_ICON_DEFAULT;
  const title = linkTitle ? linkTitle : fileName;
  let permalink = `/notes/${slugify(filePath)}`;
  let deadLink = false;
  try {
    const startPath = "./src/site/notes/";
    const fullPath = fileName.endsWith(".md")
      ? `${startPath}${fileName}`
      : `${startPath}${fileName}.md`;
    const file = await fs.readFile(fullPath, "utf8");
    const frontMatter = matter(file);
    if (frontMatter.data.permalink) {
      permalink = frontMatter.data.permalink;
    }
    if (
      frontMatter.data.tags &&
      frontMatter.data.tags.indexOf("gardenEntry") != -1
    ) {
      permalink = "/";
    }
    if (frontMatter.data.noteIcon) {
      noteIcon = frontMatter.data.noteIcon;
    }
  } catch {
    deadLink = true;
  }

  if (deadLink) {
    return {
      attributes: {
        "class": "internal-link is-unresolved",
        "href": "/404",
        "target": "",
      },
      innerHTML: title,
    };
  }
  return {
    attributes: {
      "class": "internal-link",
      "target": "",
      "data-note-icon": noteIcon,
      "href": `${permalink}${headerLinkPath}`,
    },
    innerHTML: title,
  };
}

const tagRegex = /(^|\s|\>)(#[^\s!@#$%^&*()=+\.,\[{\]};:'"?><]+)(?!([^<]*>))/g;

module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  let markdownLib = markdownIt({
    breaks: true,
    html: true,
    linkify: true,
  })
    .use(require("markdown-it-anchor"), {
      slugify: headerToId,
    })
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-footnote"))
    .use(function (md) {
      md.renderer.rules.hashtag_open = function (tokens, idx) {
        return '<a class="tag" onclick="toggleTagSearch(this)">';
      };
    })
    .use(require("markdown-it-mathjax3"), {
      tex: {
        inlineMath: [["$", "$"]],
      },
      options: {
        skipHtmlTags: { "[-]": ["pre"] },
      },
    })
    .use(require("markdown-it-attrs"))
    .use(require("markdown-it-task-checkbox"), {
      disabled: true,
      divWrap: false,
      divClass: "checkbox",
      idPrefix: "cbx_",
      ulClass: "task-list",
      liClass: "task-list-item",
    })
    .use(require("markdown-it-plantuml"), {
      openMarker: "```plantuml",
      closeMarker: "```",
    })
    .use(namedHeadingsFilter)
    .use(function (md) {
      //https://github.com/DCsunset/markdown-it-mermaid-plugin
      const origFenceRule =
        md.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info === "mermaid") {
          const code = token.content.trim();
          return `<pre class="mermaid">${code}</pre>`;
        }
        if (token.info === "transclusion") {
          const code = token.content.trim();
          return `<div class="transclusion">${md.render(code)}</div>`;
        }
        if (token.info.startsWith("ad-")) {
          const code = token.content.trim();
          const parts = code.split("\n");
          let titleLine;
          let collapse;
          let collapsible = false;
          let collapsed = true;
          let icon;
          let color;
          let nbLinesToSkip = 0;
          for (let i = 0; i < 4; i++) {
            if (parts[i] && parts[i].trim()) {
              let line = parts[i] && parts[i].trim().toLowerCase();
              if (line.startsWith("title:")) {
                titleLine = line.substring(6);
                nbLinesToSkip++;
              } else if (line.startsWith("icon:")) {
                icon = line.substring(5);
                nbLinesToSkip++;
              } else if (line.startsWith("collapse:")) {
                collapsible = true;
                collapse = line.substring(9);
                if (collapse && collapse.trim().toLowerCase() == "open") {
                  collapsed = false;
                }
                nbLinesToSkip++;
              } else if (line.startsWith("color:")) {
                color = line.substring(6);
                nbLinesToSkip++;
              }
            }
          }
          const foldDiv = collapsible
            ? `<div class="callout-fold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-chevron-down">
              <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          </div>`
            : "";
          const titleDiv = titleLine
            ? `<div class="callout-title"><div class="callout-title-inner">${titleLine}</div>${foldDiv}</div>`
            : "";
          let collapseClasses = titleLine && collapsible ? "is-collapsible" : "";
          if (collapsible && collapsed) {
            collapseClasses += " is-collapsed";
          }

          let res = `<div data-callout-metadata class="callout ${collapseClasses}" data-callout="${token.info.substring(
            3
          )}">${titleDiv}\n<div class="callout-content">${md.render(
            parts.slice(nbLinesToSkip).join("\n")
          )}</div></div>`;
          return res;
        }

        // Other languages
        return origFenceRule(tokens, idx, options, env, slf);
      };

      const defaultImageRule =
        md.renderer.rules.image ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const imageName = tokens[idx].content;
        //"image.png|metadata?|width"
        const [fileName, ...widthAndMetaData] = imageName.split("|");
        const lastValue = widthAndMetaData[widthAndMetaData.length - 1];
        const lastValueIsNumber = !isNaN(lastValue);
        const width = lastValueIsNumber ? lastValue : null;

        let metaData = "";
        if (widthAndMetaData.length > 1) {
          metaData = widthAndMetaData
            .slice(0, widthAndMetaData.length - 1)
            .join(" ");
        }

        if (!lastValueIsNumber) {
          metaData += ` ${lastValue}`;
        }

        if (width) {
          const widthIndex = tokens[idx].attrIndex("width");
          const widthAttr = `${width}px`;
          if (widthIndex < 0) {
            tokens[idx].attrPush(["width", widthAttr]);
          } else {
            tokens[idx].attrs[widthIndex][1] = widthAttr;
          }
        }

        if (metaData) {
          const metaDataIndex = tokens[idx].attrIndex("data-metadata");
          if (metaDataIndex < 0) {
            tokens[idx].attrPush(["data-metadata", metaData]);
          } else {
            tokens[idx].attrs[metaDataIndex][1] = metaData;
          }
        }
        return defaultImageRule(tokens, idx, options, env, self);
      };
    })
    .use(function (md) {
      md.core.ruler.push("preprocess", function (state) {
        const tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (token.type === "fence" && token.info === "transclusion") {
            const content = token.content;
            const lines = content.split("\n");
            for (let line of lines) {
              if (line.startsWith("![[") && line.endsWith("]]")) {
                const link = line.substring(3, line.length - 2);
                token.content = token.content.replace(
                  line,
                  `{% noteLink "${link}" %}`
                );
              }
            }
          }
        }
      });
    })
    .use(function (md) {
      const defaultRender =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const hrefIndex = tokens[idx].attrIndex("href");
        if (hrefIndex >= 0) {
          const href = tokens[idx].attrs[hrefIndex][1];
          if (href.startsWith("http") || href.startsWith("/")) {
            tokens[idx].attrPush(["target", "_blank"]);
          }
        }
        return defaultRender(tokens, idx, options, env, self);
      };
    });

  userMarkdownSetup(markdownLib);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addTransform("htmlmin", async function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = await htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addPlugin(faviconsPlugin, {
    manifestData: {
      appName: "My Eleventy Site",
      appShortName: "Eleventy",
      appDescription: "An Eleventy site with plugins.",
    },
    cacheBusting: true,
    version: "v1.0.0",
    scope: "/",
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: true,
      favicons: true,
      firefox: true,
      windows: true,
      yandex: true,
    },
  });

  eleventyConfig.addPlugin(tocPlugin, {
    ul: true,
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("log", (value) => {
    console.log(value);
    return value;
  });

  eleventyConfig.addFilter("inlineAllSVG", (content) => {
    const root = parse(content);
    const svgs = root.querySelectorAll("svg");

    for (let svg of svgs) {
      const src = svg.getAttribute("src");
      if (src) {
        const fullPath = `./src/assets/${src}`;
        const svgContent = fs.readFileSync(fullPath, "utf8");
        svg.set_content(svgContent);
        svg.removeAttribute("src");
      }
    }

    return root.toString();
  });

  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return dateObj.toLocaleDateString("en-US", options);
  });

  eleventyConfig.addFilter("getSlug", (string) => slugify(string));

  eleventyConfig.addFilter("getNoteLink", async (filePath, linkTitle) => {
    const attributes = await getAnchorAttributes(filePath, linkTitle);
    return `<a ${Object.entries(attributes.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ")}>${attributes.innerHTML}</a>`;
  });

  eleventyConfig.addShortcode("noteLink", async (filePath, linkTitle) => {
    const attributes = await getAnchorAttributes(filePath, linkTitle);
    return `<a ${Object.entries(attributes.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ")}>${attributes.innerHTML}</a>`;
  });

  userEleventySetup(eleventyConfig);
};
