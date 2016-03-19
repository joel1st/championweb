/* GET users listing. */
"use strict";
var WebMatchupPage = require('../models/web_matchup_page.js');
var roleHashTable = require('../logic/role_hash_table.js');
var express = require('express');
var router = express.Router();

router.get('/:champ1/:champ2/:role', function(req, res) {

    var champ1 = req.params.champ1;
    var champ2 = req.params.champ2;
    var champRole = req.params.role;

    if (typeof roleHashTable.roleKey[champRole] !== 'undefined') {
        WebMatchupPage.findOne({
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
});

module.exports = router;