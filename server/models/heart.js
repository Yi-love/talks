const mongoose = require('mongoose');
let HeartSchema = require('../schemas/heart');
let Heart = mongoose.model('Heart' , HeartSchema);

module.exports = Heart;