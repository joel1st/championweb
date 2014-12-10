var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
	role:String,
    totalNumber: Number,
    matrixLabels:[String],
    patchPlay: [Number],
    patchTotalPlays: [Number]
});

module.exports = mongoose.model('Roles', roleSchema);