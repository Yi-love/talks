"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var http_service_1 = require("./http.service");
var RegisterService = (function (_super) {
    __extends(RegisterService, _super);
    function RegisterService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.checkUserByuserNameUrl = '/api/register/checkUserByuserName';
        _this.signupUrl = '/api/signup';
        _this.getSecretRegisterKeyUrl = '/api/register/secretRegisterKey';
        return _this;
    }
    RegisterService.prototype.isHasUserByuserName = function (username) {
        var params = new http_1.URLSearchParams("username=" + username);
        var options = new http_1.RequestOptions({ search: params });
        return this.http.get(this.checkUserByuserNameUrl, options)
            .toPromise()
            .then(this.getResponse);
        // .catch(this.handleError);
    };
    RegisterService.prototype.signUp = function (data) {
        if (!data) {
            return Promise.reject('no user');
        }
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.signupUrl, { data: data }, options)
            .toPromise()
            .then(this.getResponse);
        // .catch(this.handleError);
    };
    RegisterService.prototype.getSecretRegisterKey = function () {
        return this.http.get(this.getSecretRegisterKeyUrl)
            .toPromise()
            .then(this.getResponse);
    };
    return RegisterService;
}(http_service_1.HttpService));
RegisterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map