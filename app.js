'user strict';

require('dotenv').config();

var Botkit = require('botkit');
var Tweets = require('./lib/tweets').Tweets;
var TwitterAPI = require('./lib/twitterAPI').TwitterAPI;
var StrawPollAPI = require('./lib/strawpollAPI').StrawPollAPI;

var matchingWords = ["the", "a", "them", "guys"];
var twitterUser = 'realDonaldTrump';
var useStrawPoll = false;
var image;

if (useStrawPoll) {
  StrawPollAPI.startPoll();
  setTimeout(function(){
    StrawPollAPI.retrievePoll(function(){
      twitterUser = StrawPollAPI.winnerName;
      createBot();
    });
  }, 20000);
} else {
  createBot();
}

function createBot() {
  var twitterAPI = new TwitterAPI(twitterUser);
  var tweets = new Tweets(twitterAPI, matchingWords);

  twitterAPI.getImage(function(response){image = response;});
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

  function getResponsePersona(username, image){
    return {
      name: username || 'bob',
      icon: image || "https://s3-eu-west-1.amazonaws.com/mimic-bot/default.jpg"
    };
  }

  var controller = Botkit.slackbot({ debug: false });
  var bot = controller.spawn({ token: process.env.SLACK_KEY }).startRTM();

  controller.hears(['mimic'], 'ambient', function(bot, message) {
    if (tweets.tweets.length > 0) {
      bot.reply(message, createResponse(getResponseText(), getResponsePersona(twitterUser, image)));
    }
  });

  exports.getResponsePersona = getResponsePersona;

}
