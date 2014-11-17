var Remarkable = require('remarkable');

var converter = new Remarkable('commonmark', {
  linkify: true,
  typographer: true,
});

converter.inline.ruler.enable([ 'sup' ]);

function process(text) {
  return converter.render(text);
}

module.exports = process;
