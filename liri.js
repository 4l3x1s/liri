var keys = require("./keys.js");

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var client = new Twitter(keys.twitterKeys);
var input = process.argv;
var action = input[2];
var inputs = input[3];

switch (action) {
	case "my-tweets":
	twitter();
	break;

	case "spotify-this-song":
	spotify();
	break;

	case "movie-this":
	movie();
	break;

	case "do-what-it-says":
	doit();
	break;
};

function twitter() {

	var params = {screen_name: 'grace_testing01', count: 20};
	
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				// console.log(tweets);
				for (i = 0; i < tweets.length; i ++){
					console.log("Tweet: " + "'" + tweets[i].text + "'" + " Created At: " + tweets[i].created_at);
				}
			} else {
				console.log(error);
			}
		});

}

function spotify() {

	var spotify = new Spotify(keys.spotifyKeys);

	spotify.search({ type: 'track', query: inputs }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var songInfo = data.tracks.items[0];
		console.log("Artist(s): " + songInfo.artists[0].name)
		console.log("Song Name: " + songInfo.name)
		console.log("Preview Link: " + songInfo.preview_url)
		console.log("Album: " + songInfo.album.name)
	});
}


function movie() {

	var movieName = inputs;

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

// function doit() {

// };

