const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");
const pluginBlogImages = require("./eleventy.config.blogimages.js");
const embedEverything = require("eleventy-plugin-embed-everything");

// Import fast-glob package
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs');

const galleryImages = fg.sync([
	'**/*.jpg',
	'**/*.jpeg',
	'**/*.png',
	 '**/*.webp',
	 '!**/_site',
	 '!**/node_modules',
	]);

const imageAndIndexFiles = galleryImages.map(imagePath => {
	let dir = path.dirname(imagePath);
	let indexFilePath = null;

	// Traverse up looking for index.md that indicates a blog post
	for (let i = 0; i < 4; i++) {
		const potentialIndexFilePath = path.join(dir, 'index.md');
		if (fs.existsSync(potentialIndexFilePath)) {
			indexFilePath = potentialIndexFilePath;
			break;
		}
		dir = path.dirname(dir); // Go up one level
	}

	return {
		imagePath,
		indexFilePath,
	};
});
module.exports = function(eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});
	eleventyConfig.addPassthroughCopy("content/**/*.mp4");
	eleventyConfig.addPassthroughCopy("content/**/*.jpg");
	eleventyConfig.addPassthroughCopy("content/**/*.jpeg");
	eleventyConfig.addPassthroughCopy("content/**/*.png");
	eleventyConfig.addPassthroughCopy("content/**/*.webp");
	eleventyConfig.addPassthroughCopy("_redirects");
	eleventyConfig.addPassthroughCopy("node_modules/interactjs/dist/interact.min.js")
	eleventyConfig.addPassthroughCopy({
		"node_modules/photoswipe/dist/": "/photoswipe/"
	})
	eleventyConfig.addPassthroughCopy("node_modules/@11ty/is-land/is-land.js")


	//Create collection of gallery images
	eleventyConfig.addCollection('gallery', function(collection) {
		// shuffle the array of images
		imageAndIndexFiles.sort(() => Math.random() - 0.5);
		return imageAndIndexFiles;
	});

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginBlogImages);

	// Third-party plugins
	eleventyConfig.addPlugin(embedEverything);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters
	eleventyConfig.addNunjucksFilter("split", (s, sep) => { return s.split(sep) });

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	eleventyConfig.addShortcode("sidenote", function(num, content) {
		return `<span class="sidenote">
		<label class="sidenote-label" for="side-note-${num}"><sup>[${num}]</sup></label>
		<input class="sidenote-checkbox" type="checkbox" id="side-note-${num}"></input>
		<span class="sidenote-content">${num}. ${content}</span>
	</span>`;
	});
	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "_site"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
