var redditText = require('../reddit');

var sinon = require('sinon');
var chai = require('chai');
var expect = require('chai').expect;

describe('text processor', function() {
  var text, expected, results;

  beforeEach(function(){
    text = '';
    expected = '';
    results = undefined;
  });

  it('sets up links to usernames', function(){
    text = '/u/test and /u/tester say hi';
    expected = {
      html: '<p><a href="/u/test">/u/test</a> and <a href="/u/tester">/u/tester</a> say hi</p>',
      usernames: ['test', 'tester']
    };

    results = redditText(text);

    expect(results.html).to.equal(expected.html);
    expect(results.usernames).to.eql(expected.usernames);
  });

  it('sets up links to subreddits', function(){
    text = 'check out /r/test and /r/tester';
    expected = {
      html: '<p>check out <a href="/r/test">/r/test</a> and <a href="/r/tester">/r/tester</a></p>',
      subreddits: ['test', 'tester']
    };

    results = redditText(text);

    expect(results.html).to.equal(expected.html);
    expect(results.subreddits).to.eql(expected.subreddits);
  });

  it('converts markdown to html', function() {
    text = '*test*';
    expected = {
      html: '<p><em>test</em></p>'
    };

    results = redditText(text);

    expect(results.html).to.equal(expected.html);
  });

  it('sets up autolinks', function(){
    links = [
      'reddit.com',
      'reddit.com/a-thing',
      'www.reddit.com',
      'https://www.reddit.com',
      'www.reddit.co.uk',
      '<a href="http://reddit.com">reddit.com</a>'
    ];

    expectedLinks = [
      '<a href="http://reddit.com" target="_blank" rel="nofollow">reddit.com</a>',
      '<a href="http://reddit.com/a-thing" target="_blank" rel="nofollow">reddit.com/a-thing</a>',
      '<a href="http://www.reddit.com" target="_blank" rel="nofollow">www.reddit.com</a>',
      '<a href="https://www.reddit.com" target="_blank" rel="nofollow">www.reddit.com</a>',
      '<a href="http://www.reddit.co.uk" target="_blank" rel="nofollow">www.reddit.co.uk</a>',
      '<a href="http://reddit.com">reddit.com</a>',
    ];

    text = links.join(',')
    expected = {
      html: '<p>' + expectedLinks.join(',') + '</p>'
    }

    results = redditText(text);

    expect(results.html.split(',')).to.eql(expected.html.split(','));
  });
});
