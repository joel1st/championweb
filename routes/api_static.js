/* GET users listing. */
"use strict";
var apiData = require('../api_data');
var express = require('express');
var router = express.Router();

/**
 * Route set up for indepth mastery info.
 */
router.get('/masteries/:id', function(req, res) {
    res.setHeader('Cache-Control', 'public, max-age=180'); //cache masteries for 3 minutes.

    var id = req.params.id;
    if(apiData.masteries.hasOwnProperty(id)){
        res.json(apiData.masteries[id]); 
    } else {
        res.statusCode = 404;
        res.send('invalid request');
    }
});

/**
 * Route set up for when we add indepth tool tips to items
 * --> not currently used.
 */
router.get('/items/:id', function(req, res) {
    var id = req.params.id;
    if(apiData.items.hasOwnProperty(id)){
        res.json(apiData.items[id]); 
    } else {
        res.statusCode = 404;
        res.send('invalid request');
    }
});



/**
 * Route set up for when we add indepth summoner spell information
 * --> not currently used.
 */
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


/**
 * Route set up for when we add summoner skill order information
 * --> not currently used - may be working, but commented out incase,
 *     there are potential bugs.
 */

// router.get('/skills/:champion/:id', function(req, res) {
//     var id = req.params.id;
//     var champion = req.params.champion;
//     var championSkills;

  
//     var champFound = apiData.skills.hasOwnProperty(champion);
//     var keys = Object.keys(apiData.skills);
//     for (var i in keys) {
//         if (champFound) break;
//         if (keys[i].toLowerCase() === champion.toLowerCase()) {
//             champion = keys[i];
//             champFound = true;
//             break;
//         }
//     }

//     if (champFound) {
//         championSkills = apiData.skills[champion].spells;
//         if (id in championSkills) {
//             res.json(championSkills[id]);
//         }
//         else {
//             res.statusCode = 404;
//             res.send(champion + " doesn't have that skill.");
//         }
//     }
// });


module.exports = router;
