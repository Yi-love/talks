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
var router_1 = require("@angular/router");
var user_index_service_1 = require("../services/user-index.service");
var heart_service_1 = require("../services/heart.service");
var user_info_model_1 = require("../models/user-info.model");
var UserIndexComponent = (function () {
    function UserIndexComponent(userIndexService, route, heartService) {
        this.userIndexService = userIndexService;
        this.route = route;
        this.heartService = heartService;
        this.user = new user_info_model_1.UserInfo();
        this.hearts = [];
        this.error = '';
        this.showMenu = false;
    }
    UserIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) { return _this.userIndexService.getUserInfo(params['uid'])
            .then(function (result) { return _this.user = result['user']; }, _this.clearError.bind(_this)); });
        this.getHearts();
    };
    UserIndexComponent.prototype.clearError = function (error) {
        var _this = this;
        console.log('error:', error);
        clearTimeout(this.errorHandler);
        this.error = error;
        this.errorHandler = setTimeout(function () {
            _this.error = '';
        }, 4000);
    };
    UserIndexComponent.prototype.onSelectMenu = function () {
        this.showMenu = !this.showMenu;
    };
    UserIndexComponent.prototype.getHearts = function () {
        var _this = this;
        return this.heartService.getHearts().then(function (result) { return _this.hearts = result['hearts']; }, this.clearError.bind(this));
    };
    UserIndexComponent.prototype.sendMessage = function () {
    };
    UserIndexComponent.prototype.sendHeart = function () {
    };
    return UserIndexComponent;
}());
UserIndexComponent = __decorate([
    core_1.Component({
        selector: 'user-index-app',
        templateUrl: 'template/user-index.html',
        styleUrls: ['css/user-index.css'],
    }),
    __metadata("design:paramtypes", [user_index_service_1.UserIndexService,
        router_1.ActivatedRoute,
        heart_service_1.HeartService])
], UserIndexComponent);
exports.UserIndexComponent = UserIndexComponent;
//# sourceMappingURL=user-index.component.js.map