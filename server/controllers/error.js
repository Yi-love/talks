exports.report = async (ctx)=>{
    console.log('error report: ' , ctx.query.reason);
    return ctx.JsonResponse.success({});
}