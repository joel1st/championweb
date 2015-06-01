var mongoose = require('mongoose');

var webOverallRoleData = new mongoose.Schema({
	role:String,
    totalNumber: Number,
    matrixLabels:[String],
    patchPlay: [Number],
    patchTotalPlays: [Number]
});

module.exports = mongoose.model('WebOverallRoleData', webOverallRoleData);