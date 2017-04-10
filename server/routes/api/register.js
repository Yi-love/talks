'use strict';

const User = require('./../../models/user');

exports.checkUserByuserName = async (ctx)=>{
  function findByUserName(username){
    return new Promise((resolve ,reject)=>{
      User.findByUserName(username+'' , (err,results)=>{
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    }).catch(err=>err);
  }
  if ( !ctx.query.username ) {
    return ctx.JsonResponse.error('username is gone.');
  }
  console.log('checkUserByuserName : ' , ctx.query.username);

  let user = await findByUserName(ctx.query.username);

  console.log('checkUserByuserName of user: ' , user);

  if ( user instanceof Error ) {
    ctx.JsonResponse.error('server is gone.');
  }else if ( user instanceof User ) {
    ctx.JsonResponse.success({hasUser:true});
  }else {
    ctx.JsonResponse.success({hasUser:false});
  }
};

exports.signup = async (ctx)=>{
  function saveUser(user){
    let newUser = new User({
      password : user.password,
      username : user.username
    });
    return new Promise((resolve , reject)=>{
      newUser.save((err,u)=>{
        if (err) {
          return reject(err);
        }
        return resolve(u);
      });
    }).catch(err=>err);
  };

  let userInfo = ctx.request.body;
  console.log('user:' , userInfo);
  if ( !userInfo.user || typeof userInfo.user !== 'object' ) {
    return ctx.JsonResponse.error('not save');
  }

  userInfo = userInfo.user;
  if ( !userInfo.password || !userInfo.username ) {
    return ctx.JsonResponse.error('not save , please sign up width username and password');
  }
  let user = await saveUser(userInfo);
  if ( user instanceof Error ) {
    ctx.JsonResponse.error('server is gone.');
  }else if ( user instanceof User ) {
    ctx.JsonResponse.success({isSave:true});
  }else {
    ctx.JsonResponse.error('server is gone.');
  }
}