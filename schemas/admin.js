var mongoose = require('mongoose');

// 管理员对象
var AdminSchema = new mongoose.Schema({
	adminname : String,
	adminnickname : String ,
	lastlogintime : {type:Date , default:Date.now()},
	adminpassword : String,
	adminimgurl : {type: String, default: 'img/userdef.jpg'},
	admintel : String,
	adminaddress : String,
	loginplace : String
});

AdminSchema.statics = {
	findByAdminName: function(adminname , cb){
		return this
			    .findOne({adminname: adminname})
			    .exec(cb);
	}
};

module.exports = AdminSchema;