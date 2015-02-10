var snuownd = require('snuownd');
var processor = snuownd.getParser();

function process(text) {
  if (!text) return text;

  text = processor.render(text);

  return text;
}

module.exports = process;
