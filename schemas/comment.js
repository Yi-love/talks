var mongoose = require('mongoose');

// 评论对象
var CommentSchema = new mongoose.Schema({
	heartid : String,
	userid : String,
	nickname : String,
	userimg : String,
	content : String ,
	commenttime : {type:Date , default:Date.now()},
	freeze : {type:Number , default:0},
	issee : {type:Number , default:0}//0表示没有被查看
});

CommentSchema.statics = {
	findByUserid: function(userid , cb){
		return this
			    .find({userid:userid})
			    .sort('commenttime')
			    .exec(cb);
	},
	findByHeartid: function(heartid , cb){
		return this
			    .find({heartid: heartid})
			    .sort('commenttime')
			    .exec(cb);
	}
};

module.exports = CommentSchema;