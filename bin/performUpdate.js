#!/usr/bin/env node
"use strict";
var db = require('../db');
var Votes = require('../models/votes.js');
var ChampionData = require('../models/championData.js');
var ChampionRoles = require('../models/championRoles.js');
var ChampionVotes = require('../models/championVotes.js');
var Roles = require('../models/roles.js');
var data = require('../models/data.js');

var ChampionMatchups = require('../models/championMatchup.js');


ChampionMatchups.find({},{champ1:1, champ2:1, role:1}, function(err, docs){
		var votesAggregated = 0;
		var docsLength = docs.length
		function determineMoreVotes(){
			if(votesAggregated === docsLength){
				console.log('vote aggregation completed');
				docs = null; //free up memory asap
				compileChampStats();
			} else {
				voteAggregator();
			}
		};
		function voteAggregator(){
				Votes.update({champ1: docs[votesAggregated].champ1.id, champ2: docs[votesAggregated].champ2.id, role:docs[votesAggregated].role}, { 
				$pull: { voters: { dateModified: { $lte: Date.now() - 1000*60*60*24*30*2 } } },
				$setOnInsert: { 
					champ1: docs[votesAggregated].champ1.id, 
					champ2: docs[votesAggregated].champ2.id, 
					role: docs[votesAggregated].role,
					votes: 0,
					score1Total: 0,
					score2Total: 0,
					average1Value: 3,
					average2Value: 3,
				}
				
			}, {upsert:true}, aggregator);
		};

		function aggregator(err, numEffected){
			if(err){
				console.log(err);
			}
			if(process.env.UPDATES === 'aggregation'){
				Votes.aggregate([
					{$match: {
							champ1: docs[votesAggregated].champ1.id, 
				 			champ2: docs[votesAggregated].champ2.id, 
				 			role:docs[votesAggregated].role
					}},
					{$unwind:"$voters"}, 
					{$group:{
						_id: "votingAggregation",
						//current patch

						votes: {$sum:1},
						score1Total: {$sum: "$voters.vote1"},
						score2Total: {$sum: "$voters.vote2"},
						average1Value: {$avg: "$voters.vote1"},
						average2Value: {$avg: "$voters.vote2"}		
					}}
				], function(err, results){
					if(err){console.log(err);}
					
					if(results.length){
						console.log(results);
						Votes.update({champ1: docs[votesAggregated].champ1.id, champ2: docs[votesAggregated].champ2.id, role:docs[votesAggregated].role}, { 
							'$set': {
				                votes: results[0].votes,
				                score1Total: results[0].score1Total,
				                score2Total: results[0].score2Total,
				                average1Value: results[0].average1Value.toFixed(2),
				                average2Value: results[0].average2Value.toFixed(2)
				              }    
						}, function(err, numEffected){
							if(err){console.log(err);}
							console.log('matches found and updated');
							docs[votesAggregated] = null;
							votesAggregated++;
							determineMoreVotes();
						});
					} else {
						docs[votesAggregated] = null;
						votesAggregated++;
						determineMoreVotes();
					}
				});
			} else {
				docs[votesAggregated] = null;
				votesAggregated++;
				determineMoreVotes();
			}
		}
		determineMoreVotes();
});




function compileChampStats(){
	ChampionData.find({},{key:1,role:1,matchups:1,adcsupport:1,synergy:1},function(err, docs){
		if(err){console.log(err);}
		var championsCompleted = 0;
		var determineMoreChampions = function(){
			if(championsCompleted === docs.length){
				console.log('All Done!');
			} else {
				processChampion(championsCompleted);
			}
		};

		var voteMatchup = [];
		
		function processChampion(d){
			console.log('starting champion process');
			var id = data.champList[docs[d].key].id;
			voteMatchup[d] = {
				key:docs[d].key,
				role: docs[d].role,
				matchups:[],
				adcsupport:[],
				synergy:[]
			};
			
			getAllMatchups(id,d,'matchups',docs[d].role, function(){
				if(docs[d].role==='DUO_SUPPORT' || docs[d].role==='DUO_CARRY'){
					getAllMatchups(id,d,'synergy','SYNERGY', function(){
						getAllMatchups(id,d,'adcsupport','ADCSUPPORT', function(){
							saveMatchup(d);
						});
					});
				} else {
					saveMatchup(d);
				}
			});
		}

		function getAllMatchups(id, d, matchupType, role, callback){

			var matchupsCompleted = 0;
			function determineMoreMatchups(){
				if(matchupsCompleted === docs[d][matchupType].length){
					console.log('matchups analyzed!');
					callback();
				} else {
					processMatchups(matchupsCompleted);
				}
			};
			var orderId = [];
			function processMatchups(t){
				var matchupId = data.champList[docs[d][matchupType][t].key].id;
				orderId[t] = id<matchupId ? [id, matchupId]:[matchupId, id];

				Votes.findOne({champ1: orderId[t][0], champ2: orderId[t][1], role:role}, {votes:1, average1Value:1}, function(err, matchupData){
					voteMatchup[d][matchupType].push({
						key: docs[d][matchupType][t].key,
						ratings: matchupData.votes,
						userScore: matchupData.average1Value
					});
					matchupData = null;//free up memory
					matchupsCompleted++;
					determineMoreMatchups();
				});		
			}

			determineMoreMatchups();
		}

		function saveMatchup(d){
			ChampionVotes.update({champ1: docs[d].key, role:docs[d].role}, voteMatchup[d], {upsert:true}, function(err, numEffected){
				console.log('vote updated');
				docs[d] = null; //free up memory
				championsCompleted++;
				determineMoreChampions();
			});
		}

		determineMoreChampions();
	});
}



