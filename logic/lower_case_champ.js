"use strict";
var champList = require('../api_data/champions.json');

var lowerCaseChamp = function(champName) {
    for (var prop in champList) {
        if (prop.toLowerCase() === champName.toLowerCase()) {
            return prop;
        }
    }
};


module.exports = lowerCaseChamp;