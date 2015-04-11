var mongoose = require('mongoose');
var CollectionSchema = require('../schemas/collection');
var Collection = mongoose.model('Collection' , CollectionSchema);

module.exports = Collection;