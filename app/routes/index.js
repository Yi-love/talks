const router = require('koa-router')();
const index = require('./render/index.js');

router.get('/',index.index);
router.get('/register',index.register);
router.get('/login',index.login);
router.get('/search',index.search);

module.exports = router;