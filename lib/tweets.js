var TwitterAPI = require('./twitterAPI').TwitterAPI;

(function(exports) {
  function Tweets(apiCaller, words) {
    this.tweets = [];
    this.apiCaller = apiCaller;
    this.words = words;
  }

  Tweets.prototype.getTweets = function () {
    var _this = this;
     this.apiCaller.getRequest(function(response) {
       var filtered = _this._filterTweets(response);
       filtered.forEach(function(element) {
         _this.tweets.push(element.text);
        });
     });
  };

  Tweets.prototype._filterTweets = function (response) {
    var _this = this;
    function doesContainWord(item) {
      for(var i=0;i < _this.words.length; i++) {
        if(item.text.includes(_this.words[i])) {
          console.log(item.text);
          return true;
        }
      }
    }
    var filtered = response.filter(doesContainWord);
    return filtered;
  };

  exports.Tweets = Tweets;
})(this);

var twitterAPI = new TwitterAPI();
var Tweets = new exports.Tweets(twitterAPI);
// Tweets.getTweets();
