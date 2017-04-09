const mongoose = require('mongoose');
let FriendsSchema = require('../schemas/friends');
let Friends = mongoose.model('Friends' , FriendsSchema);

module.exports = Friends;