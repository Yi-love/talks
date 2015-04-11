function onFileChange(obj,size) {
	window.URL = window.URL || window.webkitURL;
	var files = obj.files;
	var imagePath = document.getElementById("imagePath").value,
		imageShow = document.getElementById("imageShow"),
		imageErrorInfo = document.getElementById("imageErrorInfo");
		
	//获取文件类型
	var type = imagePath.substring(imagePath.lastIndexOf(".") + 1, imagePath.length).toLowerCase();
	//判断图片格式
	if(type!="jpg"&&type!="jpeg"&&type!="gif"&&type!="png"&&type!="bmp"){
		imageErrorInfo.innerHTML="请选择正确的图片格式！";
	}else if(files.size >= size){
		size = size/(1024*1024);
		imageErrorInfo.innerHTML="请上传小于"+size.toFixed(5)+"MB的图片！";
	}else{
		//清空div的内容
		imageErrorInfo.innerHTML="";
		imageShow.innerHTML = "";
		var img = new Image();
		if(window.URL){
			//创建一个object URL，并不是本地路径
		    img.src = window.URL.createObjectURL(files[0]);
			img.name = files.name;
		    img.onload = function(e) {
			    //图片加载后，释放object URL
				window.URL.revokeObjectURL(img.src); 
			};
			imageShow.appendChild(img);
		}else if(window.FileReader){
			//opera Firefox webkit的浏览器
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e){
				img.src = reader.result;
			};
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
				 //alert(nfile+","+img.fileSize + " bytes");
			};
			imageShow.appendChild(img);
		}
	}
}