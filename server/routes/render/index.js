'use strict';

const router = require('koa-router')();
const common = require('./common.js');

router.get('/:route?',common.index);

module.exports = router;