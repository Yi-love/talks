const mongoose = require('mongoose');
let SysinformationSchema = require('../schemas/sysinformation');
let Sysinformation = mongoose.model('Sysinformation' , SysinformationSchema);

module.exports = Sysinformation;