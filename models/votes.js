"use strict";
var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
	champ1: Number,
	champ2: Number,
	role: String,
	votes: Number,
	score1Total: Number,
	score2Total: Number,
	average1Value: Number,
	average2Value: Number,
	voters:  [{
		_id: { type: Number, index: true},//ipaddress
		dateModified: Number,
		vote1: Number,
		vote2: Number
	}]
});

module.exports = mongoose.model('votes', voteSchema);