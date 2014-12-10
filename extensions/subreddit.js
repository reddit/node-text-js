//
//  Subreddit Extension
//  /u/subreddit   ->  <a href="/u/subreddit">/u/subreddit</a>
//

var subredditRegex = /(\b|\s|^)(\/r\/([\w]+))\b/gi;

module.exports = function subreddit(text) {
  return text.replace(subredditRegex, '$1[/r/$3](/r/$3)');
}
