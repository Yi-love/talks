function clientW(){
	var winW = document.documentElement.clientWidth;
		winW = winW < 320 ? 320 : winW;
		winW = winW > 640 ? 640 : winW;
	return winW;
}

window.onload = function(){
    document.getElementById('go_back_main').addEventListener('click',function(){
    	document.getElementById('slider_box').style.visibility='hidden';
    });

    var heartindex = 0;
    $('.addmoreheart').on('click', function(){
    	$.get('/userindex/finheartplace/'+heartindex+'/2' , function(data){
    		console.log(data);
    		var heartlist = data.heartlist;
    		var temp = '';
    		if ( heartlist.length > 0 ){
    			for ( var i = 0  , len = heartlist.length ; i < len ; i++ ){
    				temp += '<li class="say-item"><div class="say-item-content"><div class="say-user"><div class="say-user-img-box"><div class="say-user-img"><img src="../'+heartlist[i].userimg+'" alt=""></div></div><div class="say-title"><h3><a href="/user/'+heartlist[i].userid+'">'+heartlist[i].nickname+'</a></h3><h6>'+heartlist[i].writetime+'</h6></div><span class="pushpin"><i class="icon-trashcan deleteheart" data-id="'+heartlist[i]._id+'"></i></span></div><a href="/userindex/heartinfo/'+heartlist[i]._id+'"><p class="article-content">'+heartlist[i].content+'</p></a><div class="article-img-box">';
    				var imgs = heartlist[i].writeimgs.split(',');
    				if ( imgs.length > 0 ){
    					temp += '<ul>';
    					for ( var j = 0 ; j < imgs.length ; j++ ){
    						temp += '<li><img src="../'+imgs[j]+'" alt=""></li>';
    					}
    					temp += '</ul>';
    				}
    				temp += temp += '</div></div><div class="say-item-local-icon"><div class="location"><i class="icon-compass">'+heartlist[i].location+'</i></div><div class="choice-icon"><span><i class="icon-share transmit" data-id="'+heartlist[i]._id+'">'+heartlist[i].transmit+'</i></a></span><span><a href="/userindex/heartinfo/'+heartlist[i]._id+'"><i class="icon-bubble3">'+heartlist[i].commentnum+'</i></a></span><span><i class="icon-like agree" data-id="'+heartlist[i]._id+'">'+heartlist[i].agree+'</i></a></span></div></div></li>';
    			}
    			heartindex ++;
    			$('.say-content').append(temp);
    		}
    		
    	});
    });

	$('.say-content').on('click' , function(evt){
		var target = evt.target || window.event.srcElement;
		if ( $(target).hasClass('transmit') && target.nodeName == 'I' ){
			var heartid = $(target).attr('data-id');
			$('.sendmessage').html('');
			$.ajax({
				type: "POST",
				url: "/userindex/transmit",
				data: "heartid="+heartid,
				success: function(msg){
					$(target).html(msg.num);
					$('.sendmessage').css({'display': 'block'});
					$('.sendmessage').html('转发成功！');
					setTimeout(function(){
					    $('.sendmessage').css({'display': 'none'});
					} , 3*1000);
				}
			});
		}else if ( $(target).hasClass('agree') && target.nodeName == 'I' ){
			var heartid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/userindex/agree",
				data: "heartid="+heartid,
				success: function(msg){
					$(target).html(msg.num);
				}
			});
		}else if ( $(target).hasClass('deleteheart') && target.nodeName == 'I' ){
			var heartid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/userindex/deleteheart",
				data: "heartid="+heartid,
				success: function(msg){
					$(target).parents('.say-item').css({'display': 'none'});
				}
			});
		}else if ( $(target).hasClass('collection') && target.nodeName == 'I' ){
			var heartid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/userindex/collection",
				data: "heartid="+heartid,
				success: function(msg){
					$(target).removeClass('collection').addClass('collectioned');
					$('.sendmessage').css({'display': 'block'});
					$('.sendmessage').html(msg.content);
					setTimeout(function(){
					    $('.sendmessage').css({'display': 'none'});
					} , 3*1000);
				}
			});
		}else if ( $(target).parents('.article-img-box') != null){
			var imgs = $(target).parents('.article-img-box').find('img');		
			if ( imgs.length < 1 ){
				return;
			}	
			var temp = '';
			for ( var i = 0 ; i < imgs.length ; i++){
			    temp += '<li><img src='+imgs[i].getAttribute('src')+'></li>';
			} 
            document.getElementById('slider_box').style.visibility='inherit';
			$('#slider').html(temp);
			preSlider(document.getElementById('slider'));
		}
	});
};


