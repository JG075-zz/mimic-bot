require('dotenv').config();
var Tweets = require('./lib/tweets').Tweets;
var TwitterAPI = require('./lib/twitterAPI').TwitterAPI;

var twitterAPI = new TwitterAPI();
var tweets = new Tweets(twitterAPI, ["CIA", "Farage"]);

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function () {});

var Botkit = require('./node_modules/botkit/lib/Botkit.js');

tweets.getTweets();

function getResponseText(){
  return tweets.tweets[Math.floor(Math.random() * tweets.tweets.length)];
}

function createResponse(responseText, persona){
  return {
    text: responseText,
    username: persona.name,
    icon_url: persona.icon
  };
}

function getResponsePersona(){
  return {
    name: 'realDonaldTrump',
    icon: "https://assets.rbl.ms/6609271/980x.jpg"
  };
}
exports.getResponsePersona = getResponsePersona;

var controller = Botkit.slackbot({
  debug: false
});


var bot = controller.spawn({
  token: process.env.SLACK_KEY
}).startRTM();

controller.hears(['wall'], 'ambient', function(bot, message) {
  if (tweets.tweets.length > 0) {
  bot.reply(message, createResponse(getResponseText(), getResponsePersona()));
  }
});
