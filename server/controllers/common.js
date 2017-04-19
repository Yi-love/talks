'use strict';

exports.index = async (ctx)=>{
  await ctx.render('main',{title:'Talks - Talk with us'});
};