var assert = require('assert');
var sinon = require('sinon');
var Tweets = require('../lib/tweets').Tweets;
var TwitterAPI = require('../lib/twitterAPI').TwitterAPI;

describe('Tweets', function() {
    it('should call our TweetAPI object', function() {
      var Twitter = new TwitterAPI();

      sinon.spy(Twitter, "getRequest");
      var tweets = new Tweets(Twitter);
      tweets.getTweets();
      sinon.assert.calledOnce(Twitter.getRequest);
    });

});
