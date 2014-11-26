"use strict";
var ChampionRoles = require('../models/championRoles.js');
var Summaries = require('../models/summaries.js');
var produceError = require('../logic/produceError.js');
var data = require('../models/data.js');

module.exports = function(req, res, next){
	var retrievedYet = false;
	var champData = [];
	var summaries = [];

	function responseObj(){
		res.render('index', {
	    	summaries:summaries,
	    	data:champData,
	    	pageData:{
	    		core: data.core,
	        	appName: 'core',
	        	name:'home',
	        	title: 'Champion Statistics, Counters, Matchups and much more!' 
	        }
    	});
	}	

 	ChampionRoles.find({}).sort({name:1}).exec(function(err, data){
		if(err){
			return next(produceError('serverMaintenance', 503));
		} else if(!data){
			return next(produceError('serverMaintenance', 503));
		} else {
	 		champData = data;
	 		if(retrievedYet){
	 			responseObj();
	 		} else {
	 			retrievedYet = true;
	 		}
 		}
 	});

 	Summaries.find({}, function(err, data){
		if(err){
			return next(produceError('serverMaintenance', 503));
		} else if(!data){
			return next(produceError('serverMaintenance', 503));
		} else {
	 		summaries = data;
	 		if(retrievedYet){
	 			responseObj();
	 		} else {
	 			retrievedYet = true;
	 		}
 		}
 	});
};

