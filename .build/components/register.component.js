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
var register_service_1 = require("../services/register.service");
var register_user_model_1 = require("../models/register-user.model");
var RegisterComponent = (function () {
    function RegisterComponent(registerService, router) {
        this.registerService = registerService;
        this.router = router;
        this.user = new register_user_model_1.RegisterUser();
        this.hasUser = false;
        this.isSave = false;
        this.isCanSubmit = false;
        this.valids = { 'username': false, 'password': false, 'repassword': false };
        this.empty = { 'username': true, 'password': true, 'repassword': true };
        this.vaildFiled = ['username', 'password', 'repassword'];
    }
    RegisterComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    RegisterComponent.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.newUser) {
            return;
        }
        this.newUser = this.currentForm;
        if (this.newUser) {
            this.newUser.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    RegisterComponent.prototype.onValueChanged = function (data) {
        if (!this.newUser) {
            return;
        }
        var form = this.newUser.form;
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
                    if (filed === 'repassword') {
                        if (this.user['password'] !== this.user['repassword']) {
                            this.valids[filed] = false;
                        }
                        else {
                            this.valids[filed] = true;
                        }
                    }
                    else {
                        this.valids[filed] = true;
                    }
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
        if (this.hasUser) {
            return this.isCanSubmit = false;
        }
        return this.isCanSubmit = true;
    };
    RegisterComponent.prototype.onRestHasUser = function () {
        this.hasUser = false;
    };
    RegisterComponent.prototype.onCheckUserName = function () {
        var _this = this;
        this.isHasUser().then(function (hasUser) {
            if (hasUser) {
                _this.isCanSubmit = false;
                return Promise.reject('user is has.');
            }
        }).catch(this.clearError.bind(this));
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isHasUser().then(function (hasUser) {
            if (!hasUser) {
                _this.getSecretKey().then(function (res) {
                    if (res.rsecret) {
                        var source = JSON.stringify(_this.user);
                        var rsecret = res.rsecret;
                        var cipher = crypto.createCipher('aes-256-cbc', rsecret);
                        var cryped = cipher.update(source, 'utf8', 'hex');
                        cryped += cipher.final('hex');
                        // console.log('data:' , cryped , rsecret);
                        var userData = { 'username': _this.user['username'], secret: cryped };
                        return _this.signUp(userData).then(function (isSave) {
                            if (isSave) {
                                return _this.router.navigate(['/']);
                            }
                        }).catch(_this.clearError.bind(_this));
                        ;
                    }
                    return Promise.reject('rsecret is gone');
                }).catch(_this.clearError.bind(_this));
            }
            else {
                _this.isCanSubmit = false;
                return Promise.resolve('');
            }
        }).catch(this.clearError.bind(this));
    };
    RegisterComponent.prototype.isHasUser = function () {
        var _this = this;
        if (!this.user['username']) {
            return Promise.reject('username is undefined');
        }
        return this.registerService.isHasUserByuserName(this.user['username']).then(function (result) { return _this.hasUser = result['hasUser']; });
    };
    RegisterComponent.prototype.signUp = function (data) {
        var _this = this;
        return this.registerService.signUp(data).then(function (result) { return _this.isSave = result['isSave']; });
    };
    RegisterComponent.prototype.getSecretKey = function () {
        return this.registerService.getSecretRegisterKey();
    };
    RegisterComponent.prototype.clearError = function (error) {
        var _this = this;
        console.log('error:', error);
        clearTimeout(this.errorHandler);
        this.error = error;
        this.errorHandler = setTimeout(function () {
            _this.error = '';
        }, 4000);
    };
    return RegisterComponent;
}());
__decorate([
    core_1.ViewChild('newUser'),
    __metadata("design:type", forms_1.NgForm)
], RegisterComponent.prototype, "currentForm", void 0);
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register-app',
        templateUrl: 'template/register.html',
        styleUrls: ['css/register.css'],
    }),
    __metadata("design:paramtypes", [register_service_1.RegisterService,
        router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map