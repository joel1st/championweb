"use strict";
var mongoose = require('mongoose');
mongoose.connect('mongodb://paulxuca:flamerider1@ds019829.mlab.com:19829/league');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log('Connection Made!');
});
