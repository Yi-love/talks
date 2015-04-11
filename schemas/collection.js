var mongoose = require('mongoose');

// 收藏对象
var CollectionSchema = new mongoose.Schema({
	heartid : String,
	userid : String,
	collectiontime : {type:Date , default:Date.now()},
});

CollectionSchema.statics = {
	findByUser: function(userid , cb){
		return this
			    .find({userid: userid})
			    .sort({collectiontime : -1})
			    .exec(cb);
	},
	findByHUid: function(userid , heartid , cb){
		return this
			    .findOne({userid: userid , heartid: heartid})
			    .exec(cb);
	}
};

module.exports = CollectionSchema;