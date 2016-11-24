  var strawpoll = require('strawpoll');
  var request = require('request');

  var stream = {
      title: 'Who do you want to be impersonated?',
      options: [
          'Donald Trump',
          'Janet Jackson',
          'Justin Bieber'
      ],
      multi: false,
      permissive: true
  };


  request.post({
          url: 'https://strawpoll.me/api/v2/polls',
          followAllRedirects: true,
          body: stream,
          json: true
      },

      function(error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  );
