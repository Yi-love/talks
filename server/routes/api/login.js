const User = require('./../../models/user');

exports.signin = async (ctx)=>{
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
  let userInfo = ctx.request.body;
  console.log('user:' , userInfo);
  if ( !userInfo.user || typeof userInfo.user !== 'object' ) {
    return ctx.JsonResponse.error('not save');
  }

  userInfo = userInfo.user;
  if ( !userInfo.password || !userInfo.username ) {
    return ctx.JsonResponse.error('not save , please sign in width username and password');
  }

  let user = await findByUserName(userInfo.username);

  console.log('signin of user: ' , user);

  if ( user instanceof Error ) {
    ctx.JsonResponse.error('server is gone.');
  }else if ( user instanceof User ) {
    if ( user.password === userInfo.password  ) {
      ctx.JsonResponse.success({isSignIn:true});
    }else{
      ctx.JsonResponse.error('username or password error');
    }
  }else {
    ctx.JsonResponse.error('username or password error');
  }
};