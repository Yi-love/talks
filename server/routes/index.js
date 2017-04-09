const router = require('koa-router')();
const index = require('./render/index.js');

router.get('/:route?',index.index);

module.exports = router;