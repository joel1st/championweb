"use strict";
var ChampionRoles = require('../models/championRoles.js');
var Summaries = require('../models/summaries.js');
var produceError = require('../logic/produceError.js');
var data = require('../models/data.js');

module.exports = function(req, res, next) {
    var retrievedYet = false;
    var champData = [];
    var summaries = [];

<<<<<<< HEAD
	function responseObj(){
		res.render('index', {
	    	summaries:summaries,
	    	data:champData,
	    	pageData:{
	    		core: data.core,
	        	appName: 'core',
	        	name:'home',
	        	title: 'LoL Champion Stats, Builds, Runes, Masteries, Counters and Matchups!',
	        	description:'Champion.gg provides League of Legends champion statistics, builds, runes, masteries, skill orders and counters by role - including Win Rate, Ban Rate, Play Rate and much more!' 
	        }
    	});
	}	
=======
    function responseObj() {
        res.render('index', {
            summaries: summaries,
            data: champData,
            pageData: {
                core: data.core,
                appName: 'core',
                name: 'home',
                title: 'Champion Statistics, Counters, Builds and Matchups!',
                description: 'Champion.gg provides champion statistics, builds and counters by role - including Win Rate, Ban Rate, Play Rate and much more!'
            }
        });
    }
>>>>>>> 04e55a27164d9351ca18ec9a60cc82d4cbab28e2

    ChampionRoles.find({}).sort({
        name: 1
    }).exec(function(err, data) {
        if (err) {
            return next(produceError('serverMaintenance', 503));
        } else if (!data) {
            return next(produceError('serverMaintenance', 503));
        } else {
            champData = data;
            if (retrievedYet) {
                responseObj();
            } else {
                retrievedYet = true;
            }
        }
    });

    Summaries.findOne({
        id: 1
    }, function(err, data) {
        if (err) {
            return next(produceError('serverMaintenance', 503));
        } else if (!data) {
            return next(produceError('serverMaintenance', 503));
        } else {
            console.log(data.data);
            summaries = data.data;
            if (retrievedYet) {
                responseObj();
            } else {
                retrievedYet = true;
            }
        }
    });
};