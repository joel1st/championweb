module.exports = function(req, res, next){
    res.locals.core = {
		gamesAnalyzed:"3,549,640",
		patch:"5.10",
		ddPatch:"5.10.1",
		resetCache: Math.random().toFixed(5),
		patchHistory: ["5.6","5.7","5.8","5.9","5.10"],
		masteryOrder: ['Offense','Defense','Utility']
	};
    next();
};