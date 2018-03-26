var Dot_margin = {top: 10, right: 20, bottom: 30, left: 60},
	Dot_width = 500,
	Dot_height = 500;

var Dot_x = d3.scale.linear()
	.range([0, Dot_width]);

var Dot_y = d3.scale.linear()
	.range([Dot_height, 0]);

var Dot_r = d3.scale.pow()
	.range([0, 20])
	.domain([0, 1000]);

var Dot_xAxis = d3.svg.axis()
	.scale(Dot_x)
	.orient("bottom");

var Dot_yAxis = d3.svg.axis()
	.scale(Dot_y)
	.orient("left");

var Dot_svg = d3.select("body").append("svg")
	.style("position", "absolute")
	.style("float","left")
	.attr("id", "Dot_svg")
	.attr("width", Dot_width + Dot_margin.left + Dot_margin.right)
	.attr("height", Dot_height + Dot_margin.top + Dot_margin.bottom)
	.style("left", Heat_width + Heat_margin.left + Heat_margin.right + Dot_margin.left+"px")
	.style("top", Dot_margin.top+"px")
	.style("z-index","1")
	.append("g")
	.attr("transform", "translate(" + Dot_margin.left + "," + Dot_margin.top + ")");

var Dot_xdomain;
var Dot_ydomain;
//确定x轴定义域
Dot_xdomain = [0,99];
Dot_x.domain(Dot_xdomain);
//确定y轴定义域
Dot_ydomain = [0, 99];
Dot_y.domain(Dot_ydomain);

//创建x轴，以数据的时间为值
Dot_svg.append("g")
	.attr("class", "x Dot_axis")
	.attr("transform", "translate(0," + Dot_height + ")")
	.call(Dot_xAxis)
.append("text")
	.attr("class", "label")
	.attr("x", Dot_width)
	.attr("y", -6)
	.style("text-anchor", "end")
	.text("X");

//创建y轴，以数据的票房总收入为值
Dot_svg.append("g")
	.attr("class", "y Dot_axis")
	.call(Dot_yAxis)
.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Y");

//background
d3.select("body")
	.append("div")
	.attr("id", "Heat_back")
	.style("width","500px")
	.style("height","500px")
	.style("position", "absolute")
	.style("float","left")
	.style("left", Heat_width + Heat_margin.left + Heat_margin.right + Dot_margin.left + 60 +"px")
	.style("top", Dot_margin.top + 10 +"px")
	.style("background-image","url(\"img/Map.png\")")
	.style("z-index","0");


//tooltip
var Dot_tooldiv = d3.select("body")
	.append("div")
	.style("left", Heat_width+Heat_margin.left+ Heat_margin.right+Dot_margin.left+Dot_width/3+"px")
	.style("top", Dot_margin.top +100+"px")
	.style("opacity", 0)
	.style("z-index","2")
	.attr("class", "Dot_tooltip");
var Dot_toolp = Dot_tooldiv.append("p");
Dot_toolp.append("strong")
	.text("id: ");
Dot_toolp.append("span")
	.attr("id","id")
	.text(0);
var Dot_toolp = Dot_tooldiv.append("p");
Dot_toolp.append("strong")
	.text("Time: ");
Dot_toolp.append("span")
	.attr("id","Time")
	.text(0);
var Dot_toolp = Dot_tooldiv.append("p");
Dot_toolp.append("strong")
	.text("Stay: ");
Dot_toolp.append("span")
	.attr("id","Stay")
	.text(0);
var Dot_toolp = Dot_tooldiv.append("p");
Dot_toolp.append("strong")
	.text("Type: ");
Dot_toolp.append("span")
	.attr("id","Type")
	.text(0);
var Dot_toolp = Dot_tooldiv.append("p");
Dot_toolp.append("strong")
	.text("X: ");
Dot_toolp.append("span")
	.attr("id","X")
	.text(0);
var Dot_toolp = Dot_tooldiv.append("p");
Dot_toolp.append("strong")
	.text("Y: ");
Dot_toolp.append("span")
	.attr("id","Y")
	.text(0);
var Dot_tooltip = d3.select(".Dot_tooltip");

function Dot_chart(name){
	Heat_mask[name] = 1;
	d3.csv("data/dot/"+Heat_week+"/"+name+".csv", function(error, data) {
	// d3.csv("data/"+name+".csv", function(error, data) {
	if (error) throw error;
	Dot_svg.selectAll(".dot").remove();
	var k = 0;
	var v = new Array();
	data.forEach(function(d) {
		var t = d.Timestamp;
		var h = t.substring(0,2);
		var m = t.substring(2,4);
		var s = t.substring(4,6);
		v[k] = h*3600+m*60+s*1;
		k++;
	});
	v[k] = v[k-1];
	k = -1;
	data.forEach(function(d) {
		k++;
		Dot_svg.append("circle")
			.attr("class", "dot")
			.attr("r", function(){
				var vv = v[k+1]-v[k];
				if (Dot_r(vv)<1) return (Dot_r(vv)*10)
				return Dot_r(vv);
				// if (vv > 600) return 20;
				// if (vv > 300) return 10;
				// if (vv > 60) return vv / 10;
				// return 1;
			})
			.attr("cx",  Dot_x(d.X))
			.attr("cy", Dot_y(d.Y))
			.attr("fill", Heat_color[d.id])
			//鼠标相应函数，悬浮时改变颜色并显示标签
			.on("mouseover", function() {
				// d3.select(this)
				// .attr("r", 20);
				Dot_tooltip.style("opacity", 1)
					.select("#X")
					.text(d.X);
				Dot_tooltip.select("#Type")
					.text(d.type);
				Dot_tooltip.select("#Y")
					.text(d.Y);
				Dot_tooltip.select("#id")
					.text(d.id);
				var date = d.Timestamp;
				date = date.substring(0,2)+":"+date.substring(2,4)+":"+date.substring(4,6);
				Dot_tooltip.select("#Time")
					.text(date);
				var vv = d3.select(this).attr("r");
				if (vv/10<1) vv = vv/10;
				vv = Dot_r.invert(vv);
				var h = Math.floor(vv/3600);
				var m = Math.floor((vv-3600*h)/60);
				var s = Math.floor(vv - 3600*h - 60*m);
				Dot_tooltip.select("#Stay")
					.text(h+"h "+m+"m "+s+"s");

			})
			.on("mouseout", function() {
				//隐藏标签
				Dot_tooltip.style("opacity", 0)
			})
			.on("click",function(){
				d3.selectAll(".Heat_rect")
					.remove();
				heatmapInstance.setData(Heat_setdata);
				Heat_count = 0;
				Heat_object = new Object();
				// d3.selectAll(".Heat_dot")
				// 	.remove();
				var date = d.Timestamp;
				var h = date.substring(0,2);
				var m = date.substring(2,4);
				var s = date.substring(4,6);
				date = h*3600+m*60+s*1;
				date = date - 28800;
				var value = date/57600*Heat_width;
				HeatRun(value, d.id);
				Heat_v = value;
			});
	});
});

}

