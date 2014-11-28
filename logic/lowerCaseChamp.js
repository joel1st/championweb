"use strict";
var data = require('../models/data.js');

var lowerCaseChamp = function(champName){
	for(var prop in data.champList){
		if (prop.toLowerCase() === champName.toLowerCase()){
			return prop;
		}
	}
};


module.exports = lowerCaseChamp;