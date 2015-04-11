var mongoose = require('mongoose');

// 心里话对象
var HeartSchema = new mongoose.Schema({
	userid : String,
	userimg :  String,
	nickname : String,
	content : String ,
	writetime : {type:Date , default:Date.now()},
	location : String,
	writeimgs : String,
	agree : {type:Number , default:0},
	transmit : {type:Number , default:0},
	commentnum : {type:Number , default:0},
	browsenum : {type:Number , default:0},
	collectionnum :{type:Number , default:0},
	freeze : {type:Number , default:0},
	issee : {type:Number , default:0}
});

HeartSchema.statics = {
	findByUserid: function(userid , start , pagesize , cb){
		return this
			    .find({userid: userid , freeze : 0})
			    .sort({writetime: -1 })
               	.limit(pagesize)
               	.skip(start)
			    .exec(cb);
	},
	findByUserids: function(userids , start , pagesize , cb){
		return this
			    .find({userid: {$in: userids } , freeze : 0})
			    .sort({writetime: -1 })
               	.limit(pagesize)
               	.skip(start)
			    .exec(cb);
	},
	findById: function(heartid , cb){
		return this
			    .findOne({_id: heartid})
			    .sort({writetime: -1 })
			    .exec(cb);
	},
	findByIds: function(heartids , cb){
		return this
			    .find({_id: { $in:heartids} , freeze : 0})
			    .sort({writetime: -1 })
			    .exec(cb);
	},
    findByFreeze: function(freeze , start , pagesize , cb){
        return this
               .find({freeze : freeze})
               .sort({writetime: -1 })
               .limit(pagesize)
               .skip(start)
               .exec(cb);
    },
	fetch: function(start , pagesize , cb){
        return this
               .find()
               .sort({writetime: -1 })
               .limit(pagesize)
               .skip(start)
               .exec(cb);
    },
    fetchAll: function(cb){
        return this
               .find()
               .exec(cb);
    },
    findCount : function(cb){
      return this.find().count().exec(cb);
    },
    findFreeze : function(freeze , cb){
        return this
               .find({freeze : freeze})
               .count()
               .exec(cb);
    }
};

module.exports = HeartSchema;