"use strict";
var WebStatisticsPage = require('../models/web_statistics_page.js');
var produceError = require('../logic/produce_error.js');
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {

<<<<<<< HEAD
    WebStatisticsPage.find({}, function(err, results) {
        if (err) {
            return next(produceError('serverMaintenance', 503));
        } else if (!results) {
            return next(produceError('serverMaintenance', 503));
        } else {
            res.render('statistics', {
                data: results,
=======
    WebStatisticsPage.find({}, function(err, doc) {
        if (err) {
            return next(produceError('serverMaintenance', 503));
        } else if (!doc) {
            return next(produceError('serverMaintenance', 503));
        } else {
            res.render('statistics', {
                data: doc,
>>>>>>> 0acee52b21d5eb5856cd35d38022084123812434
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