var mongoose = require('mongoose');
var InformationSchema = require('../schemas/information');
var Information = mongoose.model('Information' , InformationSchema);

module.exports = Information;