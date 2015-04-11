window.onload = function () {
	headexe();
	new Slider({
		dom: document.getElementById('swipe-box'),
		len: 5,
		box : document.getElementById('swipe-content'),
		bar : document.getElementById('scb')
	});
};

/*******************
 *
 *  图片滑动特效
 *
 */
function Slider(opts){
	this.wrap = opts.dom;//图片容器对象
	this.len = opts.len;//图片数量
	this.box = opts.box;//相对滑动的窗口
	this.bar = opts.bar;
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
Slider.prototype.init = function(){
	if ( typeof window.getComputedStyle != 'undefined') {//w3c
		this.scaleW =  parseInt(window.getComputedStyle(this.box , null)['width']);
	}
	else if ( typeof obj.currentStyle != 'undefined' ) {//ie
		this.scaleW  =  parseInt(this.box.currentStyle['width']);
	}
	this.idx = 0;
};

/******
 * 绑定图片滑动事件
 */
Slider.prototype.bindDOM = function (){
	var self = this;
	var scaleW = self.scaleW;
	var outer = this.wrap;
	var len = this.len;
	//手指按下
	var startHandler = function(evt) {
		self.startTime = new Date()*1;
		self.startX = evt.touches[0].pageX;
		self.offsetX = 0;
	};
	//手指移动
	var moveHandler = function(evt) {
		evt.preventDefault();
		self.offsetX = evt.targetTouches[0].pageX - self.startX;
		var transW = self.offsetX-self.idx*self.scaleW;
		mtransform(outer , 0 , transW);
		var scbw = self.offsetX*0.5;
		mtransform(self.bar , 0 , self.idx*self.scaleW/4-scbw);
	};
	//手指离开
	var endHandler = function(evt){
		var boundary = scaleW/6;
		var endTime = new Date() * 1;

		if ( endTime - self.startTime > 300 ) {
			if ( self.offsetX >= boundary ) {
				self.goIndex('-1');
			}else if ( self.offsetX < 0 && self.offsetX < -boundary ) {
				self.goIndex('+1');
			}else {
				self.goIndex('0');
			}
		}else{//快速切换
			if ( self.offsetX > 20 ) {
				self.goIndex('-1');
			}else if ( self.offsetX < -20 ) {
				self.goIndex('+1');
			}else {
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
Slider.prototype.goIndex = function(n){
	var idx = this.idx;
	var len = this.len;
	var outer = this.wrap;
	var cidx;
	/**********
		边界值检测
	**/
	if ( typeof n == 'number' ) {
		cidx = idx;
	}else if ( typeof n == 'string' ) {
		cidx = idx + n*1;
	}
	if ( cidx > len-1 ) {
		cidx = len - 1;
	} else if ( cidx < 0 ) {
		cidx = 0;
	}
	this.idx = cidx;
	var  transW = this.idx*this.scaleW;
	if (this.idx === 0 ){
		transW = 0;
	}else {
		if ( transW > this.scaleW*this.len )
			transW = this.scaleW*this.len;
		transW *= -1;
	}
	mtransform(this.bar , 0.2 , this.idx*this.scaleW/5);
	mtransform(outer ,0.2 , transW);
};

function mtransform(obj , time ,value){
	obj.style.webkitTransition = '-webkit-transform '+time+'s ease-out';
	obj.style.mozTransition = '-moz-transform '+time+'s ease-out';
	obj.style.oTransition = '-o-transform '+time+'s ease-out';
	obj.style.transition = 'transform '+time+'s ease-out';
	obj.style.webkitTransform = 'translate3d('+value+'px, 0, 0)';
	obj.style.mozTransform = 'translate3d('+value+'px, 0, 0)';
	obj.style.oTransform = 'translate3d('+value+'px, 0, 0)';
	obj.style.transform = 'translate3d('+value+'px, 0, 0)';
}