'use strict';

const crypto = require('crypto');

const User = require('../models/user');
const constant = require('../config/constant');

exports.signin = async (ctx)=>{
  let userInfo = ctx.request.body;
  if ( !userInfo.data || typeof userInfo.data !== 'object' ) {
    return ctx.JsonResponse.error('not parse 0 ');
  }
  if ( !userInfo.data.secret || !userInfo.data.username ) {
    return ctx.JsonResponse.error('not parse 1');
  }

  let loginKey =  ctx.cookies.get(constant.LOGIN_KEY);
  ctx.cookies.set(constant.LOGIN_KEY ,'');
  let loginSecretKey = ctx.session[loginKey];
  ctx.session[loginKey] = '';

  let decipher = crypto.createDecipher('aes-256-cbc',loginSecretKey);
  let dec = decipher.update(userInfo.data.secret,'hex','utf8');
  dec += decipher.final('utf8');

  try{
    dec = JSON.parse(dec);
  }catch(e){
    return ctx.JsonResponse.error('not find ,parse error');
  }

  console.log('real source:', dec);

  if ( typeof dec !== 'object' ) {
    return ctx.JsonResponse.error('not parse 2');
  }
  if ( !dec.username || !dec.password ) {
    return ctx.JsonResponse.error('not parse 3');
  }
  dec.password += '';
  dec.username += '';
  let password = dec.password;
  let uname = dec.username;
  dec.password = dec.password.replace(' ' , '');
  dec.username = dec.username.replace(' ' , '');

  if ( dec.username < 2 || dec.username > 24 || dec.username !== userInfo.data.username+'' || dec.username !== uname ) {
    return ctx.JsonResponse.error('not parse 4');
  }
  if ( dec.password.length < 6 || dec.password.length > 20 || dec.password !== password ) {
    return ctx.JsonResponse.error('not parse 5');
  }
  
  userInfo = dec;

  let user = await User.findByUserName(userInfo.username+'').catch(err=>err);

  console.log('signin of user: ' , user);

  if ( user instanceof Error ) {
    ctx.JsonResponse.error('server is gone.');
  }else if ( user instanceof User ) {
    if ( user.password === crypto.createHash('sha256').update(userInfo.password).digest('hex') ) {
      let key = 'rer 8 introduced the prefixe without standard 6a78cae4df0612ea10c2721e3b479d2fe110f31f369ebd3b81721fdf4569afa5 Dsin Gecko 10.0 (Firefox 10.0 / Thunderbird 10.0 / SeaMonkey 2.7), handling of text-overflow on blocks with inline overflow on both horizontal sides has been ';
      let klength = key.length;
      let keyStr = '';
      for ( let i = 0 ; i < 16 ; i++ ){
        let id = Math.floor(Math.random()*klength);
        keyStr += key[id];
      }
      let userKey = crypto.createHash('sha256').update(userInfo.username+user._id+keyStr).digest('hex');
      ctx.cookies.set(constant.LOGIN_SESSION_KEY , userKey);
      delete user.password;
      ctx.session[userKey] = user; 
      ctx.JsonResponse.success({isSignIn:true,uid:user._id});
    }else{
      ctx.JsonResponse.error('username or password error');
    }
  }else {
    ctx.JsonResponse.error('username or password error');
  }
};

exports.secretLoginKey = async (ctx)=>{
  let sessionKey = ctx.cookies.get([constant.SESSION_KEY])+Date.now()+'';

  let rkey = 'provided, or if the cipher text has bab49d02d3cbb0e01be40595e4f381a788d95aed with, decipher.final() with throw, indicatinge0014b51befcece6de95529df14 that the cipher text should be';
  let rlength = rkey.length;
  let sessionKeyLen = sessionKey.length;
  let lkeyStr = '';
  for ( let i = 0 ; i < 12 ; i++ ){
    let id = Math.floor(Math.random()*rlength);
    lkeyStr += rkey[id];
  }
  let spi = Math.floor(Math.random()*sessionKeyLen-1);
  let bs = sessionKey.slice(0,spi);
  let ps = sessionKey.slice(spi,sessionKeyLen);
  let loginKey = crypto.createHmac('sha256', bs+lkeyStr+ps)
                         .update('nb hong hong de ...')
                         .digest('hex');

  let key = 'hen using an authCM1249e4a6a07e6f27a5b0d8ac94e9b10af74f5df1332e6e057edenticated encryption mode (only G3477d74dedbd6abca775aed51cfaa4cf1398af055c2e922c4f4 76d215fb3aa6ffbdf4f731b5b5f1059a09f264a4f812cea068a4c2acda is currently supported), the decipher.setAuthTag() method is used ';
  let length = key.length;

  let keyStr = '';
  for ( let i = 0 ; i < 12 ; i++ ){
    let id = Math.floor(Math.random()*length);
    keyStr += key[id];
  }
  let loginSecretKey = crypto.createHmac('sha256', keyStr).update('login to talks').digest('hex');
  ctx.cookies.set(constant.LOGIN_KEY , loginKey);

  ctx.session[loginKey] = loginSecretKey;
  ctx.JsonResponse.success({lsecret:loginSecretKey});
}

exports.getUserInfo = async (ctx)=>{
  if ( !ctx.query.uid ) {
    return ctx.JsonResponse.error('get user error');
  }
  let uid = (ctx.query.uid+'').replace(/[^A-Za-z0-9_]/ig, '');
  let userKey = ctx.cookies.get(constant.LOGIN_SESSION_KEY);
  if ( userKey ) {
    let data = ctx.session[userKey];
    if ( typeof data === 'object' && data._id && uid === (data._id+'') ) {
      let user = Object.assign({} , data);
      delete user.password;
      user.id = user._id;
      delete user._id;
      return ctx.JsonResponse.success({user:user});
    }else{
      ctx.cookies.set(constant.LOGIN_SESSION_KEY , '');
    }
  }
  return ctx.JsonResponse.error('user id invalided');
}