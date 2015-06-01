var mongoose = require('mongoose');

var webMatchupPage = new mongoose.Schema({
	champ1: {
		id: Number,
		key: String,
		name: String,
		role: String,
		roleTitle: String,
		performance: Number
	},
	champ2: {
		id: Number,
		key: String,
		name: String,
		role: String,
		roleTitle: String,
		performance: Number
	},
	role: String,
	dateAdded: Number,
	totalGames:Number,
	general: [{
		title: String,
		champ1:{
			val: Number,
			change: Number,
			score: Number //score to use is champ 1 is quering page
		},
		champ2:{
			val: Number,
			change: Number,
			score: Number //score to use if champ 2 is quering page
		},
	}],
	championMatrix:{
		labels:[String],
		champ1:[Number],
		champ2:[Number]
	},
	goldLength:{
		champ1:[Number],
		champ2:[Number]
	}
});

module.exports = mongoose.model('WebMatchupPage', webMatchupPage);