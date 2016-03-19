var mongoose = require('mongoose');

var webOverallStats = new mongoose.Schema({
	patchHistory: [String],
	patch: String,
	championsAnalyzed: String,
});

module.exports = mongoose.model('WebOverallStats', webOverallStats);