'use strict';

const router = require('koa-router')();
const register = require('./register');
const login = require('./login');
const heart = require('./heart');
const error = require('./error');

router.prefix('/api');

router.get('/register/checkUserByuserName',register.checkUserByuserName);
router.get('/register/secretRegisterKey',register.secretRegisterKey);
router.post('/signup',register.signup);

router.post('/signin',login.signin);
router.get('/signin/secretLoginKey',login.secretLoginKey);
router.get('/getUserInfo',login.getUserInfo);

router.get('/heart/hearts' , heart.hearts);

router.get('/error/report' , error.report);

module.exports = router;