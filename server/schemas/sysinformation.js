const mongoose = require('mongoose');

// 系统信息对象
let SysinformationSchema = new mongoose.Schema({
  userid : String,
  category : String ,
  content : String,
  sysinformationtime : {type:Date , default:Date.now()},
  issee : Number
});

SysinformationSchema.statics = {
  findByIssee: function(issee , cb){
    return this
          .find({issee: issee})
          .sort('sysinformationtime')
          .exec(cb);
  }
};

module.exports = SysinformationSchema;