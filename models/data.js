"use strict";

   var newChampion = {
      key:"Ekko",
      name:"Ekko",
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



   var determineKey = function(id){
      for(var champ in champList){
         if(champList.hasOwnProperty(champ)){
            if(id === champList[champ].id){
               return champList[champ].key;
            }
         }
      }
   };

   var core = {
      gamesAnalyzed:"4,082,130",
      patch:"5.9",
      ddPatch:"5.10.1",
      resetCache: Math.random().toFixed(5),
      patchHistory: ["5.5","5.6","5.7","5.8","5.9"],
      masteryOrder: ['Offense','Defense','Utility']
   };

   exports.core = core;
   exports.newChampion = newChampion;
   exports.champList = require('../apiData/champions.json');
   exports.roleList = roleList;
   exports.roleKey = roleKey;
   exports.determineKey = determineKey;
