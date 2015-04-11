var mongoose = require('mongoose');
var FriendsSchema = require('../schemas/friends');
var Friends = mongoose.model('Friends' , FriendsSchema);

module.exports = Friends;