// import wikiLinkPlugin from 'remark-wiki-link'
const wikiLinkPlugin = require('remark-wiki-link');

module.exports = ({ markdownAST }, options) => {
  // let processor = unified()
  // .use(markdown)
  // .use(wikiLinkPlugin, {});

  // markdownAST = processor.runSync(markdownAST);

  return markdownAST
}
// module.exports = ({ markdownAST }) => markdownAST;

module.exports.setParserPlugins = options => [[wikiLinkPlugin, options]]
