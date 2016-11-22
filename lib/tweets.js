var TwitterAPI = require('./twitterAPI').TwitterAPI;

(function(exports) {
  function Tweets(apiCaller) {
    this.tweets = [];
    this.apiCaller = apiCaller;
  }
  Tweets.prototype.getTweets = function () {
    var _this = this;
     this.apiCaller.getRequest(function(response) {
       response.forEach(function(element) {
         _this.tweets.push(element.text);
        });
     });
  };

exports.Tweets = Tweets;
})(this);

var twitterAPI = new TwitterAPI();
var Tweets = new exports.Tweets(twitterAPI);
// Tweets.getTweets();
