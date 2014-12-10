//
//  user Extension
//  /u/user   ->  <a href="/u/user">/u/user</a>
//
var userRegex = /(^|\s|[.,-;,])(\/u\/([\w]+))($|\s|[.,-;,])/gi;

module.exports = function user(text) {
  return text.replace(userRegex, '$1[/u/$3](/u/$3)$4');
}

