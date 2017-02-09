'user strict';

require('dotenv').config();

var Botkit = require('botkit');
var Tweets = require('./lib/tweets').Tweets;
var TwitterAPI = require('./lib/twitterAPI').TwitterAPI;
var StrawPollAPI = require('./lib/strawpollAPI').StrawPollAPI;

var twitterAPI = new TwitterAPI('realDonaldTrump');
var tweets = new Tweets(twitterAPI, ["the", "a", "them", "guys"]);
var useStrawPoll = true;
var image;

if (useStrawPoll) {
  StrawPollAPI.startPoll();
  setTimeout(function(){
    StrawPollAPI.retrievePoll(function(){
      twitterAPI = new TwitterAPI(StrawPollAPI.winnerName);
      tweets = new Tweets(twitterAPI, ["the", "a", "them", "guys"]);
      createBot();
    });
  }, 20000);
} else {
  createBot();
}

function createBot() {

  console.log('Creating the bot!');

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
      icon: image || "http://images2.fanpop.com/images/photos/7000000/Spongebob-Icon-spongebob-squarepants-7039737-100-100.jpg"
    };
  }

  var controller = Botkit.slackbot({ debug: false });
  var bot = controller.spawn({ token: process.env.SLACK_KEY }).startRTM();

  controller.hears(['mimic'], 'ambient', function(bot, message) {
    if (tweets.tweets.length > 0) {
      bot.reply(message, createResponse(getResponseText(), getResponsePersona(StrawPollAPI.winnerName, image)));
    }
  });

  exports.getResponsePersona = getResponsePersona;

}