function resetW(obj){
	var self = obj;
	var winW = clientW();
	var winH = document.documentElement.clientHeight;
	for( var i = 0 , len = self.length ; i < len ; i++ ){
		self[i].style.width = winW+'px';
		var imgs = self[i].querySelector('img');
		var iw = imgs.width;
		var ih = imgs.height;
		
		var realw = parseInt((winW-winH*iw/ih)/2);//计算比例
		var realh = parseInt((winH-winW*ih/iw)/2);
		if ( ih/iw > 1.2 ) {
				imgs.style.height = winH+'px';
				imgs.style.paddingLeft = realw+'px';//图片很高
		}else {
				imgs.style.width = winW+'px';
				imgs.style.paddingTop = realh+'px';//图片很宽
		}
	}
}

var sliderall = null;
function preSlider(obj){
	var self = obj;
	var lis = self.querySelectorAll('li');
	var w = clientW()*lis.length;
	self.style.width = w+'px';
	resetW(lis);
	if ( sliderall == null ){
		sliderall = new  Slider({
			dom :  self,
			len : lis.length,
			pre : 0,
			box : document.getElementById('slider_box'),
			num :document.getElementById('index_num')
		});
	}else{
		sliderall.len = lis.length;
		sliderall.init();
	}
	
}
/*******************
 *
 *  图片滑动特效
 *
 */
function Slider(opts){
	this.wrap = opts.dom;//图片容器对象
	this.len = opts.len;//图片数量
	this.pre= opts.pre;//左右俩边空缺占比（单个）
	this.box = opts.box;//相对滑动的窗口
	this.num = opts.num;
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
	this.num.innerHTML = this.idx+1+'/'+this.len;
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
		var target = evt.target;
		while(target.nodeName != 'UL' && target.nodeName != 'BODY'){
			target = target.parentNode;
		}
		self.target = target;
	};
	//手指移动
	var moveHandler = function(evt) {
		evt.preventDefault();
		self.offsetX = (evt.targetTouches[0].pageX - self.startX)+self.scaleW*self.pre;
		
		outer.style.webkitTransition = '-webkit-transform 0s ease-out';
		var transW = parseInt(self.offsetX-self.idx*self.scaleW*(1-self.pre*2));
		outer.style.webkitTransform = 'translate3d('+ transW +'px, 0, 0)';
		outer.style.mozTransform = 'translate3d('+ transW +'px, 0, 0)';
		outer.style.oTransform = 'translate3d('+ transW +'px, 0, 0)';
		outer.style.transform = 'translate3d('+ transW +'px, 0, 0)';
	};
	//手指离开
	var endHandler = function(evt){
		var boundary = scaleW/6;
		var endTime = new Date() * 1;
		//手指滑动
		var num_now = parseInt(self.num.innerHTML);
		if ( endTime - self.startTime > 300 ) {
			if ( self.offsetX >= boundary ) {
				self.goIndex('-1');
				if (num_now > 1 )
					self.num.innerHTML = num_now-1+'/'+self.len;
			}else if ( self.offsetX < 0 && self.offsetX < -boundary ) {
				self.goIndex('+1');
				if ( num_now < len )
					self.num.innerHTML = num_now+1+'/'+self.len;
			}else {
				self.goIndex('0');
			}
		}else{//快速切换
			if ( self.offsetX > 20 ) {
				self.goIndex('-1');
				if (num_now > 1 )
					self.num.innerHTML = num_now-1+'/'+self.len;
			}else if ( self.offsetX < -20 ) {
				self.goIndex('+1');
				if ( num_now < len )
					self.num.innerHTML = num_now+1+'/'+self.len;
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
	outer.style.webkitTransition = '-webkit-transform 0.2s ease-out';
	outer.style.mozTransition = '-moz-transform 0.2s ease-out';
	outer.style.oTransition = '-o-transform 0.2s ease-out';
	outer.style.transition = 'transform 0.2s ease-out';
	var  transW = (this.idx*this.scaleW*(1-this.pre*2));
	if (this.idx === 0 ){
		transW = this.scaleW*this.pre;
		transW = parseInt(transW);
		outer.style.webkitTransform = 'translate3d('+transW+'px, 0, 0)';
		outer.style.mozTransform = 'translate3d('+transW+'px, 0, 0)';
		outer.style.oTransform = 'translate3d('+transW+'px, 0, 0)';
		outer.style.transform = 'translate3d('+transW+'px, 0, 0)';
	}else {
		transW -= this.scaleW*this.pre;
		transW = parseInt(transW);
		outer.style.webkitTransform = 'translate3d(-'+transW+'px, 0, 0)';
		outer.style.mozTransform = 'translate3d(-'+transW+'px, 0, 0)';
		outer.style.oTransform = 'translate3d(-'+transW+'px, 0, 0)';
		outer.style.transform = 'translate3d(-'+transW+'px, 0, 0)';
	}
};