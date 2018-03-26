var path="data/stream/Fri.csv"

var width = 960,
    height = 50;
var svgT = d3.select("body").append("svg")
    .attr("class",".all")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class","ma")
    .attr("transform","translate(0,0)")

svgT.append("line")
    .attr("class","MyTime")
    .attr("transform","translate(0,0)")
    .style("fill","none")
    .style("stroke-width",4)
    .style("stroke","rgb(255,195,183)")
    .style("stroke-opacity",0.7)
    .attr("x1",50)  
    .attr("y1",35)  
    .attr("x2",350)  
    .attr("y2",35) ;

  var context=["Fri.","Sat.","Sun."]
  var conpath=["data\\stream\\Fri.csv","data\\stream\\Sat.csv","data\\stream\\Sun.csv"]
  svgT.selectAll("circle")
      .data(context)
      .enter()
      .append("circle")
      .attr("transform","translate(0,0)")
      .attr("cx", function(d,i){ return(50+i*150)})
      .attr("cy", 35)
      .attr("r",9)
      .attr("fill", "rgb(255,195,183)")
      .on("click",function(d,i){ 
        path=conpath[i];
        d3.select(".main").remove();
        drawall(path)
        console.log(conpath[i])
      })
  for(var i=0;i<3;i++){
  svgT.append("text")
      .attr("class","MyAT1")
      .attr("transform","translate(0,0)")
      .attr("x",50+i*150+8)
      .attr("y",32)	
      .text(context[i])
  
}



