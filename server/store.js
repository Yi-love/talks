const mongoose = require('mongoose');

const Heart = require('./models/heart.js');
const User = require('./models/user.js');

// 连接数据库
mongoose.connect('mongodb://localhost/talks');

function addHeart(heartnum){

  User.find().then((users)=>{
    for (var i = users.length - 1; i >= 0; i--) {
       console.log('oks');
      for (var j = heartnum ; j >= 0; j--) {
        var heart = new Heart({
          userid : users[i]._id,
          nickname:users[i].nickname,
          userimg : users[i].userimg,
          content : 'Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and',
          location: 'China',
          writeimgs : ['img/photo/1.jpg','img/photo/2.jpg','img/photo/3.jpg','img/photo/4.jpg']
        });
        heart.save();
      }
    }
  });
}
addHeart(20);