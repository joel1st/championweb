/* GET users listing. */
"use strict";
var apiData = require('../apiData');
var express = require('express');
var router = express.Router();

router.get('/items/:id', function(req, res) {
    var id = req.params.id;
    if(apiData.items.hasOwnProperty(id)){
        res.json(apiData.items[id]); 
    } else {
        res.statusCode = 404;
        res.send('invalid request');
    }
});

router.get('/masteries/:id', function(req, res) {
    var id = req.params.id;
    if(apiData.masteries.hasOwnProperty(id)){
        res.json(apiData.masteries[id]); 
    } else {
        res.statusCode = 404;
        res.send('invalid request');
    }
});
/*
router.get('/runes/:id', function(req, res) {
    var id = req.params.id;
    if(apiData.masteries.hasOwnProperty(id)){
        res.json(apiData.masteries[id]); 
    } else {
        res.statusCode = 404;
        res.send('invalid request');
    }
});*/

router.get('/summoners/:id', function(req, res) {
    var id = req.params.id;
    var match = false;
    for (var prop in apiData.summoners){
        if(apiData.summoners.hasOwnProperty(prop) && apiData.summoners[prop].id === Number(id)){
            res.json(apiData.summoners[prop]);
            match = true;
            break;
        }
    } 
    if (!match){
        res.statusCode = 404;
        res.send('invalid request');
    }
});


router.get('/skills/:champion/:id', function(req, res) {
    var id = req.params.id;
    var champion = req.params.champion;
    var championSkills;

    //I'd like to find a better way to do this
    var champFound = false;
    for (var i in apiData.skills) {
        if (i.toLowerCase() === champion.toLowerCase()) {
            champion = i;
            champFound = true;
        }
    }

    if (champFound || apiData.skills.hasOwnProperty(champion)) {
        championSkills = apiData.skills[champion].spells;
        if (id in championSkills) {
            res.json(championSkills[id]);
        }
        else {
            res.statusCode = 404;
            res.send(champion + " doesn't have that skill.");
        }
    }
});




module.exports = router;
