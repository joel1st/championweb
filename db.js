"use strict";
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/championgg');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log('Connection Made!');
});
