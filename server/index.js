'use strict';

const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const serve = require('koa-static');
const path =require('path');
const mongoose = require('mongoose');
const jsonResponse = require('./middleware/jsonResponse.js');
const constant = require('./config/constant.js');

const app = new Koa();
// 连接数据库
mongoose.connect('mongodb://localhost/talks');

app.keys = ['talks_keys'];
app.use(session({
  key : constant.SESSION_KEY,
  store: new MongoStore({db:constant.SESSION_DB})
}));

app.use(bodyParser());
app.use(serve(path.join(__dirname , '../static')));
require('./render')(app);
app.use(jsonResponse);
router(app);

app.listen(3000 ,'127.0.0.1', ()=>{
  console.log(`server start listening...`);
});

