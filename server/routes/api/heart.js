const Heart = require('./../../models/heart');

exports.hearts = async (ctx)=>{
   let hearts = await Heart.find();

  if ( hearts instanceof Error ) {
    return ctx.JsonResponse.error('get hearts error');
  }else if ( Array.isArray(hearts) ) {}{
    return ctx.JsonResponse.success({hearts});
  }
  return ctx.JsonResponse.error('error i don\'t no');
}