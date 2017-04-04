const router = require('koa-router')();
const index = require('./render/index.js');

router.get('/',index.index);
router.get('/register',index.register);
module.exports = router;