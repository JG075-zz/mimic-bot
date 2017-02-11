var assert = require('assert');
var sinon = require('sinon');
var Tweets = require('../lib/tweets').Tweets;
var TwitterAPI = require('../lib/twitterAPI').TwitterAPI;
var app = require('../app.js');

describe('Tweets', function() {
  beforeEach(function(){
    Twitter = new TwitterAPI();
  });
    it('should call our TweetAPI object', function() {
      sinon.spy(Twitter, "getRequest");
      var tweets = new Tweets(Twitter, ["test"]);
      tweets.getTweets();
      sinon.assert.calledOnce(Twitter.getRequest);
    });

    it('should add tweets to tweets array', function(){
      var twitterAPISample = [{ "text": "Aggressive Ponytail #freebandnames"}, { "text": "To be or not to be...#thatisthequestions"}];
      sinon.stub(Twitter, "getRequest", function(fn){
        fn(twitterAPISample);
      });
      var tweets = new Tweets(Twitter, ["Ponytail", "be"]);
      tweets.getTweets();
      assert.equal(tweets.tweets.length, 2);
    });

    it('should only add tweets containing certain words', function(){
      var twitterAPISample = [{ "text": "Aggressive Ponytail #freebandnames"}, { "text": "To be a panda or not to be...#thatisthequestions"}, { "text": "I am the sugar daddy"}];
      sinon.stub(Twitter, "getRequest", function(fn){
        fn(twitterAPISample);
      });
      var tweets = new Tweets(Twitter, ["panda"]);
      tweets.getTweets();
      assert.equal(tweets.tweets.includes("Aggressive Ponytail #freebandnames"), false);
    });
});

  describe('get persona', function() {
    it('should return a person\'s name and picture', function() {
      var person = app.getResponsePersona();
      assert.ok(person.name);
      assert.ok(person.icon);
    });

  });
