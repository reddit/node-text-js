//
//  Autolink Extension
//  http://www.reddit.com   ->  <a href="http://www.reddit.com">http://www.reddit.com</a>
//

var tlds = require('../tlds.js').join('|');
var regex = new RegExp('\\b(\\S+://)?(\\S+\\.(' + tlds + ')\\S*)\\b', 'gi');

module.exports = function(converter) {
  return [{
    type: 'lang',
    filter: function(text) {
      return text.replace(regex, function(match, protocol, link) {

        // Ignore <a> tags and markdown links
        if (match.indexOf('href') === 0 || match.indexOf('](') > -1) {
          return match;
        }

        if (!protocol) {
          protocol = 'http://';
        }

        return '[' + link + '](' + protocol + link + ')';
      });
    }
  }];
};
