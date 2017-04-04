const mongoose = require('mongoose');
let InformationSchema = require('../schemas/information');
let Information = mongoose.model('Information' , InformationSchema);

module.exports = Information;