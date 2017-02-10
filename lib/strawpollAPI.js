(function () {
   'use strict';
}());

var request = require('request');

(function(exports) {

  function StrawPollAPI() {
    this.URL = 'http://strawpoll.me/api/v2/polls';
    this.body = null;
    this.pollID = null;
    this.result = null;
    this.sortedResults = {};
    this.winner = null;
    this.winnerName = null;
  }

  StrawPollAPI.prototype.startPoll = function() {
    this.createPoll();
    this.postPoll();
  };

  StrawPollAPI.prototype.createPoll = function() {
    this.body = {
      title: 'Who do you want to be impersonated?',
      options: [
        'Donald Trump (@realDonaldTrump)',
        'Janet Jackson (@JanetJackson)',
        'Justin Bieber (@justinbieber)'
      ],
      multi: false,
      permissive: true
    };
  };

  StrawPollAPI.prototype.postPoll = function() {
    var _this = this;
    request.post({
      url: this.URL,
      followAllRedirects: true,
      body: this.body,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        _this.pollID = body.id;
        console.log('Visit: http://strawpoll.me/' + body.id);
      }
    }
  );
};

StrawPollAPI.prototype.retrievePoll = function(fn) {
  var _this = this;
  var urlNewPoll = this.URL + '/' + this.pollID;
  request.get({
    url: urlNewPoll,
    json: true
  },
  function(error, response, result) {
    if (!error && response.statusCode == 200) {
      _this.result = result;
      _this.parseResults();
      _this.sortWinner();
      _this.getWinnerUsername();
      fn();
    }
  }
);
};

StrawPollAPI.prototype.parseResults = function() {
  var _this = this;
  this.result.options.forEach(function(element, index) {
    _this.sortedResults[element] = _this.result.votes[index];
  });
};

StrawPollAPI.prototype.sortWinner = function() {
  var _this = this;
  this.winner = Object.keys(_this.sortedResults).reduce(function(a, b) {
    return _this.sortedResults[a] > _this.sortedResults[b] ? a : b;
  });
};

StrawPollAPI.prototype.getWinnerUsername = function() {
  var winnerHandler = this.winner.match(/\(([^)]+)\)/)[1];
  this.winnerName = winnerHandler.substring(1);
};

exports.StrawPollAPI = new StrawPollAPI();

})(this);
