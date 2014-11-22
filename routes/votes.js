"use strict";
var ChampionVotes = require('../models/championVotes.js');
var Votes = require('../models/votes.js');
var championData = require('../models/data.js');

module.exports = function(req, res){
  console.log('attempting to submit vote');
  console.log(req.body);
  
  var ip = Number(req.connection.remoteAddress.split(".").join(""));
  var champ1 = req.body.champ1;
  var champ2 = req.body.champ2;
  var role = req.body.role;
  var champ1Role = req.body.champ1Role;
  var champ2Role = req.body.champ2Role;
  var vote1 = req.body.vote1;
  var vote2 = req.body.vote2;


  if(typeof champ1 === 'number' && typeof champ2 === 'number' && typeof role === 'string' && typeof vote1 === 'number' && typeof vote2 === 'number' && typeof champ1Role === 'string' && typeof champ2Role === 'string'){

    if(champ1 < champ2 && champ1 > 0 && champ1 < 1000 && champ2 > 0 && champ2 < 1000 && championData.roleKey.hasOwnProperty(role) && championData.roleKey.hasOwnProperty(champ1Role) && championData.roleKey.hasOwnProperty(champ2Role) && vote1 >= 1 && vote1 <= 5 && vote2 >= 1 && vote2 <= 5 && ((vote1 + vote2 === 6 && role!=='SYNERGY') || (vote1 === vote2 && role ==='SYNERGY')) && ((role!=='ADCSUPPORT' && role!=='SYNERGY') || ((role==='ADCSUPPORT'||role==='SYNERGY')&&((champ1Role==='DUO_SUPPORT'&&champ2Role==='DUO_CARRY')||(champ2Role==='DUO_SUPPORT'&&champ1Role==='DUO_CARRY')))) ){
      
      var matchKey = (role==='ADCSUPPORT'||role==='SYNERGY')? role.toLowerCase() : 'matchups';
      var matchesObj1 = {};
      var matchesObj2 = {};
      var updateData1 = {};
      var updateData2 = {};

      matchesObj1 = {
          key: championData.determineKey(champ1),
          role: champ1Role
      };
      matchesObj1[matchKey+'.key'] = championData.determineKey(champ2);
     
      matchesObj2 = {
        key: championData.determineKey(champ2),
        role: champ2Role
      };
      matchesObj2[matchKey+'.key'] = championData.determineKey(champ1);

      Votes.findOne({champ1: champ1, champ2: champ2, role:role}, {score1Total:1, score2Total:1, votes:1}, function(err, data){
        if(err){console.log(data);}
        if(data){
          Votes.findOne({_id: data._id, "voters._id":ip}, {score1Total:1, score2Total:1, votes:1, "voters.$":1}, function(err,matchData){
            
            if(matchData){
              data = null;
              if(matchData.voters[0].vote1 !== vote1){
                Votes.update({_id: matchData._id, "voters._id":ip}, {
                  '$inc': {
                    score1Total: vote1 - matchData.voters[0].vote1,
                    score2Total: vote2 - matchData.voters[0].vote2
                  },
                  '$set': { 
                    average1Value: ((matchData.score1Total+(vote1 - matchData.voters[0].vote1)) / matchData.votes).toFixed(2),
                    average2Value: ((matchData.score2Total+(vote2 - matchData.voters[0].vote2)) / matchData.votes).toFixed(2),
                    "voters.$.dateModified": Date.now(),
                    "voters.$.vote1": vote1,
                    "voters.$.vote2": vote2
                  }    
                }, function(err, changesMade){
                  if(err){console.log(err);}
                  res.send('very nmice');
                  console.log('updates where made, thing where said');
                }); 


                updateData1 = {
                  $set: {}
                };
                updateData1.$set[matchKey+'.$.userScore'] = ((matchData.score1Total+(vote1 - matchData.voters[0].vote1)) / matchData.votes).toFixed(2);
                updateData1.$set[matchKey+'.$.ratings'] = matchData.votes;
              
                updateData2 = {
                  $set: {}
                };
                updateData2.$set[matchKey+'.$.userScore'] = ((matchData.score2Total+(vote2 - matchData.voters[0].vote2)) / matchData.votes).toFixed(2);
                updateData2.$set[matchKey+'.$.ratings'] = matchData.votes;
              


                ChampionVotes.update(matchesObj1, updateData1, function(err, numAffected){
                    if(err){console.log(err);}
                });
                
                ChampionVotes.update(matchesObj2, updateData2, function(err, numAffected){
                    if(err){console.log(err);}
                });

              } else{
                res.send('Vote already recorded');
                console.log('done like a dinner');
              }
            } else {
              Votes.update({_id: data._id}, {
                $push: { voters: {
                  _id: ip,
                  dateModified: Date.now(),
                  vote1: vote1,
                  vote2: vote2
                }},
                '$inc': {
                  votes: 1,
                  score1Total: vote1,
                  score2Total: vote2
                },
                '$set': { 
                  average1Value: ((data.score1Total+vote1)/(data.votes+1)).toFixed(2),
                  average2Value: ((data.score2Total+vote2)/(data.votes+1)).toFixed(2)
                }    
              }, function(err, changesMade){
                if(err){console.log(err);}
                res.send('very nmice');
                console.log('woot just made an update for the first time!');
              });

              updateData1 = {
                $set: {}
              };
              updateData1.$set[matchKey+'.$.userScore'] = ((data.score1Total+vote1)/(data.votes+1)).toFixed(2);
              updateData1.$set[matchKey+'.$.ratings'] = (data.votes+1);
              console.log(updateData1);

              updateData2 = {
                $set: {}
              };
              updateData2.$set[matchKey+'.$.userScore'] = ((data.score2Total+vote2)/(data.votes+1)).toFixed(2);
              updateData2.$set[matchKey+'.$.ratings'] = (data.votes+1);


              ChampionVotes.update(matchesObj1, updateData1, function(err, numAffected){
                  if(err){console.log(err);}
                  console.log(numAffected);
              });
                
              ChampionVotes.update(matchesObj2, updateData2, function(err, numAffected){
                  if(err){console.log(err);}
                  console.log(numAffected);
              });
            }
          });
        } else {
          res.send('mac address recorded');
          console.log('incorrect post data sent');
        }
      });
                  
    } else {
      console.log('incorrect post data sent');
      res.send('no matcharoony'); 
    }     
  } else {
    res.send('no matcharoony');
      console.log('incorrect post data sent');
  }
};
