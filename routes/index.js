"use strict";
var WebChampionRoles = require('../models/web_champion_roles.js');
var WebHomePageSummaries = require('../models/web_home_page_summaries.js');
var lowerCaseChamp = require('../logic/lower_case_champ.js');
var produceError = require('../logic/produce_error.js');
var champList = require('../api_data/champions.json');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var retrievedYet = false;
    var champData = [];
    var summaries = [];

    function responseObj() {
        res.render('index', {
            summaries: summaries,
            data: champData,
            pageData: {
                appName: 'core',
                name: 'home',
                title: 'LoL Champion Stats, Builds, Runes, Masteries, Counters and Matchups!',
                description:'Champion.gg provides League of Legends champion statistics, builds, runes, masteries, skill orders and counters by role - including Win Rate, Ban Rate, Play Rate and much more!' 
            }
        });
    }

    WebChampionRoles.find({}).sort({
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

    WebHomePageSummaries.findOne({
        id: 1
    }, function(err, data) {
        if (err) {
            return next(produceError('serverMaintenance', 503));
        } else if (!data) {
            return next(produceError('serverMaintenance', 503));
        } else {
            summaries = data.data;
            if (retrievedYet) {
                responseObj();
            } else {
                retrievedYet = true;
            }
        }
    });
});

router.get('/:champ', function(req, res, next) {
    var champKey = req.params.champ;
    if (typeof champList[champKey] !== 'undefined' || lowerCaseChamp(champKey)) {
        res.redirect('/champion/' + req.params.champ);
    } else {
        return next(produceError('pageNotFound', 404));
    }
});

module.exports = router;