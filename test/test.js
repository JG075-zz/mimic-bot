var assert = require('assert');
var sinon = require('sinon');
var Tweets = require('../lib/tweets').Tweets;
var TwitterAPI = require('../lib/twitterAPI').TwitterAPI;

describe('Tweets', function() {
  beforeEach(function(){
    Twitter = new TwitterAPI();
  });
    it('should call our TweetAPI object', function() {
      sinon.spy(Twitter, "getRequest");
      var tweets = new Tweets(Twitter);
      tweets.getTweets();
      sinon.assert.calledOnce(Twitter.getRequest);
    });

    it('should add tweets to tweets array', function(){
      var twitterAPISample = [{ "text": "Aggressive Ponytail #freebandnames"}, { "text": "To be or not to be...#thatisthequestions"}];
      sinon.stub(Twitter, "getRequest", function(fn){
        fn(twitterAPISample);
      });
      var tweets = new Tweets(Twitter);
      tweets.getTweets();
      console.log(tweets.tweets);
      assert.equal(tweets.tweets.length, 2);
    });
});
