"use strict";
var WebChampionPage = require('../models/web_champion_page.js');
var WebChampionRoles = require('../models/web_champion_roles.js');
var WebOverallRoleData = require('../models/web_overall_role_data.js');
var champList = require('../api_data/champions.json');
var roleHashTable = require('../logic/role_hash_table.js');
var produceError = require('../logic/produce_error.js');
var lowerCaseChamp = require('../logic/lower_case_champ.js');
var express = require('express');
var router = express.Router();

var pageData = {
    appName: 'championPage',
    name: 'champion',
    description: '',
    title: ''
};

router.get('/:champ', function(req, res, next) {
    var champKey = req.params.champ;

    var dataCount = 0;
    var champion = {};
    var generalRole = {};
    var championData = {};
    var championVotes = {};
    var champMatch = typeof champList[champKey] !== 'undefined';
    if (champMatch || lowerCaseChamp(champKey)) {
        if (!champMatch) {
            champKey = lowerCaseChamp(champKey);
        }
        var response = function() {
            if (dataCount === 1) {
                var resObj = {
                    pageData: pageData,
                    champion: champion,
                    generalRole: generalRole,
                    championData: championData,
                    championVotes: championVotes
                };
                resObj.pageData.title = champion.name + ' ' + champion.roleTitle + ' Stats, Builds, Runes, Masteries and Counters';
                resObj.pageData.description = "LoL Statistics, Builds, Runes, Masteries, Skill Orders, Counters and Matchups for "+champion.name+" when played "+champion.roleTitle+". Statistics include "+champion.name+ "'s Win Rate, Play Rate and Ban Rate. Counters include who "+champion.name + " " + champion.roleTitle + " is Strong or Weak Against."; 
            if (championData !== null) {
                    res.render('champion', resObj);
                } else {
                    res.render('new_champion', resObj);
                }
            }
        };

        WebChampionRoles.findOne({
            key: champKey
        }, function(err, doc) {
            if (err) {
                return next(produceError('serverMaintenance', 503));
            } else if (!doc || doc.roles.length === 0) {
                dataCount = 1;
                championData = null;
                generalRole = null;
                championVotes = null;
                champion = {
                    key: champKey,
                    name: champList[champKey].name
                };
                response();
            } else {

                champion = JSON.parse(JSON.stringify(doc));
                champion.role = doc.roles[0].role;
                champion.roleTitle = roleHashTable.roleKey[doc.roles[0].role];

                WebChampionPage.findOne({
                    key: champKey,
                    role: champion.roles[0].role
                }, function(err, doc) {
                    if (err) {
                        return next(produceError('serverMaintenance', 503));
                    } else if (!doc) {
                        return next(produceError('serverMaintenance', 503));
                    } else {
                        championData = doc.toObject();
                        response();
                        dataCount++;
                    }
                });

                WebOverallRoleData.findOne({
                    role: champion.roles[0].role
                }, function(err, doc) {
                    if (err) {
                        return next(produceError('serverMaintenance', 503));
                    } else if (!doc) {
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
});


router.get('/:champ/:role', function(req, res, next) {
    var champKey = req.params.champ;
    var champRole = req.params.role; //make function that converts role title to role key.
    var dataCount = 0;
    var champion = {};
    var generalRole = {};
    var championData = {};
    var championVotes = {};

    var champMatch = typeof champList[champKey] !== 'undefined';
    console.log(champMatch);
    if (typeof roleHashTable.roleList[champRole] !== 'undefined' && (champMatch || lowerCaseChamp(champKey))) {
        if (!champMatch) {
            champKey = lowerCaseChamp(champKey);
        }
        champRole = roleHashTable.roleList[champRole];
        var response = function() {
            if (dataCount === 2) {
                var resObj = {
                    pageData: pageData,
                    champion: champion,
                    generalRole: generalRole,
                    championData: championData
                };
                resObj.pageData.title = champion.name + ' ' + champion.roleTitle + ' Stats, Builds, Runes, Masteries and Counters';
                resObj.pageData.description = "LoL Statistics, Builds, Runes, Masteries, Skill Orders, Counters and Matchups for "+champion.name+" when played "+champion.roleTitle+". Statistics include "+champion.name+ "'s Win Rate, Play Rate and Ban Rate. Counters include who "+champion.name + " " + champion.roleTitle + " is Strong or Weak Against."; 
       
                res.render('champion', resObj);
            }
        };
        
        WebChampionRoles.findOne({
            key: champKey
        }, function(err, doc) {
            if (err) {
                return next(produceError('serverMaintenance', 503));
            } else if (!doc) {
                return next(produceError('serverMaintenance', 503));
            } else {
                champion = JSON.parse(JSON.stringify(doc));
                champion.role = champRole;
                champion.roleTitle = roleHashTable.roleKey[champRole];
                response();
                dataCount++;
            }
        });

        WebChampionPage.findOne({
            key: champKey,
            role: champRole
        }, function(err, doc) {
            if (err) {
                return next(produceError('serverMaintenance', 503));
            } else if (!doc) {
                res.redirect('/champion/'+champKey);
            } else {
                championData = doc.toObject();
                response();
                dataCount++;
            }
        });

        WebOverallRoleData.findOne({
            role: champRole
        }, function(err, doc) {
            if (err) {
                return next(produceError('serverMaintenance', 503));
            } else if (!doc) {
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

});

module.exports = router;