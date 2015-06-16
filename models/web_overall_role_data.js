var mongoose = require('mongoose');

var webOverallRoleData = new mongoose.Schema({
	role:String,
    totalNumber: Number,
    matrixLabels:[String],
    patchPlay: [Number]
});

module.exports = mongoose.model('WebOverallRoleData', webOverallRoleData);