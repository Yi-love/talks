var mongoose = require('mongoose');
var AdminSchema = require('../schemas/admin');
var Admin = mongoose.model('Admin' , AdminSchema);

module.exports = Admin;