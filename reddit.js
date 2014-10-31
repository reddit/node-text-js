var Remarkable = require('remarkable');
var converter = new Remarkable('commonmark', {
  linkify: true,
  typographer: true,
});

function process(text) {
  return converter.render(text);
}

module.exports = process;
