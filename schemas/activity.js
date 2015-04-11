var mongoose = require('mongoose');

// 活动对象
var ActivitySchema = new mongoose.Schema({
	userid : String,
	activityname : String ,
	content : String ,
	activitytime : {type:Date , default:Date.now()},
	activitylocation : String ,
	compere : String ,
	tel : String ,
	persons : Number,
	browsenum : Number,
	freeze : Number,
	transmit : Number
});

ActivitySchema.statics = {
	fetch: function(cb){
		return this
			   .find({})
			   .sort('activitytime')
			   .exec(cb);
	},
	findById: function(id , cb){
		return this
			   .findOne({_id: id})
			   .exec(cb);
	}
};

module.exports = ActivitySchema;