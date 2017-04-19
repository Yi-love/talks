'use strict';

const router = require('koa-router')();
const register = require('../controllers/register');
const login = require('../controllers/login');
const heart = require('../controllers/heart');
const error = require('../controllers/error');

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