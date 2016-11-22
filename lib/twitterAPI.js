require('dotenv').config();

(function(exports) {
  var Twitter = require('twitter');

    function TwitterAPI() {
        this.params = {
            screen_name: 'nodejs'
        };
        this.client = new Twitter({
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: process.env.TWITTER_ACCESS_TOKEN,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
    }

    TwitterAPI.prototype.getRequest = function(fn) {
        this.client.get('statuses/user_timeline', this.params, function(error, tweets, response) {
            if (!error) {
              console.log('hello, is it me you\'re looking for?');
                fn(tweets);
            }
        });

    };

    exports.TwitterAPI = TwitterAPI;
})(this);
