//
//  User Extension
//  /u/username   ->  <a href="/u/username">/u/username</a>
//

module.exports = function(converter) {
  return [{
    type: 'lang',
    regex: '\\B(\\\\)?/u/([\\S]+)\\b',
    replace: function(match, leadingSlash, username) {
      // Check if we matched the leading \ and return nothing changed if so
      if (leadingSlash === '\\' || username.indexOf('](') > -1) {
        return match;
      } else {
        return '<a href="/u/' + username + '">/u/' + username + '</a>';
      }
    }
  }];
};
