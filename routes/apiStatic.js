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


router.get('/skills/:id/:champion', function(req, res) {
    var id = req.params.id;
    var champion = req.params.champion;
    if(id >= 1 && id <= 4 ){
        if(apiData.spells.hasOwnProperty(champion)){
            res.json(apiData.masteries[champion].spells[id]); 
        } else {
            res.statusCode = 404;
            res.send('invalid request');
        }
    }
});




module.exports = router;