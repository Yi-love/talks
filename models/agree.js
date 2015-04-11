var mongoose = require('mongoose');
var AgreeSchema = require('../schemas/agree');
var Agree = mongoose.model('Agree' , AgreeSchema);

module.exports = Agree;