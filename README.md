# Mimic Bot

[![Build Status](https://travis-ci.org/JG075/mimic-bot.svg?branch=master)](https://travis-ci.org/JG075/mimic-bot)
[![Coverage Status](https://coveralls.io/repos/github/JG075/mimic-bot/badge.svg?branch=master)](https://coveralls.io/github/JG075/mimic-bot?branch=master)

Mimic Bot is a fun Slack bot that can impersonate other people using their previous tweets. It also has the option to use [StrawPoll](http://www.strawpoll.me) so people can vote on who gets impersonated.

**Prerequisites:**

* Node.js installed
* A Slack account
* Hosting (if not running locally)

## Installation

To setup the bot on your own Slack channel, you will need to do the following:

### For local deployment

1. Create the bot at [https://my.slack.com/services/new/bot](https://my.slack.com/services/new/bot) (the name can be anything).
2. Note the API key Slack provides.
3. Invite the Slack bot to your channel.
4. Create an app at [https://apps.twitter.com](https://apps.twitter.com) (the name can be anything).
5. Note down the following: TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET.
6. Download the repository locally.
7. In your Command Line: 

    ```
    $ npm install
    ```
8. Add a .env file to the root of the project in the following form: 

    ```
    SLACK_KEY=YOURKEY
    TWITTER_CONSUMER_KEY=YOURKEY
    TWITTER_CONSUMER_SECRET=YOURKEY
    TWITTER_ACCESS_TOKEN=YOURKEY
    TWITTER_ACCESS_TOKEN_SECRET=YOURKEY
    ```
9. Add/change the matchingWords, twitterUser, and useStrawPoll variables to your choosing.

### For web server deployment

Follow the above steps except clone this repo to your server. Alternatively you can deploy straight to Heroku using the link below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Running the App

To run the app:

1. In your Command Line:

    ```
    $ node app.js
    ```
2. The bot will now say a random tweet found with your matching words, whenever it sees those same words in Slack.

## Tests

To run the tests:

```
$ mocha
```
