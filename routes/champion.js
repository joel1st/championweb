"use strict";
var WebChampionPage = require('../models/web_champion_page.js');
var WebChampionRoles = require('../models/web_champion_roles.js');
var WebOverallRoleData = require('../models/web_overall_role_data.js');
var champList = require('../api_data/champions.json');
var roleHashTable = require('../logic/role_hash_table.js');
var produceError = require('../logic/produce_error.js');
var lowerCaseChamp = require('../logic/lower_case_champ.js');
var express = require('express');
var q = require('q');
var router = express.Router();

/**
 * pageData sets the general page info for the current route.
 * For example - championPage is the name of the angular module.
 */
var pageData = {
    appName: 'championPage',
    name: 'champion',
    description: '',
    title: ''
};

function getChampionRoles(champKey){
    var deferred = q.defer();

    WebChampionRoles.findOne({
        key: champKey
    }, function(err, doc) {
        if (err) {
            deferred.reject('server_maintenance');
        
        } else if (!doc || doc.roles.length === 0) {
            deferred.reject('new_champion');

        } else {
            deferred.resolve(doc.toObject());
        }
    });
    return deferred.promise;
}

function getChampionPage(champKey, role, res){
    var deferred = q.defer();

    WebChampionPage.findOne({
        key: champKey,
        role: role
    }, function(err, doc) {
        if (err) {
            deferred.reject('server_maintenance');
        
        } else if (!doc) {
            if (res){
                res.redirect('/champion/'+champKey);
            } else {
                deferred.reject('server_maintenance');
            }
            
         
        } else {
            deferred.resolve(doc.toObject());
        }
    });

    return deferred.promise;
}

function getOverallRoleData(role){
    var deferred = q.defer();

    WebOverallRoleData.findOne({
        role: role
    }, function(err, doc) {
        if (err) {
            deferred.reject('server_maintenance');
        
        } else if (!doc) {
            deferred.reject('server_maintenance');
         
        } else {
            deferred.resolve(doc.toObject());
        }
    });

    return deferred.promise;
}

function generateResponseObj(champion, generalRole, championData){
    var resObj = {
        pageData: pageData,
        champion: champion,
        generalRole: generalRole,
        championData: championData
    };
    resObj.pageData.title = champion.name + ' ' + champion.roleTitle + ' Stats, Builds, Runes, Masteries and Counters';
    resObj.pageData.description = "LoL Statistics, Builds, Runes, Masteries, Skill Orders, Counters and Matchups for "+champion.name+" when played "+champion.roleTitle+". Statistics include "+champion.name+ "'s Win Rate, Play Rate and Ban Rate. Counters include who "+champion.name + " " + champion.roleTitle + " is Strong or Weak Against."; 
    return resObj;
}

router.get('/:champ', function(req, res, next) {
    var champKey = req.params.champ;
    var champion = {};
    var generalRole = {};
    var championData = {};
    var champMatch = typeof champList[champKey] !== 'undefined';

    if (champMatch || lowerCaseChamp(champKey)) {
        if (!champMatch) {
            champKey = lowerCaseChamp(champKey);
        }

        getChampionRoles(champKey)

        .then(function(doc){
            champion = doc;
            champion.role = doc.roles[0].role;
            champion.roleTitle = roleHashTable.roleKey[doc.roles[0].role];
            
            return q.all([
                    getChampionPage(champKey, champion.role),
                    getOverallRoleData(champion.role)
                ]).spread(function(_championData_, _generalRole_){
                    championData = _championData_;
                    generalRole =  _generalRole_;
                    res.render('champion', generateResponseObj(champion, generalRole, championData));

                }, function(){
                    next(produceError('serverMaintenance', 503));

                });

        }, function(err){
            if(err === 'new_champion'){
                championData = null;
                generalRole = null;
                champion = {
                    key: champKey,
                    name: champList[champKey].name
                };
                res.render('new_champion', generateResponseObj(champion, generalRole, championData));
            } else {
                next(produceError('serverMaintenance', 503));
            }
        });

    } else {
        return next(produceError('champNotFound'));
    }
});

router.get('/:champ/:role', function(req, res, next) {
    var champKey = req.params.champ;
    var champRole = req.params.role; //make function that converts role title to role key.
    var champion = {};
    var generalRole = {};
    var championData = {};

    var champMatch = typeof champList[champKey] !== 'undefined';
    if (typeof roleHashTable.roleList[champRole] !== 'undefined' && (champMatch || lowerCaseChamp(champKey))) {
        if (!champMatch) {
            champKey = lowerCaseChamp(champKey);
        }
        champRole = roleHashTable.roleList[champRole];

        q.all([
            getChampionRoles(champKey),
            getChampionPage(champKey, champRole, res),
            getOverallRoleData(champRole)
        ]).spread(function(_championRoles_, _championData_, _generalRole_){
            champion = _championRoles_;
            champion.role = champRole;
            champion.roleTitle = roleHashTable.roleKey[champRole];
            championData = _championData_;
            generalRole = _generalRole_;
            res.render('champion', generateResponseObj(champion, generalRole, championData));

        }, function(){
            next(produceError('serverMaintenance', 503));
        });

    } else {
        return next(produceError('champNotFound'));
    }

});

module.exports = router;
