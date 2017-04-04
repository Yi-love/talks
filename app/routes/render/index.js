exports.index = async (ctx)=>{
  await ctx.render('index',{title:'Talks-首页'});
};
exports.register = async(ctx)=>{
  await ctx.render('register',{title:'Talks-注册'});
};
exports.login = async(ctx)=>{
  await ctx.render('login',{title:'Talks-登录'});
};
exports.search = async(ctx)=>{
  await ctx.render('search',{title:'Talks-搜索'});
};