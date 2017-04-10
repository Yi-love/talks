'use strict';

class JsonResponse {
  constructor(ctx) {
    this.ctx = ctx;
  }

  success(data=[]) {
    this.ctx.set('Content-Type', 'application/json');
    this.ctx.body = JSON.stringify({
      code: 0,
      message: 'success',
      data: data
    });
  }

  error(code, message, data=[]) {
    this.ctx.set('Content-Type', 'application/json');
    if ( typeof code === 'string' && message === undefined ) {
      message = code;
      code = 1;
    }
    this.ctx.body = JSON.stringify({ code, message, data });
  }
}

module.exports = async function (cxt, next) {
  //处理json格式输出
  cxt.JsonResponse = new JsonResponse(cxt);
  await next();
};