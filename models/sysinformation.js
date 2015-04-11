var mongoose = require('mongoose');
var SysinformationSchema = require('../schemas/sysinformation');
var Sysinformation = mongoose.model('Sysinformation' , SysinformationSchema);

module.exports = Sysinformation;