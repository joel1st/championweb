"use strict";
var WebStatisticsPage = require('../models/web_statistics_page.js');
var produceError = require('../logic/produce_error.js');
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {

    WebStatisticsPage.find({}, function(err, doc) {
        if (err) {
            return next(produceError('serverMaintenance', 503));
        } else if (!doc) {
            return next(produceError('serverMaintenance', 503));
        } else {
            res.render('statistics', {
                data: doc,
                pageData: {
                    appName: 'statsPage',
                    name: 'stats',
                    title: 'League of Legends Stats by Champion Role for the Current Patch',
                    description: "League of Legends Statistics including Win Rate, Ban Rate, Play Rate, Kills, Deaths by Champions and the roles they play."
                }
            });
        }
    });
});

module.exports = router;