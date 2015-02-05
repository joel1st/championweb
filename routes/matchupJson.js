/* GET users listing. */
"use strict";
var ChampionMatchups = require('../models/championMatchup.js');
var data = require('../models/data.js');

module.exports = function(req, res) {

    var champ1 = req.params.champ1;
    var champ2 = req.params.champ2;
    var champRole = req.params.role;

    if (typeof data.roleKey[champRole] !== 'undefined') {
        ChampionMatchups.findOne({
            'champ1.id': champ1,
            'champ2.id': champ2,
            role: champRole
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.send('Try Again');
            } else {
                res.json(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.send('invalid request');
    }
};