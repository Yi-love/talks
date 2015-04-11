function mytouch(obj , fn) {
	var self = obj;
	var startX , startY , endX , endY;
	var startTime;
	var starthandler = function(evt){
		startTime = new Date();
		endX = startX =  evt.touches[0].clientX;
		endY = startY =  evt.touches[0].clientY;
	};
	var movinghandler = function(evt){
		evt.preventDefault();
		endX = evt.changedTouches[0].clientX;
		endY = evt.changedTouches[0].clientY;
	};
	var endhandler = function(evt) {
		evt.preventDefault();
		var x = endX-startX;
		var y = endY-startY;
		var endTime = new Date() - startTime;
		if ( (x > -1 && x < 1 && y > -1 && y < 1 ) || (endTime > 100 &&endTime < 200 ) ) {
			fn();
		}
	}
	self.addEventListener('touchstart' , starthandler);
	self.addEventListener('touchmove' , movinghandler);
	self.addEventListener('touchend' , endhandler);
};
var fileUpload = function(){
	var self = this;
	this.onFileChange=function(obj,width,size) {
			window.URL = window.URL || window.webkitURL;
			var imagePath = document.getElementById("imagePath").value,
				iamgeShow = document.getElementById("imageShow"),
				imageErrorInfo = document.getElementById("imageErrorInfo");
			for ( var ig = 0 ; ig < obj.files.length ; ig++ ){	
				//获取文件类型
				var type = imagePath.substring(imagePath.lastIndexOf(".") + 1, imagePath.length).toLowerCase();
				//判断图片格式
				if(type!="jpg"&&type!="jpeg"&&type!="gif"&&type!="png"&&type!="bmp"){
					imageErrorInfo.innerHTML="请选择正确的图片格式！";
				}else if(obj.files[ig].size >= size){
					size = size/(1024*1024);
					imageErrorInfo.innerHTML="请上传小于"+size.toFixed(5)+"MB的图片！";
				}else{
					//清空div的内容
					imageErrorInfo.innerHTML="";
					var img = new Image();
					if(window.URL){
						  //创建一个object URL，并不是本地路径
						  img.src = window.URL.createObjectURL(obj.files[ig]);
						  img.name = ig;
						  img.onload = function(e) {
							 //图片加载后，释放object URL
							 window.URL.revokeObjectURL(this.src); 
						  };
						  mytouch(img ,function(e){
							  var thisParent = img.parentNode;
							  img.outerHTML='';
						  });
						  img.ondblclick = function(e){
							  var thisParent = this.parentNode;
							  this.outerHTML='';
						  };
						 iamgeShow.appendChild(img);
					}else if(window.FileReader){
						//opera Firefox webkit的浏览器
						var reader = new FileReader();
						reader.readAsDataURL(obj.files[ig]);
						reader.onload = function(e){
							img.src = this.result;
						};
						img.ondblclick = function(e){
							  var thisParent = this.parentNode;
							  this.outerHTML='';
						};
						mytouch(img ,function(e){
							  var thisParent = img.parentNode;
			
							  img.outerHTML='';
						});
						imageShow.appendChild(img);
					}else{
						//ie浏览器
						obj.select();
						obj.blur();
						//用IE滤镜获取选中的内容  读取文件路径
						var nfile = document.selection.createRange().text;
						//清空选中的内容
						document.selection.empty();
						img.src = nfile;
						img.onload=function(){
						};
						imageShow.appendChild(img);
					
					}
				}
			}
		};
};
