d3.select("body")
	.append("div")
	.attr("id","Heat_slider")
	.style("left", Heat_margin.left + 8 + "px")
	.style("position", "absolute")
	.style("top", Heat_height + Heat_margin.top + Heat_margin.bottom + "px")
	.style("width", Heat_width + "px")
	.call(d3.slider()
		.min(0).max(Heat_width)
		.step(0.1)
		.on("slide", function(evt, value) {
			d3.select('#Slider_text')
				.text(Heat_format(Heat_slider_x.invert(value)))
				.style("left", value - 45 +"px");
		})
		.on("slideend", function(evt, value) {
			d3.selectAll(".Heat_rect").remove();
			heatmapInstance.setData(Heat_setdata);
			Heat_count = 0;
			for (var i = 0; i<=99; i++){
				for (var j = 0; j<=99; j++){
					Heat_va[i][j] = 0;
				}
			}
			// d3.selectAll(".Heat_dot").remove();

			HeatRun(value, 0);

			Heat_v = value;
		}));

d3.select("#Heat_slider")
	.append("text")
	.attr("id", "Slider_text")
	.style("position","relative")
	.style("color", "gray")
	.style("top", 20+"px");

var Heat_run = Heat_svg.append("g");
	
Heat_run.append("rect")
	.attr("class", "Heat_run")
	.attr("width", 50)
	.attr("height", 25)
	.attr("x", 20)
	.attr("y", Heat_margin.top -16)
	.on("click", function () {
		heatmapInstance.setData(Heat_setdata);
		HeatRun(Heat_v, 0);
	});

Heat_run.append("text")
	.attr("class", "Heat_run_text")
	.attr("width", 50)
	.attr("height", 25)
	.attr("x", 31)
	.attr("y",  Heat_margin.top )
	.text("Run");

function HeatRun(value, did){
	var Heat_format = d3.time.format("%H%M%S");
	for (var i = value*(57600/Heat_width); i <= (value+1.2)*(57600/Heat_width); i+=1){
		if (i > 57600) break;
		var k = i*Heat_width/57600.0;
		Heat_draw(Heat_format(Heat_slider_x.invert(k)), k, did);
	}
}

// Heat_redraw(55000);
function Heat_redraw(x){
	for (var i = x; i <= 57600; i+=1){
		var k = i*Heat_width/57600.0;
		var Heat_format = d3.time.format("%H%M%S");
		var name = Heat_format(Heat_slider_x.invert(k));
		Heat_draw(name, k);
	}
}