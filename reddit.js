var Remarkable = require('remarkable');

var subreddit = require('./extensions/subreddit');
var user = require('./extensions/user');

var converter = new Remarkable('full', {
  linkify: true,
  typographer: true,
});

converter.inline.ruler.enable([
  'sup'
]);

function process(text) {
  text = subreddit(text);
  text = user(text);

  text = converter.render(text);

  return text;
}

module.exports = process;
