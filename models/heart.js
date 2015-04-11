var mongoose = require('mongoose');
var HeartSchema = require('../schemas/heart');
var Heart = mongoose.model('Heart' , HeartSchema);

module.exports = Heart;