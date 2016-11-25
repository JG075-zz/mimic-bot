require('dotenv').config();

(function(exports) {
  var Twitter = require('twitter');

    function TwitterAPI(name) {
        this.params = {
            screen_name: name,
            count: 200
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
                fn(tweets);
            }
        });

    };

    TwitterAPI.prototype.getImage = function(fn) {
        this.client.get('users/show', {screen_name: this.params.screen_name}, function(error, profile, response) {
            if (!error) {
              console.log(profile.profile_image_url);
                fn(profile.profile_image_url);
            }
        });

    };

    exports.TwitterAPI = TwitterAPI;
})(this);
