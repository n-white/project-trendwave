var express = require('express');
var routes = require('./routes.js');
var cors = require('cors');
var Twitter = require('twitter');
var fs = require('fs');
var bodyParser = require('body-parser');



var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.use(express.static(__dirname + '/client'));

app.listen(3000, function (req, res) {
	console.log('app is running');
});

