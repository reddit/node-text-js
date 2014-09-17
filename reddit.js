var Showdown = require('showdown');
var converter = new Showdown.converter({
  extensions: [
    require('./extensions/strikethrough.js'),
    require('./extensions/subreddit.js'),
    require('./extensions/user.js'),
    require('./extensions/autolink.js'),
  ]
});

function process(text) {
  return converter.makeHtml(text);
}

module.exports = process;
