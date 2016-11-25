require('dotenv').config();
var Tweets = require('./lib/tweets').Tweets;
var TwitterAPI = require('./lib/twitterAPI').TwitterAPI;
var StrawPollAPI = require('./lib/strawpollAPI').StrawPollAPI;

// var twitterAPI = new TwitterAPI();
// var tweets = new Tweets(twitterAPI, ["CIA", "Farage"]);


var StrawPollAPI = new StrawPollAPI();

var express = require('express');
var app = express();

//EXPERIMENTAL

var twitterAPI;
var tweets;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function () {});


var Botkit = require('./node_modules/botkit/lib/Botkit.js');

function createAndPostPoll() {
  StrawPollAPI.createPoll();
  StrawPollAPI.postPoll();
}

function retrieveWinnerFromPoll() {
    StrawPollAPI.retrievePoll();
    setTimeout(function(){
      StrawPollAPI.getNamePoll();
      StrawPollAPI.getWinner();
      StrawPollAPI.getWinnerUsername();
      twitterAPI = new TwitterAPI(StrawPollAPI.winnerName);
      tweets = new Tweets(twitterAPI, ["the", "a", "them", "guys"]);
      console.log("ready!");
      // console.log(StrawPollAPI.winnerName);
      tweets.getTweets();

    }, 5000);
}

// For every poll winner=-0§1 ``
// Create a new Tweets object
// Pass in the name
// Call get tweets
// Then do everything else

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

function getResponsePersona(username){
  return {
    name: username,
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
  bot.reply(message, createResponse(getResponseText(), getResponsePersona(StrawPollAPI.winnerName)));
  }
});

createAndPostPoll();
setTimeout(function(){
  retrieveWinnerFromPoll();
}, 20000);
