"use strict";
var ChampionData = require('../models/championData.js');
var ChampionRoles = require('../models/championRoles.js');
var ChampionVotes = require('../models/championVotes.js');
var Roles = require('../models/roles.js');
var data = require('../models/data.js');
var produceError = require('../logic/produceError.js');
var lowerCaseChamp = require('../logic/lowerCaseChamp.js');

var pageData = {
  patch: data.currentPatch,
  appName: 'championPage',
  name:'champion',
  title: ''
};

exports.champion = function(req, res, next){
  var champKey = req.params.champ;

  var dataCount = 0;
  var champion = {};
  var generalRole = {};
  var championData = {};
  var championVotes = {};
  var champMatch = typeof data.champList[champKey] !== 'undefined';
  if(champMatch || lowerCaseChamp(champKey)){
  if(!champMatch){
    champKey = lowerCaseChamp(champKey);
  }
    var response = function(){
       if(dataCount === 2){
        var resObj = { 
          pageData:pageData,
          champion: champion,
          generalRole: generalRole,
          championData: championData,
          championVotes: championVotes
        };
        resObj.pageData.title = champion.name + ' ' + champion.roleTitle + ' Matchups, Counters and Stats';
        res.render('champion', resObj);
      }
    };

    ChampionRoles.findOne({key:champKey}, function(err, doc){
      if(err){
        return next(produceError('serverMaintenance', 503));
      } else if(!doc){
        return next(produceError('serverMaintenance', 503));
      } else {
        champion = JSON.parse(JSON.stringify(doc));
        champion.role = doc.roles[0].role;
        champion.roleTitle = data.roleKey[doc.roles[0].role];

        ChampionData.findOne({key:champKey, role:champion.roles[0].role}, function(err, doc){
          if(err){
            return next(produceError('serverMaintenance', 503));
          } else if(!doc){
            return next(produceError('serverMaintenance', 503));
          } else {
            championData = doc;
            response();
            dataCount++;
          }
        });

        ChampionVotes.findOne({key:champKey, role:champion.roles[0].role}, function(err, doc){
          championVotes = doc;
          response();
          dataCount++;
        });

        Roles.findOne({role:champion.roles[0].role}, function(err, doc){
          if(err){
            return next(produceError('serverMaintenance', 503));
          } else if(!doc){
            return next(produceError('serverMaintenance', 503));
          } else {
            generalRole = doc;
            response();
            dataCount++;
          }
        });
      }
    });
  } else {
    return next(produceError('champNotFound'));
  }

};



exports.championRole = function(req, res, next){
  var champKey = req.params.champ;
  var champRole = req.params.role; //make function that converts role title to role key.
  var dataCount = 0;
  var champion = {};
  var generalRole = {};
  var championData = {};
  var championVotes = {};

  var champMatch = typeof data.champList[champKey] !== 'undefined';
  console.log(champMatch);
  if(typeof data.roleList[champRole] !== 'undefined' && (champMatch || lowerCaseChamp(champKey)) ){
  if(!champMatch){
    champKey = lowerCaseChamp(champKey);
  }
    champRole = data.roleList[champRole];
    var response = function(){
      if(dataCount === 3){
        var resObj = { 
          pageData:pageData,
          champion: champion,
          generalRole: generalRole,
          championData: championData,
          championVotes: championVotes
        };
        resObj.pageData.title = champion.name + ' ' + champion.roleTitle + ' Matchups, Counters and Stats';
        res.render('champion', resObj);
      }
    };

    ChampionRoles.findOne({key:champKey}, function(err, doc){
      if(err){
        return next(produceError('serverMaintenance', 503));
      } else if(!doc){
        return next(produceError('serverMaintenance', 503));
      } else {
        champion = JSON.parse(JSON.stringify(doc));
        champion.role = champRole;
        champion.roleTitle = data.roleKey[champRole];
        response();
        dataCount++;
      }
    });

    ChampionData.findOne({key:champKey, role:champRole}, function(err, doc){
      if(err){
        return next(produceError('serverMaintenance', 503));
      } else if(!doc){
        return next(produceError('serverMaintenance', 503));
      } else {
        championData = doc;
        response();
        dataCount++;
      }
    });

    ChampionVotes.findOne({key:champKey, role:champRole}, function(err, doc){
        championVotes = doc;
        response();
        dataCount++;
      });

    Roles.findOne({role:champRole}, function(err, doc){
      if(err){
        return next(produceError('serverMaintenance', 503));
      } else if(!doc){
        return next(produceError('serverMaintenance', 503));
      } else {
        generalRole = doc;
        response();
        dataCount++;
      }
    });
  } else {
    return next(produceError('champNotFound'));
  }
  
};
