// General use variables
var sw = screen.width;
    sh = screen.height;

// Variables for circles
var cx = sw/2;
var cy = (sh/2) - (sw * 0.026);
var CCradius = sw * 0.1; // CC stands for Centre Circle

// Variables for arcs, arcOuter,
var arcInner = arcOuter = startAngle = endAngle = 0;
var arcNum = 4;
var arcArray = new Array(arcNum);
var arcColor = "#08afff";
var arcGap = sw * 0.0026;
var arcWidth = sw * 0.03125;
var tau = 2 * Math.PI;

    innerRadiusArray = [180,245,310,375];
    outerRadiusArray = [240,305,370,435];
    endAngleArray = [.45,.55,.4,.6];
    startAngle = 0;
    angle1 = 10;
    angle2 = -3;
    angle3 = 6;
    angle4 = -8;

// Start building the arc array by adding the startAngle to each of the four arcs
for(var i = 0; i < arcNum; i++) {
    var objArray = new Array(arcNum);
    arcArray.push(objArray);
    objArray.push(startAngle);
    // Add the endAngle to each object entry
    var randNum = Math.random();
    if(randNum < 0.4) randNum = 0.4;
    else if(randNum > 0.6) randNum = 0.6;
    endAngle = randNum * tau;
    objArray.push(endAngle);
    // Add the inner and outer arc radii
    arcInner = (arcOuter + arcGap);
    arcOuter = (arcInner + arcWidth);
    objArray.push(arcInner);
    objArray.push(arcOuter);
}

//Code to create a spinning arc
/****** Create an object array out of the four arcs below *************
********* and access each one to reduce code below *******************/
var arc1 = d3.arc()
        .innerRadius(innerRadiusArray[0])
        .outerRadius(outerRadiusArray[0])
        .startAngle(startAngle)
        .endAngle(endAngleArray[0] * tau)
        .cornerRadius(30);

var arc2 = d3.arc()
        .innerRadius(innerRadiusArray[1])
        .outerRadius(outerRadiusArray[1])
        .startAngle(startAngle)
        .endAngle(endAngleArray[1] * tau)
        .cornerRadius(30);

var arc3 = d3.arc()
        .innerRadius(innerRadiusArray[2])
        .outerRadius(outerRadiusArray[2])
        .startAngle(startAngle)
        .endAngle(endAngleArray[2] * tau)
        .cornerRadius(30);

var arc4 = d3.arc()
        .innerRadius(innerRadiusArray[3])
        .outerRadius(outerRadiusArray[3])
        .startAngle(startAngle)
        .endAngle(endAngleArray[3] * tau)
        .cornerRadius(30);

var svg = d3.select("svg"),
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
//innerRect coordinates. //todo create variables for all measurements
var maskXStart = cx - 200;
var maskXEnd = cx + 200;
var maskYStart = cy - 200;
var maskYEnd = cy + 200;
var x1 = maskXStart;
var y1 = maskYStart;
var x2 = maskXEnd;
var y2 = maskYStart;
var x3 = maskXEnd;
var y3 = cy - 50;
var x4 = cx - 80;
var y4 = cy - 50;
var x5 = cx - 80;
var y5 = cy + 50;
var x6 = maskXEnd;
var y6 = cy + 50;
var x7 = maskXEnd;
var y7 = maskYEnd;
var x8 = maskXStart;
var y8 = maskYEnd;
var x9 = maskXStart;
var y9 = maskYStart;

//data array for mask shape
var innerRectData = [{x:x1,y:y1},{x:x2,y:y2},{x:x3,y:y3},{x:x4,y:y4},
  {x:x5,y:y5},{x:x6,y:y6},{x:x7,y:y7},{x:x8,y:y8},{x:x9,y:y9}];

//standard append of svg element to DOM
//var svg = d3.select("body").append("svg").attr("width",svgWidth).attr("height",svgHeight);

//create clip path for cut out
svg.append("clipPath")
        .attr("id","rect-mask")
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", CCradius);

//create mask line shape
var lineMask = d3.line()
        .x(function(d,i){ return d.x; })
        .y(function(d,i){ return d.y; });

//append line mask to svg and create clippath
svg.append("path")
        .style("fill", arcColor)
        .style("opacity", .4)
        .attr("d",lineMask(innerRectData))
        .attr("clip-path","url(#rect-mask)");

/*** Look at whether having only one circle looks better than a bunch of rings ***/
// svg.selectAll("circle")
//     .data(dataArray)
//     .enter().append("circle")
//     .attr("cx", cx)
//     .attr("cy", cy)
//     .attr("r", function(d,i){ return radius - d; })
//     .attr("fill", arcColor)
//     .attr("opacity", .4)
//     .attr("stroke", arcColor)
//     .attr("stroke-width","3");

var dataArray = [7,14,21,28,35,42,49,56,63,70,77,84,91,98,105,112,119,126,133,140,147,154,161,168,175,182,189,196,203,210,217,224];
