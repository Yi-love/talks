const session = require('koa-session');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/index.js');
const serve = require('koa-static');
const path =require('path');

const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(CONFIG, app));
app.use(bodyParser());
app.use(serve(path.join(__dirname , '../static')));
require('./render')(app);
app.use(router.routes());


app.listen(3000 ,'127.0.0.1', ()=>{
  console.log(`server start listening...`);
});