drawall(path)
function drawall(path){

d3.csv(path,function(error,csvdata){       
    var str = d3.csv.format( csvdata ); 
    var tl=[],ec=[],kl=[],wl=[],ca=[]         
    console.log(csvdata.length)
    csvdata.forEach(function(e,i)
    {
      tl[i]=e.tl
      ec[i]=e.ec
      kl[i]=e.kl
      wl[i]=e.wl
      ca[i]=e.ca  
    })
    stack = d3.layout.stack().offset("wiggle")
    function tomap(arr){return arr.map(function(d, i) { return {x: i, y: Math.max(0, d)}; })}
    dataset=[tomap(tl),tomap(ec),tomap(kl),tomap(wl),tomap(ca)]
   layers0 = stack(dataset)

var n = 5, // number of layers
    m = 150 // number of samples per layer
    color1=["rgb(180,200,224)","rgb(215,214,232)","rgb(245,240,200)","rgb(205,238,202)","rgb(247,200,200)"]
var width = 960,
    height = 500;
//比例尺
var x = d3.scale.linear()
    .domain([0, m - 1])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, d3.max(layers0.concat(layers0), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
    .range([460, 0]);

var area = d3.svg.area()
    .interpolate("cardinal") 
    .x(function(d) { return x(d.x); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); })					
var area2 = d3.svg.area()
    .interpolate("cardinal") 
    .x(function(d) { return x(d.x); })
    .y0(function(d) { return y(d.y0+10); })
    .y1(function(d) { return y(d.y0 + d.y+10); })
    
var xScale = d3.scale.ordinal()
		.domain(16)
		.rangeRoundBands([0,500]);  
			
var svg = d3.select("body").append("svg")
    .attr("class","main")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class","maing")
    .attr("transform","translate(0,0)")
var svg1=d3.select(".main").append("svg")
    .attr("class","axis")
	  .attr("width", width)
	  .attr("height", height)
	  .append("g")
	  .attr("transform", "translate(0,0)");
    
var apath=svg.selectAll("path")
    .data(layers0)
    .enter().append("path")
    .attr("transform", "translate(0,0)")
    .attr("d", area)
    .attr("class", function(d,i){return "path"+i})
    .style("fill", function(d,i) { return color1[i];})
    .on("mouseover", function(){
      d3.select(".path4")
       .transition()
		   .duration(1000)
		   .attr("transform","translate(0,-10)")
      d3.select(".path3")
       .transition()
		   .duration(1000)
		   .attr("transform","translate(0,-5)")
      d3.select(".path1")
       .transition()
		   .duration(1000)
		   .attr("transform","translate(0,5)")
      d3.select(".path0")
       .transition()
		   .duration(1000)
		   .attr("transform","translate(0,10)")
    })
    .on("mouseout", function(){
      d3.select(".path0")
       .transition()
		   .duration(1000)
		   .attr("transform","translate(0,0)")
      d3.select(".path1")
        .transition()
		   .duration(1000)
		   .attr("transform","translate(0,0)")
      d3.select(".path3")
        .transition()
		   .duration(1000)
		   .attr("transform","translate(0,0)")
      d3.select(".path4")
      .transition()
		   .duration(1000)
		   .attr("transform","translate(0,0)")
    })
    
    drawsvg1();
    
function drawsvg1(){
        
    var drag = d3.behavior.drag()
			.on("drag", dragmove);
		function dragmove() {	
      var pos=d3.event.x-300;
      if(pos<0){pos=0;} if(pos>408){pos=408;}
			d3.select(this)
			  .attr("x", pos)
        .attr("fill", "rgb(255,255,102)")
      d3.select(".Middle1")
        .attr("x1", pos+39)
        .attr("x2", pos+39)
      d3.select(".maing")
        .attr("transform","translate("+(-1*pos*12.4)+",0)")
		}	 
      
    svg1.append("line")
    .attr("class","MyTime")
    .attr("transform","translate(230,480)")
    .style("fill","none")
    .style("stroke-width",3)
    .style("stroke","rgb(65,200,160)")
    .style("stroke-opacity",1)
    .attr("x1",0)  
    .attr("y1",0)  
    .attr("x2",500)  
    .attr("y2",0) ;	
    
    for(var i=0;i<17;i++)
    {
      svg1.append("line")
      .attr("class","MyTime")
      .attr("transform","translate(230,480)")
      .style("fill","none")
      .style("stroke-width",function(){if((i%4)==0){return 2}else {return 1}})
      .style("stroke","rgb(65,200,160)")
      .style("stroke-opacity",1)
      .attr("x1",500-i*(500/16))  
      .attr("y1",0)  
      .attr("x2",500-i*(500/16))  
      .attr("y2",function(){if((i%4)==0){return 12}else {return 10}}) ;
      if((i%4)==0){
      svg1.append("text")
      .attr("class","MyAT")
      .attr("transform","translate(230,480)")
      .attr("x",i*(500/16)+2)
      .attr("y",15)	
      .text(i+8)}
    }
    
    svg1.append("line")
    .attr("class","Middle")
    .attr("transform","translate(0,0)")
    .style("fill","none")
    .style("stroke-width",1)
    .style("stroke","rgb(255,195,183)")
    .style("stroke-opacity",1)
    .attr("x1",480)  
    .attr("y1",20)  
    .attr("x2",480)  
    .attr("y2",460) ;	
   
    svg1.append("line")
    .attr("class","More")
    .attr("transform","translate(237,480)")
    .style("fill","none")
    .style("stroke-width",2)
    .style("stroke","rgb(255,133,133)")
    .style("stroke-opacity",1)
    .attr("x1",94)  
    .attr("y1",-13)  
    .attr("x2",94)  
    .attr("y2",13) ;
    	
    svg1.append("line")
    .attr("class","More")
    .attr("transform","translate(237,480)")
    .style("fill","none")
    .style("stroke-width",2)
    .style("stroke","rgb(255,133,133)")
    .style("stroke-opacity",1)
    .attr("x1",249)  
    .attr("y1",13)  
    .attr("x2",249)  
    .attr("y2",-13) ;	
    
    svg1.append("line")
    .attr("class","Middle1")
    .attr("transform","translate(237,480)")
    .style("fill","none")
    .style("stroke-width",1)
    .style("stroke","rgb(65,200,160)")
    .style("stroke-opacity",0.8)
    .attr("x1",39)  
    .attr("y1",-13)  
    .attr("x2",39)  
    .attr("y2",13) ;
    
    svg1.append("circle")
      .attr("class","MyTime")
      .attr("transform","translate(230,480)")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r",7)
      .attr("fill", "rgb(65,200,160)")
    svg1.append("circle")
      .attr("class","MyTime")
      .attr("transform","translate(230,480)")
      .attr("cx", 500)
      .attr("cy", 0)
      .attr("r",7)
      .attr("fill", "rgb(65,200,160)")
    svg1.append("rect")
		.attr("class","dragrect")
		.attr("transform","translate(237,480)")
		.attr("x", 0 )
		.attr("y", -10 )
		.style("opacity",0.5)
		.attr("width",78)
		.attr("height",20)
		.attr("fill","rgb(255,195,183)")
		.on("mouseover",function(){
        d3.select(this)
          .attr("fill", "rgb(255,255,102)")
        })
		.on("mouseout",function(){
        d3.select(this)
          .attr("fill", "rgb(255,195,183)")
        })
       .call(drag); 
    var words=["Tundra Land","Entry Corridor","Kiddie Land","Wet Land","Coster Alley"]
    for(var i=0;i<5;i++){
      svg1.append("rect")
      .attr("class","tuli")
      .attr("transform","translate(15,15)")
      .attr("x", 5 )
      .attr("y", 17*i )
      .style("opacity",1)
      .attr("width",20)
      .attr("height",13)
      .attr("fill",color1[i])
      svg1.append("text")
      .attr("class","tuli")
      .attr("transform","translate(15,15)")
      .attr("x", 5+25 )
      .attr("y", 17*i+10 )
      .style("opacity",1)
      .attr("fill","rgb(65,200,160)")
      .text(words[i])
    }   
 }    
});
}