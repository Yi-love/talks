const mongoose = require('mongoose');
let PhotoSchema = require('../schemas/photo');
let Photo = mongoose.model('Photo' , PhotoSchema);

module.exports = Photo;