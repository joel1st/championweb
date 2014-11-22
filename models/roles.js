"use strict";
var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
	role:String,
    totalNumber: Number,
    matrixLabels:[String],
    goldLength:[Number],
});

module.exports = mongoose.model('Roles', roleSchema);