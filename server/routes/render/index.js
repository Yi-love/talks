exports.index = async (ctx)=>{
  await ctx.render('main',{title:'Talks-首页'});
};