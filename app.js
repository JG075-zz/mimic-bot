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

function getResponse(){
  console.log(3);
  return tweets.tweets[Math.floor(Math.random() * tweets.tweets.length)];
}

function createMessage(response, persona){
  return {
    text: response,
    username: persona.name,
    icon_url: persona.icon
  };
}

function getPersona(){
  return {
    name: 'realDonaldTrump',
    icon: "https://assets.rbl.ms/6609271/980x.jpg"
  };
}
exports.getPersona = getPersona;
// "http://iconfever.com/images/portfolio/spongebob.jpg"
var controller = Botkit.slackbot({
  debug: false
});


var bot = controller.spawn({
  token: process.env.SLACK_KEY
}).startRTM();

controller.hears(['wall'], 'ambient', function(bot, message) {
  if (tweets.tweets.length > 0) {
  bot.reply(message, createMessage(getResponse(), getPersona()));
  }
});
