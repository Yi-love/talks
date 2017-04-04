const mongoose = require('mongoose');
let ActivitySchema = require('../schemas/activity');
let Activity = mongoose.model('Activity' , ActivitySchema);

module.exports = Activity;