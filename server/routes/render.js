'use strict';

const router = require('koa-router')();
const common = require('../controllers/common');

router.get('/register',common.index);
router.get('/',common.index);
router.get('/login',common.index);
router.get('/userIndex/:uid',common.index);
router.get('/user/:uid',common.index);

module.exports = router;