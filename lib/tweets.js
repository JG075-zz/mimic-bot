// var Twitter = new exports.TwitterAPI();
// Twitter.getRequest();
(function(exports) {
  function Tweets(apiCaller) {
    this.tweets = [];
    this.apiCaller = apiCaller;
  }
  Tweets.prototype.getTweets = function () {
     this.apiCaller.getRequest();
  };

exports.Tweets = Tweets;
})(this);
