"use strict";
var mongoose = require('mongoose');

var summarySchema = new mongoose.Schema({
	id: Number,
	data: [{
		title: String,
		total: Number,
		mostImproved:{
			key: String,
			name: String,
			difference: Number,
			overall: Number
		},
		leastImproved:{
			key: String,
			name: String,
			difference: Number,
			overall: Number
		},
		highestWinRate:{
			key: String,
			name: String,
			value: Number
		},
		lowestWinRate:{
			key: String,
			name: String,
			value: Number
		},
		bestOverall:{
			key: String,
			name: String,
			value: Number
		},
		worstOverall:{
			key: String,
			name: String,
			value: Number
		}
	}]
});

module.exports = mongoose.model('Summaries', summarySchema);