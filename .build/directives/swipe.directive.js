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
var SwipeDirective = (function () {
    function SwipeDirective(elemt) {
        this.elemt = elemt;
    }
    SwipeDirective.prototype.ngOnInit = function () {
        var self = this.elemt.nativeElement;
        if (this.imgsLen > 1) {
            this.slider = new Slider(self.querySelector(this.swipeList), this.imgsLen, 0, self, self.querySelector(this.swipeText));
        }
    };
    return SwipeDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SwipeDirective.prototype, "imgsLen", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SwipeDirective.prototype, "swipeList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SwipeDirective.prototype, "swipeText", void 0);
SwipeDirective = __decorate([
    core_1.Directive({
        selector: '[swipe]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SwipeDirective);
exports.SwipeDirective = SwipeDirective;
/*******************
 *
 *  图片滑动特效
 *
 */
var Slider = (function () {
    function Slider(wrap, len, pre, box, num) {
        this.wrap = wrap;
        this.len = len;
        this.pre = pre;
        this.box = box;
        this.num = num;
        //初始化容器
        this.init();
        //绑定事件
        this.bindDOM();
        //初始化位置
        this.goIndex(0);
    }
    /*********
   * 初始化滑动特效容器
   */
    Slider.prototype.init = function () {
        if (typeof window.getComputedStyle != 'undefined') {
            this.scaleW = parseInt(window.getComputedStyle(this.box, null)['width']);
        }
        this.idx = 0;
        // console.log(this.num , this.wrap);
        this.num.innerHTML = this.idx + 1 + '/' + this.len;
    };
    /******
   * 绑定图片滑动事件
   */
    Slider.prototype.bindDOM = function () {
        var self = this;
        var scaleW = self.scaleW;
        var outer = this.wrap;
        var len = this.len;
        //手指按下
        var startHandler = function (evt) {
            self.startTime = Date.now();
            self.startX = evt.touches[0].pageX;
            self.offsetX = 0;
            var target = evt.target;
            while (target !== outer && target.nodeName != 'BODY') {
                target = target.parentNode;
            }
            self.target = target;
        };
        //手指移动
        var moveHandler = function (evt) {
            evt.preventDefault();
            self.offsetX = (evt.targetTouches[0].pageX - self.startX) + self.scaleW * self.pre;
            outer.style.webkitTransition = '-webkit-transform 0s ease-out';
            var transW = self.offsetX - self.idx * self.scaleW * (1 - self.pre * 2);
            outer.style.webkitTransform = 'translate3d(' + transW + 'px, 0, 0)';
            outer.style.transform = 'translate3d(' + transW + 'px, 0, 0)';
        };
        //手指离开
        var endHandler = function (evt) {
            var boundary = scaleW / 6;
            var endTime = Date.now();
            //手指滑动
            var num_now = self.idx + 1;
            // console.log(self.num , self.idx);
            if (endTime - self.startTime > 300) {
                if (self.offsetX >= boundary) {
                    self.goIndex('-1');
                    if (num_now > 1)
                        self.num.innerHTML = num_now - 1 + '/' + self.len;
                }
                else if (self.offsetX < 0 && self.offsetX < -boundary) {
                    self.goIndex('+1');
                    if (num_now < len)
                        self.num.innerHTML = num_now + 1 + '/' + self.len;
                }
                else {
                    self.goIndex('0');
                }
            }
            else {
                if (self.offsetX > 20) {
                    self.goIndex('-1');
                    if (num_now > 1)
                        self.num.innerHTML = num_now - 1 + '/' + self.len;
                }
                else if (self.offsetX < -20) {
                    self.goIndex('+1');
                    if (num_now < len)
                        self.num.innerHTML = num_now + 1 + '/' + self.len;
                }
                else {
                    self.goIndex('0');
                }
            }
        };
        outer.addEventListener('touchstart', startHandler);
        outer.addEventListener('touchmove', moveHandler);
        outer.addEventListener('touchend', endHandler);
    };
    /****************
      图片滑动动作
    */
    Slider.prototype.goIndex = function (n) {
        var idx = this.idx;
        var len = this.len;
        var outer = this.wrap;
        var cidx;
        /**********
          边界值检测
        **/
        if (typeof n == 'number') {
            cidx = idx;
        }
        else if (typeof n == 'string') {
            cidx = idx + (+n);
        }
        if (cidx > len - 1) {
            cidx = len - 1;
        }
        else if (cidx < 0) {
            cidx = 0;
        }
        this.idx = cidx;
        outer.style.webkitTransition = '-webkit-transform 0.2s ease-out';
        outer.style.transition = 'transform 0.2s ease-out';
        var transW = (this.idx * this.scaleW * (1 - this.pre * 2));
        var dir = this.idx === 0 ? 1 : -1;
        if (this.idx === 0) {
            transW = this.scaleW * this.pre;
        }
        else {
            transW -= this.scaleW * this.pre;
        }
        outer.style.webkitTransform = 'translate3d(' + transW * dir + 'px, 0, 0)';
        outer.style.transform = 'translate3d(' + transW * dir + 'px, 0, 0)';
    };
    ;
    return Slider;
}());
//# sourceMappingURL=swipe.directive.js.map