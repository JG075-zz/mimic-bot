require('dotenv').config();
var Tweets = require('./lib/tweets').Tweets;
var TwitterAPI = require('./lib/twitterAPI').TwitterAPI;

var twitterAPI = new TwitterAPI();
var tweets = new Tweets(twitterAPI, ["CIA", "Farage"]);

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// })

var Botkit = require('./node_modules/botkit/lib/Botkit.js');

tweets.getTweets();

function get_response(){
  console.log(3);
  return tweets.tweets[Math.floor(Math.random() * tweets.tweets.length)];
}

var controller = Botkit.slackbot({
  debug: false
});


var bot = controller.spawn({
  token: process.env.SLACK_KEY
}).startRTM();

controller.hears(['wall'], 'ambient', function(bot, message) {
  console.log(4);
  bot.api.users.profile.set({name: "name", value: "Tom"},
    function(err, res) {
      if (err) {
          bot.botkit.log("Failed to add emoji reaction :(", err);
      }
      console.log(res);
  });
  if (tweets.tweets.length > 0) {
  bot.reply(message, get_response());
  console.log(bot.identity.name)

  }
});
