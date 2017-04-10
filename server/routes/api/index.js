'use strict';

const router = require('koa-router')();
const register = require('./register.js');

router.prefix('/api');
router.get('/register/checkUserByuserName',register.checkUserByuserName);
router.post('/signup',register.signup);

module.exports = router;