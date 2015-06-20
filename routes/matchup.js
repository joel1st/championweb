/* GET users listing. */
"use strict";
var WebMatchupPage = require('../models/web_matchup_page.js');
var produceError = require('../logic/produce_error.js');
var lowerCaseChamp = require('../logic/lower_case_champ.js');
var roleHashTable = require('../logic/role_hash_table.js');
var champList = require('../api_data/champions.json');
var express = require('express');
var router = express.Router();

router.get('/:champ1/:champ2/:role', function(req, res, next) {

    var champ1 = req.params.champ1;
    var champ2 = req.params.champ2;
    var champRole = req.params.role;
    var pageData, votes;
    var champ1Match = typeof champList[champ1] !== 'undefined';
    var champ2Match = typeof champList[champ2] !== 'undefined';

    function matchupResponse() {
        var title = generateTitle();
        res.render('matchup', {
            data: pageData,
            pageData: {
                appName: 'matchupPage',
                name: 'matchups',
                title: title,
                description: title
            }
        });
    }

    function generateTitle() {
        if (pageData.role === 'SYNERGY') {
            return pageData.champ1.name + ' ' + pageData.champ1.roleTitle + ' Synergy With ' + pageData.champ2.name + ' ' + pageData.champ2.roleTitle;
        }
        return pageData.champ1.name + ' ' + pageData.champ1.roleTitle + ' against ' + pageData.champ2.name + ' ' + pageData.champ2.roleTitle;
    }

    if ((champ1Match || lowerCaseChamp(champ1)) && (champ2Match || lowerCaseChamp(champ2)) && typeof roleHashTable.roleList[champRole] !== 'undefined') {
        if (!champ1Match) {
            champ1 = lowerCaseChamp(champ1);
        }
        if (!champ2Match) {
            champ2 = lowerCaseChamp(champ2);
        }
        champ1 = champList[champ1].id;
        champ2 = champList[champ2].id;
        champRole = roleHashTable.roleList[champRole];

        WebMatchupPage.findOne({
            'champ1.id': champ1,
            'champ2.id': champ2,
            role: champRole
        }, function(err, doc) {

            if (err) {
                return next(produceError('serverMaintenance', 503));
            } else if (!doc) {
                return next(produceError('invalidMatchup'));
            } else {
                pageData = doc;
                pageData.roleTitle = roleHashTable.roleKey[pageData.role];
                matchupResponse();
            }
        });

    } else {
        return next(produceError('invalidMatchup'));
    }
});

module.exports = router;