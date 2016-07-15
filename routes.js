var routes = require('express').Router();
var googleTrends = require('google-trends-api');
var Twitter = require('twitter');
var fs = require('fs');


routes.get('/trends', function(req, res, next) {
	var trendArray = 
	googleTrends.hotTrends('US')
	.then(function(results){
		res.send(results);
	})
	.catch(function(err){
		console.log(err);
	});
});

routes.post('/grabTweets', function(req, res) {
	var query = req.body.q;
	var grabTweets = new Twitter({

/// INSERT HERE

	});
	grabTweets.get('search/tweets', {q: query, count: 40, result_type: 'recent', lang: 'en'}, function(error, tweets, response) {
	 if (!error) {
	     var tweetText = tweets.statuses.map(function(tweetObj) {
	        return tweetObj.text
	        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
	        .replace(/[`~@#$%^&*()_|☆+\-=;:<>\{\}\[\]\\\/]/gi, ' ')
	     })

	   fs.writeFile('tweets.txt', JSON.stringify(tweetText), function(err) {
	       if(!err) {
	       console.log('success: ');
	       }
	   })
	 }
	});
});

module.exports = routes;
