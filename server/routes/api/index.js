'use strict';

const router = require('koa-router')();
const register = require('./register.js');
const login = require('./login.js');

router.prefix('/api');

router.get('/register/checkUserByuserName',register.checkUserByuserName);
router.get('/register/secretRegisterKey',register.secretRegisterKey);
router.post('/signup',register.signup);

router.post('/signin',login.signin);
router.get('/signin/secretLoginKey',login.secretLoginKey);

module.exports = router;