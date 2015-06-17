"use strict";
var champList = require('../api_data/champions.json');

/**
 * Converts the champion list keys to lower case. It then compares
 * the input to see if there is a match. (this is useful for checking,
 * if a url has entered a champion key - but doesn't match the correct casing).
 * @param  {string} champName - the champ name to compare against the champList.
 * @return {string|undefined} - if a match is found, the champ key is returned, otherwise undefined.
 */
var lowerCaseChamp = function(champName) {
    for (var prop in champList) {
        if (prop.toLowerCase() === champName.toLowerCase()) {
            return prop;
        }
    }
};


module.exports = lowerCaseChamp;