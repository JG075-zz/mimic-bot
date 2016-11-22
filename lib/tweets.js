// var Twitter = new exports.TwitterAPI();
// Twitter.getRequest();
var TwitterAPI = require('./twitterAPI').TwitterAPI;

(function(exports) {
  function Tweets(apiCaller) {
    this.tweets = [];
    this.apiCaller = apiCaller;
  }
  Tweets.prototype.getTweets = function () {
    var _this = this;
     this.apiCaller.getRequest(function(response) {
       console.log (response);
       _this.tweets.push(response);
     });
  };

exports.Tweets = Tweets;
})(this);

console.log(exports.Tweets);
var twitterAPI = new TwitterAPI();
var Tweets = new exports.Tweets(twitterAPI);
// Tweets.getTweets();
console.log(Tweets.getTweets());
