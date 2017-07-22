// Variables for circles
var dataArray = [7,14,21,28,35,42,49,56,63,70,77,84,91,98,105,112,119,126,133,140,147,154,161,168,175,182,189,196,203,210,217,224];
var cx = screen.width/2;
var cy = (screen.height/2) - 50;
var radius = 175;
// Variables for arcs
var arcColor = "#08afff";
var tau = 2 * Math.PI;
var innerRadiusArray = [180,245,310,375];
var outerRadiusArray = [240,305,370,435];
var endAngleArray = [.45,.55,.4,.6];
var startAngle = 0;
var angle1 = 10;
var angle2 = -3;
var angle3 = 6;
var angle4 = -8;

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

/*** Look at whether having only one circle looks better than a bunch of rings ***/
svg.selectAll("circle")
    .data(dataArray)
    .enter().append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", function(d,i){ return radius - d; })
    .attr("fill", arcColor)
    .attr("opacity", .4)
    .attr("stroke", arcColor)
    .attr("stroke-width","3");
