window.onload = function(){
	var width = document.body.clientWidth < 320 ? 320 : document.body.clientWidth;
	    width = document.body.clientWidth > 640 ? 640 : document.body.clientWidth;
	width = width*0.8;
	var height = width;
	var userdata;
	var  pvdata;
	var  heartdata;
	var  photodata;
	$.get("/admin/adminindex" ,  function(data){
		var online = parseInt(data.online);
		var man = parseInt(data.man);
		var usercount = parseInt(data.usercount);
		var heartcount = parseInt(data.heartcount);
		var heartfreezecount = parseInt(data.heartfreezecount);
		var photocount = parseInt(data.photocount);
		var photofreezecount = parseInt(data.photofreezecount);
		// console.log(data);
		userdata = [man , usercount-man];
		pvdata = [online ,usercount-online];
		heartdata = [heartfreezecount , heartcount-heartfreezecount];
		photodata = [photofreezecount , photocount-photofreezecount];
		drawnow();
	});

	function drawnow(){
		var usersvg = document.getElementById('all-user');
		var agesvg = document.getElementById('user-age');
		var  pvsvg = document.getElementById('all-pv');
		var  heartsvg = document.getElementById('all-heart');
		var  photosvg = document.getElementById('all-photo');
		var photodatatext = ['未冻结'+(photodata[0])+'册' , '冻结'+(photodata[1])+'册'];
		var heartdatatext = ['未冻结'+(heartdata[0])+'篇' , '冻结'+(heartdata[1])+'篇'];
		var pvdatatext = ['在线'+(pvdata[0])+'人' , '不在线'+(pvdata[1])+'人'];
		var userdatatext = ['男'+(userdata[0])+'人' , '女'+(userdata[1])+'人'];
		var usercount = userdata[0]+userdata[1];
		var agedata = [parseInt(usercount/2),parseInt(usercount/4),parseInt(usercount/8),parseInt(usercount/16)];
		var agedatatext = ['18-22岁：'+((usercount/2)/usercount*100)+'%','23-30岁：'+((usercount/4)/usercount*100)+'%','31-35岁：'+((usercount/8)/usercount*100)+'%','35岁以上：'+((usercount/16)/usercount*100)+'%'];
		new Pie(photosvg , photodata , photodatatext);
		new Pie(heartsvg , heartdata ,heartdatatext );
		new Pie(pvsvg , pvdata , pvdatatext);
		new Pie(usersvg , userdata ,userdatatext);
		new Pie(agesvg , agedata ,agedatatext);
		// 生成SVG
		function Pie(obj , data , dtext){
			var textdata = dtext;
			var svg = d3.select(obj)
				        .append("svg")
				        .attr("width",width)
				        .attr("height",height);
			
			var pie = d3.layout.pie();
			
			var outerRadius = width / 2;
			var innerRadius = width / 4;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);
			var color = d3.scale.category10();
			var mytext = function(i){
				return textdata[i];
			}
			// var color = function(i){
			// 	return '#'+(Math.random()*0xffffff<<0).toString(16);
			// };
			var arcs = svg.selectAll("g")
				          .data(pie(data))
						  .enter()
						  .append("g")
						  .attr("transform","translate("+outerRadius+","+outerRadius+")");
			arcs.append("path")
				.attr("fill",function(d,i){
					return color(i);
				})
				.attr("d",function(d){
					return arc(d);
				});
			
			arcs.append("text")
				.attr("transform",function(d){
					return "translate(" + arc.centroid(d) + ")";
				})
				.attr("text-anchor","middle")
				.text(function(d , i){
					return mytext(i);
				});
		}
	}
};
