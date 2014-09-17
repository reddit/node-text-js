//
//  Subreddit Extension
//  /r/subreddit   ->  <a href="/r/subreddit">/r/subreddit</a>
//

module.exports = function(converter) {
  return [{
    type: 'lang',
    regex: '\\B(\\\\)?/r/([\\S]+)\\b',
    replace: function(match, leadingSlash, subreddit) {
      // Check if we matched the leading \ and return nothing changed if so
      if (leadingSlash === '\\' || subreddit.indexOf('](') > -1) {
        return match;
      } else {
        return '<a href="/r/' + subreddit + '">/r/' + subreddit + '</a>';
      }
    }
  }];
};

