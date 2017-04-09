const mongoose = require('mongoose');
let AgreeSchema = require('../schemas/agree');
let Agree = mongoose.model('Agree' , AgreeSchema);

module.exports = Agree;