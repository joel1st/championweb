var WebOverallStats = require('../models/web_overall_stats.js');
var produceError = require('../logic/produce_error.js');

/**
 * The core object is used in all views template for overall data.
 * Values from database are loaded from the webOverallStats
 * collection and added to core object.
 * @type {Object}
 */ 
var ddPatch = require('../api_data/dd_patch.json').ddPatch
var core = {
	ddPatch: ddPatch,
	resetCache: ddPatch + Math.random().toFixed(6),
	masteryOrder: ['Offense','Defense','Utility'],
	headline: require('../headline.js')
};
// Data retrieved from DB:
// gamesAnalyzed:"3,549,640",
// patch:"5.10",
// patchHistory: ["5.6","5.7","5.8","5.9","5.10"]

module.exports = function(req, res, next){
	/**
	 * Set the core object as a local for the view
	 */
    res.locals.core = core;

    /**
     * If no data has been retrieved from data base yet,
     * request overall stats data from collection and add it
     * to the core object. 
     */
	if (!core.championsAnalyzed){
		WebOverallStats.findOne({}, function(err, data) {
		    if (err) {
		        return next(produceError('serverMaintenance', 503));
		    } else if (!data) {
		        return next(produceError('serverMaintenance', 503));
		    } else {
		        core.championsAnalyzed = data.championsAnalyzed;
				core.patch = data.patch;
				core.patchHistory = data.patchHistory;
				next();
		    }
		});
	} else {	
		next();
	}
};
