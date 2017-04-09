const mongoose = require('mongoose');
let CollectionSchema = require('../schemas/collection');
let Collection = mongoose.model('Collection' , CollectionSchema);

module.exports = Collection;