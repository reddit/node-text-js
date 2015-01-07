//
//  Subreddit Extension
//  /u/subreddit   ->  <a href="/u/subreddit">/u/subreddit</a>
//

var subredditRegex = /(^|\s|[.,-;,])(\/r\/([\w]+))($|\s|[.,-;,])/gi;

module.exports = function subreddit(text) {
  if (text) {
    return text.replace(subredditRegex, '$1[/r/$3](/r/$3)$4');
  }
}
