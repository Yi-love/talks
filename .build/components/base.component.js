"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent = (function () {
    function BaseComponent(errorService) {
        this.errorService = errorService;
        this.error = '';
    }
    BaseComponent.prototype.clearError = function (error) {
        var _this = this;
        console.log('error:', error);
        clearTimeout(this.errorHandler);
        this.error = error;
        this.errorHandler = setTimeout(function () {
            _this.error = '';
        }, 4000);
        this.errorService.sendReport(JSON.stringify(error));
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map