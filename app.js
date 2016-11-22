require('dotenv').config();

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

function get_response(){
  var responses = [
    'There was a car coming.',
    'To get to the other side.',
    'To get the newspaper.',
    'Because it wanted to find out what those jokes were about.',
    'To boldly go where no chicken has gone before!',
    'Because the light was green.',
    'I could tell you, but then the Chicken Mafia would kill me.'
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.SLACK_KEY
}).startRTM();

controller.hears(['why did the chicken cross the road'], 'ambient', function(bot, message) {
  bot.reply(message, get_response());
});
