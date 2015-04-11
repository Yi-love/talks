var mongoose = require('mongoose');

// 信息对象
var InformationSchema = new mongoose.Schema({
	userid : String,
	sendid : String,
	sendimg : String,
	sendname : String,
	category : {type:Number , default:0} ,//0 加为好友信息 
	content : {type: String , default:'什么也没有！'},
	informationtime : {type:Date , default:Date.now()},
	issee : {type:Number , default:0}
});

InformationSchema.statics = {
	findByUserId: function(userid , cb){
		return this
			    .find({userid: userid})
			    .sort('informationtime')
			    .exec(cb);
	},
	findByUserIdAndSendId : function(userid , sendid , cb){
		return this
			   .find({userid : userid , sendid : sendid})
			   .sort('informationtime')
			   .exec(cb);
	}
};

module.exports = InformationSchema;