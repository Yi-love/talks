var mongoose = require('mongoose');

// 评论对象
var AgreeSchema = new mongoose.Schema({
	userid : String,
	agreeurl : {type: String, default: ','}
});

AgreeSchema.statics = {
	findByUserid: function(userid , cb){
		return this
			    .findOne({userid:userid})
			    .exec(cb);
	}
};

module.exports = AgreeSchema;