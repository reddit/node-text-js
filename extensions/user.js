//
//  user Extension
//  /u/user   ->  <a href="/u/user">/u/user</a>
//

var userRegex = /(\b|\s|^)(\/u\/([\w]+))\b/gi;

module.exports = function user(text) {
  return text.replace(userRegex, '$1[/u/$3](/u/$3)');
}
