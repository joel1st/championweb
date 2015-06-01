var mongoose = require('mongoose');
/**
 * Used to build up the long champ list on the homepage and the 
 * individual champion roles on the left hand side of the champion pages.
 */
var webChampionRoles = new mongoose.Schema({
	key: String,
	name: String,
	lastUpdated: Number,
	roles:[{
		role:String,
		title:String,
		games:Number,
		percentPlayed:Number
	}]
});

module.exports = mongoose.model('WebChampionRoles', webChampionRoles);