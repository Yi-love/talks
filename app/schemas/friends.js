const mongoose = require('mongoose');

// 系统信息对象
let FriendsSchema = new mongoose.Schema({
  userid : String,
  friendid : {type:String , default:','},//0 粉丝  1 好友
  fanceid : {type: String , default:','},
  friendtime : {type:Date , default:Date.now()}
});

FriendsSchema.statics = {
  findByUserId: function(userid , cb){
    return this
         .findOne({userid: userid})
         .sort('_id')
         .exec(cb);
  }
};

module.exports = FriendsSchema;