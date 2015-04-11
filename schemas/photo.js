var mongoose = require('mongoose');

// 相片对象
var PhotoSchema = new mongoose.Schema({
	userid : String,
	imgurl : String ,
	phototime : {type:Date , default:Date.now()},
	agree : {type:Number , default:0},
	browsenum : {type:Number , default:0},
	freeze : {type:Number , default:0},
	abstract : String
});

PhotoSchema.statics = {
	findByFreeze: function(freeze , start , pagesize , cb){
        return this
               .find({freeze : freeze})
               .sort('phototime')
               .limit(pagesize)
               .skip(start)
               .exec(cb);
    },
	fetch: function(start , pagesize , cb){
        return this
               .find()
               .sort({phototime : -1})
               .limit(pagesize)
               .skip(start)
               .exec(cb);
    },
	findByUserId: function(userid , cb){
		return this
			    .find({userid: userid , freeze : 0})
			    .sort({phototime : -1})
			    .exec(cb);
	},
	findById: function(id , cb){
		return this
			    .findOne({_id: id})
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

module.exports = PhotoSchema;