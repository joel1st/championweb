"use strict";
var mongoose = require('mongoose');

var championVoteSchema = new mongoose.Schema({
	key:String,
	role:String,
	matchups:[{
		key: String,
		userScore:Number,
		ratings:Number
	}],
	adcsupport:[{
		key: String,
		userScore:Number,
		ratings:Number
	}],
	synergy:[{
		key: String,
		userScore:Number,
		ratings:Number
	}]
});

module.exports = mongoose.model('championVote', championVoteSchema);