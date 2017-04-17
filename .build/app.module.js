"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./components/app.component");
var index_component_1 = require("./components/index.component");
var login_component_1 = require("./components/login.component");
var register_component_1 = require("./components/register.component");
var user_index_component_1 = require("./components/user-index.component");
var user_component_1 = require("./components/user.component");
var swipe_directive_1 = require("./directives/swipe.directive");
var app_routing_module_1 = require("./app-routing.module");
var register_service_1 = require("./services/register.service");
var login_service_1 = require("./services/login.service");
var user_index_service_1 = require("./services/user-index.service");
var heart_service_1 = require("./services/heart.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [app_component_1.AppComponent,
            index_component_1.IndexComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            user_index_component_1.UserIndexComponent,
            user_component_1.UserComponent,
            swipe_directive_1.SwipeDirective
        ],
        providers: [register_service_1.RegisterService,
            login_service_1.LoginService,
            user_index_service_1.UserIndexService,
            heart_service_1.HeartService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map