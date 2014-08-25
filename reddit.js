var Showdown = require('showdown');
var converter = new Showdown.converter();
var tlds = require('./tlds');

var tldRegexString = tlds.join('|').replace(/\./, '\\.');
var linkRegex = new RegExp('\\b(https?://)?([0-9A-Za-z.]+\\.(?:' + tldRegexString + ')[0-9A-Za-z./]*)', 'gi');

var subredditRegex = new RegExp('/?r/(\\w+)', 'gi');
var usernameRegex = new RegExp('/?(?:u|user)/(\\w+)', 'gi');

function processMarkdown(text) {
  return {
    html: converter.makeHtml(text),
  };
}

function processLinks(text) {
  text = text.replace(linkRegex, function(match, protocol, url) {
    protocol = protocol || 'http://';
    var fullUrl = protocol + url;

    var link = '<a href="' + fullUrl + '" target="_blank" rel="nofollow">' + url + '</a>';
    return link;
  });

  return {
    html: text,
  };
}

function processSubreddits(text) {
  var subreddits = [];
  text = text.replace(subredditRegex, function(match, subredditname) {
    subreddits.push(subredditname);
    return '<a href="/r/' + subredditname + '">/r/' + subredditname + '</a>';
  });

  return {
    subreddits: subreddits,
    html: text,
  };
}

function processUsernames(text) {
  var usernames = [];

  text = text.replace(usernameRegex, function(match, username) {
    usernames.push(username);
    return '<a href="/u/' + username + '">/u/' + username + '</a>';
  });

  return {
    usernames: usernames,
    html: text,
  };
}

function process(text) {
  var processedMarkdown = processMarkdown(text);
  var processedLinks = processLinks(processedMarkdown.html);
  var processedSubreddits = processSubreddits(processedLinks.html);
  var processedUsernames = processUsernames(processedSubreddits.html);

  return {
    html: processedUsernames.html,
    subreddits: processedSubreddits.subreddits,
    usernames: processedUsernames.usernames,
  }
}

module.exports = process;
