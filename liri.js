var keys = require("keys.js");
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');

switch (action) {
	case "twitter":
	twitter();
	break;

	case "spotify":
	spotify();
	break;

	case "movie":
	movie();
	break;

	case "doit":
	doit();
	break;
}


var client = new Twitter({
  consumer_key: keys.twitter_keys.consumer_key,
  consumer_secret: keys.twitter_keys.consumer_secret,
  access_token_key: keys.twitter_keys.access_token_key,
  access_token_secret: keys.twitter_keys.access_token_secret
});