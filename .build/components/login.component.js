"use strict";
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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var crypto = require("crypto");
var login_service_1 = require("../services/login.service");
var user_model_1 = require("../models/user.model");
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.user = new user_model_1.User();
        this.valids = { 'username': false, 'password': false };
        this.empty = { 'username': true, 'password': true };
        this.isCanSubmit = false;
        this.isSignIn = false;
        this.error = '';
    }
    LoginComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    LoginComponent.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.loginUser) {
            return;
        }
        this.loginUser = this.currentForm;
        if (this.loginUser) {
            this.loginUser.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    LoginComponent.prototype.onValueChanged = function (data) {
        if (!this.loginUser) {
            return;
        }
        var form = this.loginUser.form;
        for (var filed in this.valids) {
            var control = form.get(filed);
            if (control && control.dirty) {
                if (!control.valid) {
                    this.valids[filed] = false;
                    if (this.user[filed] === '') {
                        this.empty[filed] = true;
                    }
                    else {
                        this.empty[filed] = false;
                    }
                }
                else {
                    this.valids[filed] = true;
                    this.empty[filed] = false;
                }
            }
        }
        ;
        for (var filed in this.valids) {
            if (!this.valids[filed]) {
                return this.isCanSubmit = false;
            }
        }
        for (var filed in this.empty) {
            if (this.empty[filed]) {
                return this.isCanSubmit = false;
            }
        }
        return this.isCanSubmit = true;
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.getSecretKey().then(function (res) {
            if (res.lsecret) {
                var source = JSON.stringify(_this.user);
                var lsecret = res.lsecret;
                var cipher = crypto.createCipher('aes-256-cbc', lsecret);
                var cryped = cipher.update(source, 'utf8', 'hex');
                cryped += cipher.final('hex');
                // console.log('data:' , cryped , lsecret);
                var userData = { 'username': _this.user['username'], secret: cryped };
                return _this.signIn(userData).then(function (result) {
                    if (result.isSignIn) {
                        _this.isSignIn = true;
                        return _this.router.navigate(['/userIndex', result.uid]);
                    }
                    else {
                        _this.isCanSubmit = false;
                        return Promise.reject('login error');
                    }
                }).catch(_this.clearError.bind(_this));
            }
            return Promise.reject('lsecret is gone');
        }).catch(this.clearError.bind(this));
    };
    LoginComponent.prototype.signIn = function (data) {
        return this.loginService.signIn(data);
    };
    LoginComponent.prototype.getSecretKey = function () {
        return this.loginService.getSecretLoginKey();
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild('loginUser'),
    __metadata("design:type", forms_1.NgForm)
], LoginComponent.prototype, "currentForm", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-app',
        templateUrl: 'template/login.html',
        styleUrls: ['css/login.css'],
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map