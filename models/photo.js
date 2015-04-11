var mongoose = require('mongoose');
var PhotoSchema = require('../schemas/photo');
var Photo = mongoose.model('Photo' , PhotoSchema);

module.exports = Photo;