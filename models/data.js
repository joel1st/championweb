"use strict";

   var newChampion = {
      key:"",
      name:"",
      roleTitle:""//leave blank
   };

   var roleList =  {
	'Top':'TOP',
	'Middle' : 'MIDDLE',
	'Support': 'DUO_SUPPORT',
	'ADC': 'DUO_CARRY',
	'Jungle': 'JUNGLE',
   'top':'TOP',
   'middle' : 'MIDDLE',
   'support': 'DUO_SUPPORT',
   'adc': 'DUO_CARRY',
   'jungle': 'JUNGLE',
   'adcsupport': 'ADCSUPPORT',
   'synergy':'SYNERGY'
	};

	var roleKey =  {
	'TOP':'Top',
	'MIDDLE' : 'Middle',
	'DUO_SUPPORT': 'Support',
	'DUO_CARRY': 'ADC',
	'JUNGLE': 'Jungle',
   'ADCSUPPORT': 'adcsupport',
   'SYNERGY':'synergy'
	};

   var core = {
      gamesAnalyzed:"3,549,640",
      patch:"5.10",
      ddPatch:"5.10.1",
      resetCache: Math.random().toFixed(5),
      patchHistory: ["5.6","5.7","5.8","5.9","5.10"],
      masteryOrder: ['Offense','Defense','Utility']
   };

   exports.core = core;
   exports.newChampion = newChampion;
   exports.champList = require('../api_data/champions.json');
   exports.roleList = roleList;
   exports.roleKey = roleKey;
