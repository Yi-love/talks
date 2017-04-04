const mongoose = require('mongoose');
let AdminSchema = require('../schemas/admin');
let Admin = mongoose.model('Admin' , AdminSchema);

module.exports = Admin;