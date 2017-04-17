"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var HttpService = (function () {
    function HttpService() {
    }
    HttpService.prototype.getResponse = function (res) {
        var result = res.json();
        if (+result.code !== 0) {
            return Promise.reject(result.message);
        }
        return Promise.resolve(result.data);
    };
    HttpService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    };
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map