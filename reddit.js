var snuownd = require('snuownd');
var sanitize = require('sanitize-html');

var processor = snuownd.getParser();

var allowedTags = sanitize.defaults.allowedTags.concat(
  [
    'h1',
    'h2',
    'sup',
  ]
);

var sanitizeOptions = {
  allowedTags: allowedTags
};

function process(text) {
  if (!text) return text;

  text = processor.render(text);
  text = text.replace(/<a/g, '<a target="_blank"');

  text = sanitize(text, sanitizeOptions);

  return text;
}

module.exports = process;
