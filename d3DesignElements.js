// General use variables
var sw = screen.width;
    sh = screen.height;

// Variables for circles
var cx = sw/2;
var cy = (sh/2) - (sw * 0.026);
var CCRadius = sw * 0.1; // CC stands for Centre Circle

// Variables for central circle mask
var farLeft = farRight = maskTop = maskBottom = CCRadius
    , xCentreOffset = sw * 0.04583
    , yCentreOffset = sw * 0.02604

// Variables for arcs, arcOuter,
var arcInner = arcOuter = startAngle = endAngle = 0
    , arcColor = "#08afff"
    , arcGap = sw * 0.0026
    , arcWidth = sw * 0.03125
    , arcOuter = CCRadius
    , arcCornerRadius = sw * 0.015625
    , tau = 2 * Math.PI
    , angle1 = 10
    , angle2 = -3
    , angle3 = 6
    , angle4 = -8
    , isMoved = false;

//Code to create a spinning arc
/****** Create an object array out of the four arcs below *************
********* and access each one to reduce code below *******************/
var arc1 = d3.arc()
        .startAngle(function(d){ return startAngle = Math.random() * tau; })
        .endAngle(function(d){return endAngle = startAngle + (.3 + Math.random()) * tau / 2; })
        .innerRadius(function(d){ return arcInner = (arcOuter + arcGap); })
        .outerRadius(function(d){ return arcOuter = (arcInner + arcWidth); })
        .cornerRadius(30);

var arc2 = d3.arc()
        .startAngle(function(d){ return startAngle = Math.random() * tau; })
        .endAngle(function(d){return endAngle = startAngle + (.3 + Math.random()) * tau / 2; })
        .innerRadius(function(d){ return arcInner = (arcOuter + arcGap); })
        .outerRadius(function(d){ return arcOuter = (arcInner + arcWidth); })
        .cornerRadius(30);

var arc3 = d3.arc()
        .startAngle(function(d){ return startAngle = Math.random() * tau; })
        .endAngle(function(d){return endAngle = startAngle + (.3 + Math.random()) * tau / 2; })
        .innerRadius(function(d){ return arcInner = (arcOuter + arcGap); })
        .outerRadius(function(d){ return arcOuter = (arcInner + arcWidth); })
        .cornerRadius(30);

var arc4 = d3.arc()
        .startAngle(function(d){ return startAngle = Math.random() * tau; })
        .endAngle(function(d){return endAngle = startAngle + (.3 + Math.random()) * tau / 2; })
        .innerRadius(function(d){ return arcInner = (arcOuter + arcGap); })
        .outerRadius(function(d){ return arcOuter = (arcInner + arcWidth); })
        .cornerRadius(30);

var svg = d3.select("body").append("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height"),
			g = svg.append("g").attr("transform", "translate(" + cx + ", " + cy + ")");

//Find a way to reduce this code into one function
var arc1 = g.append("path")
    .style("fill", arcColor)
    .style("opacity", .4)
    .attr("d", arc1);

var arc2 = g.append("path")
    .style("fill", arcColor)
    .style("opacity", .4)
    .attr("d", arc2);

var arc3 = g.append("path")
    .style("fill", arcColor)
    .style("opacity", .4)
    .attr("d", arc3);

var arc4 = g.append("path")
    .style("fill", arcColor)
    .style("opacity", .4)
    .attr("d", arc4);

// Find a way to reduce this code into one function
d3.interval(function() {
    arc1.transition()
    .duration(3)
    .attr("transform", "rotate(" + angle1 + ",0,0)")
    return angle1 += 1.5;
    }, 3);

d3.interval(function() {
    arc2.transition()
    .duration(3)
    .attr("transform", "rotate(" + angle2 + ",0,0)")
    return angle2 -= 2.5;
    }, 3);

d3.interval(function() {
    arc3.transition()
    .duration(3)
    .attr("transform", "rotate(" + angle3 + ",0,0)")
    return angle3 += 3.8;
    }, 3);

d3.interval(function() {
    arc4.transition()
    .duration(3)
    .attr("transform", "rotate(" + angle4 + ",0,0)")
    return angle4 -= 2.8;
    }, 3);

//Code to create a circle in the middle
// innerRect coordinates.
var maskXStart = cx - farLeft
    , maskXEnd = cx + farRight
    , maskYStart = cy - maskTop
    , maskYEnd = cy + maskBottom
    , x1 = x8 = maskXStart
    , y1 = y2 = maskYStart
    , x2 = x3 = x6 = x7 = maskXEnd
    , y7 = y8 = maskYEnd
    , x4 = x5 = cx - xCentreOffset
    , y3 = y4 = cy - yCentreOffset
    , y5 = y6 = cy + yCentreOffset;

//data array for mask shape
var innerRectData = [
                      {x:x4 + arcGap,y:y4 + arcGap},
                      {x:x2,y:y4 + arcGap},
                      {x:x2,y:y5 - arcGap},
                      {x:x4 + arcGap,y:y5 - arcGap}
                    ];

var centralCircleData = [
                      {x:x1,y:y1},
                      {x:x2,y:y2},
                      {x:x3,y:y3},
                      {x:x4,y:y4},
                      {x:x5,y:y5},
                      {x:x6,y:y6},
                      {x:x7,y:y7},
                      {x:x8,y:y8}
                    ];

var sliderData = [
                      {x:x4 + arcGap,y:y4 + arcGap},
                      {x:x2,y:y4 + arcGap},
                      {x:x2,y:y5 - arcGap},
                      {x:x4 + arcGap,y:y5 - arcGap}
                    ];

//create clip path for cut out
var clip1 = svg.append("clipPath")
        .attr("id","circle-mask")
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", CCRadius);

var clip2 = svg.append("clipPath")
        .attr("id","circle-mask")
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", CCRadius);

//create mask line shape
var lineMask = d3.line()
        .x(function(d,i){ return d.x; })
        .y(function(d,i){ return d.y; });

//append line mask to svg and create clippath
 svg.append("path")
        .style("fill", arcColor)
        .style("opacity", .4)
        .attr("d",lineMask(centralCircleData))
        .attr("clip-path","url(#circle-mask)");

var rectPath = svg.append("path")
        .style("fill", arcColor)
        .style("opacity", .4)
        .attr("d",lineMask(innerRectData))
        .attr("clip-path","url(#circle-mask)");

var rM = svg.append("path")
        .style("fill", "transparent")
        .style("opacity", .4)
        .data(sliderData)
        .attr("d",lineMask(innerRectData))
        .on("mouseover", mouseOver)
        .on("mousedown", mouseDown);

function mouseOver(d,i) {
  console.log("Some mouseover event");
    //Do some sort of color change
}

function mouseDown() {
  console.log(d3.eventclientX);
  console.log(d3.eventclientY);
  if(isMoved) {
clip2.transition()
      .duration(300)
      .ease(d3.easeBounce)
      .attr("transform", "translate(0)");
rectPath.transition()
    .duration(300)
    .ease(d3.easeBounce)
    .attr("transform", "translate(0)");
    isMoved = false;
  }
  else {
    clip2.transition()
          .duration(300)
          .ease(d3.easeElastic)
          .attr("transform", "translate(100)");
    rectPath.transition()
        .duration(300)
        .ease(d3.easeElastic)
        .attr("transform", "translate(100)");
        isMoved = true;
  }
}
