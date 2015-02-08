/* GET users listing. */
"use strict";
var ChampionMatchups = require('../models/championMatchup.js');
var produceError = require('../logic/produceError.js');
var lowerCaseChamp = require('../logic/lowerCaseChamp.js');
var data = require('../models/data.js');
var express = require('express');
var router = express.Router();

router.get('/:champ1/:champ2/:role', function(req, res, next) {

    var champ1 = req.params.champ1;
    var champ2 = req.params.champ2;
    var champRole = req.params.role;
    var pageData, votes;
    var champ1Match = typeof data.champList[champ1] !== 'undefined';
    var champ2Match = typeof data.champList[champ2] !== 'undefined';

    function matchupResponse() {
        var title = generateTitle();
        res.render('matchup', {
            data: pageData,
            pageData: {
                appName: 'matchupPage',
                name: 'matchups',
                title: title,
                description: title,
                core: data.core
            }
        });
    }

    function generateTitle() {
        if (pageData.role === 'SYNERGY') {
            return pageData.champ1.name + ' ' + pageData.champ1.roleTitle + ' Synergy With ' + pageData.champ2.name + ' ' + pageData.champ2.roleTitle;
        }
        return pageData.champ1.name + ' ' + pageData.champ1.roleTitle + ' against ' + pageData.champ2.name + ' ' + pageData.champ2.roleTitle;
    }

    if ((champ1Match || lowerCaseChamp(champ1)) && (champ2Match || lowerCaseChamp(champ2)) && typeof data.roleList[champRole] !== 'undefined') {
        if (!champ1Match) {
            champ1 = lowerCaseChamp(champ1);
        }
        if (!champ2Match) {
            champ2 = lowerCaseChamp(champ2);
        }
        champ1 = data.champList[champ1].id;
        champ2 = data.champList[champ2].id;
        champRole = data.roleList[champRole];

        ChampionMatchups.findOne({
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
                matchupResponse();
            }
        });

    } else {
        return next(produceError('invalidMatchup'));
    }
});

module.exports = router;