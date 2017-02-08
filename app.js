'user strict';

require('dotenv').config();

var Botkit = require('botkit');
var Tweets = require('./lib/tweets').Tweets;
var TwitterAPI = require('./lib/twitterAPI').TwitterAPI;
var StrawPollAPI = require('./lib/strawpollAPI').StrawPollAPI;

var twitterAPI;
var tweets;
var image;

function createAndPostPoll() {
  StrawPollAPI.createPoll();
  StrawPollAPI.postPoll();
}

function retrieveWinnerFromPoll() {
    //StrawPollAPI.retrievePoll();
    setTimeout(function(){
      // StrawPollAPI.getNamePoll();
      // StrawPollAPI.getWinner();
      // StrawPollAPI.getWinnerUsername();
      // twitterAPI = new TwitterAPI(StrawPollAPI.winnerName);
      twitterAPI = new TwitterAPI('realDonaldTrump');
      twitterAPI.getImage(function(response){
        image = response;
      });
      tweets = new Tweets(twitterAPI, ["the", "a", "them", "guys"]);
      console.log("ready!");
      // console.log(StrawPollAPI.winnerName);
      tweets.getTweets();
    }, 6000);
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

function getResponsePersona(username, image){
  return {
    name: username || 'bob',
    icon: image || "http://images2.fanpop.com/images/photos/7000000/Spongebob-Icon-spongebob-squarepants-7039737-100-100.jpg"
  };
}
exports.getResponsePersona = getResponsePersona;

var controller = Botkit.slackbot({
  debug: false
});


var bot = controller.spawn({
  token: process.env.SLACK_KEY
}).startRTM();

controller.hears(['mimic'], 'ambient', function(bot, message) {
  if (tweets.tweets.length > 0) {
  bot.reply(message, createResponse(getResponseText(), getResponsePersona(StrawPollAPI.winnerName, image)));
  }
});

//createAndPostPoll();
setTimeout(function(){
  retrieveWinnerFromPoll();
}, 10);
