'use strict';

const crypto = require('crypto');

const User = require('./../../models/user');
const constant = require('./../../config/constant.js');

exports.checkUserByuserName = async (ctx)=>{
  function findByUserName(un){
    return new Promise((resolve ,reject)=>{
      User.findByUserName(un+'' , (err,results)=>{
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
  let username = ctx.query.username+'';
  let uname = username;
  username  = username.replace(' ' ,'');
  if ( username < 2 || username > 24 || username !== uname ) {
    return ctx.JsonResponse.error('not find 1');
  }
  console.log('checkUserByuserName name : ' , username);

  let user = await findByUserName(username);

  console.log('checkUserByuserName of find user: ' , user);

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
      password : crypto.createHash('sha256').update(user.password).digest('hex'),
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
  if ( !userInfo.data || typeof userInfo.data !== 'object' ) {
    return ctx.JsonResponse.error('not save , -1');
  }
  if ( !userInfo.data.secret || !userInfo.data.username ) {
    return ctx.JsonResponse.error('not save , 0');
  }

  let registerKey =  ctx.cookies.get(constant.REGISTER_KEY);
  ctx.cookies.set(constant.REGISTER_KEY , '');
  let registerSecretKey = ctx.session[registerKey];
  ctx.session[registerKey] = '';
  
  let decipher = crypto.createDecipher('aes-256-cbc',registerSecretKey);
  let dec = decipher.update(userInfo.data.secret,'hex','utf8');
  dec += decipher.final('utf8');

  console.log('real source: ' , dec , typeof dec , JSON.parse(dec));
  try{
    dec = JSON.parse(dec);
  }catch(e){
    return ctx.JsonResponse.error('not save ,parse error');
  }

  if ( typeof dec !== 'object' ) {
    return ctx.JsonResponse.error('not save  , 1');
  }
  if ( !dec.username || !dec.password || !dec.repassword ) {
    return ctx.JsonResponse.error('not save , 2');
  }
  dec.password += '';
  dec.repassword += '';
  dec.username += '';
  let password = dec.password;
  let uname = dec.username;
  dec.password = dec.password.replace(' ' , '');
  dec.username = dec.username.replace(' ' , '');

  if ( dec.username < 2 || dec.username > 24 || dec.username !== userInfo.data.username+'' || dec.username !== uname ) {
    return ctx.JsonResponse.error('not save , 3');
  }
  if ( dec.password.length < 6 || dec.password.length > 20 || dec.password !== dec.repassword || dec.password !== password ) {
    return ctx.JsonResponse.error('not save , 4');
  }

  userInfo = dec;
  let user = await saveUser(userInfo);
  if ( user instanceof Error ) {
    ctx.JsonResponse.error('server is gone. 5');
  }else if ( user instanceof User ) {
    ctx.JsonResponse.success({isSave:true});
  }else {
    ctx.JsonResponse.error('server is gone. 6');
  }
}

exports.secretRegisterKey = async (ctx)=>{
  let sessionKey = ctx.cookies.get([constant.SESSION_KEY])+Date.now()+'';

  let rkey = 'e8331d7d5ecfcf7encrypted without standard blo5655be53a9ade200894593d4e25ab1981928b80bc3412376fThe DiffieHellman class is a utility for creating Diffie-Hellman key exchanges';
  let rlength = rkey.length;
  let sessionKeyLen = sessionKey.length;
  let rkeyStr = '';
  for ( let i = 0 ; i < 10 ; i++ ){
    let id = Math.floor(Math.random()*rlength);
    rkeyStr += rkey[id];
  }
  let spi = Math.floor(Math.random()*sessionKeyLen-1);
  let bs = sessionKey.slice(0,spi);
  let ps = sessionKey.slice(spi,sessionKeyLen);
  let registerKey = crypto.createHmac('sha256', bs+rkeyStr+ps)
                         .update('I love cupcakes')
                         .digest('hex');

  let key = 'ca981be48e90867604588e75d padding off will only work if the input data04feabb63cc007a8f8ad89b10616ed84d815504When data has been encrypted without standard block padding';
  let length = key.length;

  let keyStr = '';
  for ( let i = 0 ; i < 10 ; i++ ){
    let id = Math.floor(Math.random()*length);
    keyStr += key[id];
  }
  let registerSecretKey = crypto.createHmac('sha256', keyStr).update('i am here').digest('hex');;
  ctx.cookies.set(constant.REGISTER_KEY , registerKey);

  ctx.session[registerKey] = registerSecretKey;
  ctx.JsonResponse.success({rsecret:registerSecretKey});
}