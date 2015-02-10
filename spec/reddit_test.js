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

  it('sets up links to subreddits', function(){
    text = '/r/test users like /r/testing and /r/tester';
    expected = '<p><a href="/r/test">/r/test</a> users like <a href="/r/testing">/r/testing</a> and <a href="/r/tester">/r/tester</a></p>\n';

    results = redditText(text);

    expect(results).to.equal(expected);
  });

  it('sets up links to usernames', function(){
    text = '/u/test and /u/tester say hi';
    expected = '<p><a href="/u/test">/u/test</a> and <a href="/u/tester">/u/tester</a> say hi</p>\n';

    results = redditText(text);

    expect(results).to.equal(expected);
  });

  it('converts markdown to html', function() {
    text = '*test*';
    expected = '<p><em>test</em></p>\n';

    results = redditText(text);

    expect(results).to.equal(expected);
  });

  it('sets up autolinks', function(){
    links = [
      'www.reddit.com',
      'https://www.reddit.com',
      'www.reddit.co.uk',
      'Reddit is at [reddit](http://www.reddit.com) dot com',
      '[/r/ICanDrawThat](http://www.reddit.com/r/ICanDrawThat/)'
    ];

    expectedLinks = [
      '<a href="http://www.reddit.com">www.reddit.com</a>',
      '<a href="https://www.reddit.com">https://www.reddit.com</a>',
      '<a href="http://www.reddit.co.uk">www.reddit.co.uk</a>',
      'Reddit is at <a href="http://www.reddit.com">reddit</a> dot com',
      '<a href="http://www.reddit.com/r/ICanDrawThat/">/r/ICanDrawThat</a>',
    ];

    text = links.join('\n')
    expected = '<p>' + expectedLinks.join('\n') + '</p>\n';

    results = redditText(text);

    expect(results.split('\n')).to.eql(expected.split('\n'));
  });

  it('sets up sup tags', function() {
    var text = 'this is ^super duper';
    var expected = '<p>this is <sup>super</sup> duper</p>\n';

    var results = redditText(text);
    expect(results).to.eql(expected);
  });

  it('allows nested sups', function() {
    var text = '^Dun ^^Dun ^^^Duuuun'
    var expected = '<p><sup>Dun</sup> <sup><sup>Dun</sup></sup> <sup><sup><sup>Duuuun</sup></sup></sup></p>\n';

    var results = redditText(text);
    expect(results).to.eql(expected);
  });
});
