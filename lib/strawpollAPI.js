var request = require('request');

(function(exports) {

    function StrawPollAPI() {
        this.URL = 'http://strawpoll.me/api/v2/polls';
        this.body = null;
        this.pollID = null;
    }

    StrawPollAPI.prototype.createPoll = function() {
        this.body = {
            title: 'Who do you want to be impersonated?',
            options: [
                'Donald Trump',
                'Janet Jackson',
                'Justin Bieber'
            ],
            multi: false,
            permissive: true
        };
    };

    StrawPollAPI.prototype.postPoll = function() {
      var _this = this;
        request.post({
                url: this.URL,
                followAllRedirects: true, // <----
                body: this.body,
                json: true
            },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    _this.pollID = body.id;
                    console.log(_this.pollID);
                }
            }
        );
    };

    StrawPollAPI.prototype.retrievePoll = function() {
        console.log(this.pollID);
        var urlNewPoll = this.URL + '/' + this.pollID;
        console.log(urlNewPoll);
        request.get({
                url: urlNewPoll,
                json: true
            },
            function(error, response, result) {
                if (!error && response.statusCode == 200) {
                    console.log(result);
                }
            }
        );
    };

    exports.StrawPollAPI = StrawPollAPI;

})(this);
