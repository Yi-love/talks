'use strict';
const mongoose = require('mongoose');

// 用户对象
let UserSchema = new mongoose.Schema({
  username : String,
  nickname : {type: String, default: 'Yi'},
  email : {type: String, default: ''},
  tel : {type: String, default: ''},
  password : String,
  age : {type: String, default: '22'},
  userimg : {type: String, default: 'img/userdef.jpg'},
  sex : {type: String, default: 'nv'},
  personalization : {type: String, default: 'img/photo/1.jpg'},
  company : {type: String, default: ''},
  position : {type: String, default: ''},
  pay : {type: String, default: ''},
  registertime : {type: Date, default: Date.now()},
  lastlogintime : {type: Date, default: Date.now()},
  level : {type: Number, default: 1},
  integral : {type: Number, default: 0},
  height : {type: String, default: ''},
  weight : {type: String, default: ''},
  figure : {type: String, default: '苗条'},
  nation : {type: String, default: '汉族'},
  constellation : {type: String, default: ''},
  location : {type: String, default: '深圳'},
  address : {type: String, default: ''} ,
  abstract : {type: String, default: '很懒什么也没有留下!'},
  birthday : {type: Date, default: Date.now()},
  blog : {type: String, default: ''},
  qq : {type: String, default: ''},
  weixin : {type: String, default: ''},
  microblog : {type: String, default: ''},
  integrity : {type: String, default: ''},
  officially : {type: String, default: ''},
  vip : {type: Number, default: 0},
  major : {type: String, default: ''},
  hobit : {type: String, default: ''},
  friendssay : {type: String, default: ''},
  ip: {type: String, default: ''},
  device : {type: String, default: ''},
  school : {type: String, default: 'New East'},
  constellat : {type: String, default: ''},
  freeze : {type: Number, default: 0}, // 0表示未冻结  1表示已经冻结
  isfirst : {type: Number, default: 1},
  fances : {type: Number, default: 0},
  friends : {type: Number, default: 0},
  online : {type: Number, default: 0}//0 表示不在线 1 在线
});

UserSchema.statics = {
  fetch: function(start , pagesize , cb){
    return this
             .find()
             .limit(pagesize)
             .skip(start)
             .exec(cb);
  },
 fetchAll: function(cb){
    return this
             .find()
             .exec(cb);
  },
  findByFreeze: function(freeze , start , pagesize , cb){
    return this
             .find({freeze : freeze})
             .limit(pagesize)
             .skip(start)
             .exec(cb);
  },
  findByUserName: function(username , cb){
    return this
          .findOne({username: username})
          .exec(cb);
  },
  findById: function(id , cb){
    return this
              .findOne({_id: id})
              .exec(cb);
  },
  findByIdLike : function(id , cb){
    return this
             .find({_id : new RegExp(id)})
             .exec(cb);
  },
  findByNameLike : function(nickname , cb){
    return this
             .find({nickname : new RegExp(nickname)})
             .exec(cb);
  },
  findByLocationLike : function(location , cb){
    return this
             .find({location : new RegExp(location)})
             .exec(cb);
  },
  findByOnline : function(online , cb){
    return this
             .find({online : online})
             .count()
             .exec(cb);
  },
  findBySex : function(sex , cb){
    return this
             .find({sex : sex})
             .count()
             .exec(cb);
  },
  findCount : function(cb){
    return this.count().exec(cb);
  }
};

module.exports = UserSchema;