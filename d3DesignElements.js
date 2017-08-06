// General use variables
var sw = screen.width;
    sh = screen.height;

// Variables for circles
var cx = sw/2;
var cy = (sh/2) - (sw * 0.026);
var CCRadius = sw * 0.1; // CC stands for Centre Circle

// Variables for central circle mask
var farLeft = farRight = maskTop = maskBottom = CCRadius
    , xCentreOffset = sw * 0.07
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
    , arcLength = 0
    , arcNumber = 0
    , move = moves = 0
    , isStarted = isMoved = false
    , toRadians = Math.PI / 180
    , toDegrees = 180 / Math.PI
    , ninetyDegrees = tau / 4
    , y4 = cy - yCentreOffset
    , y5 = cy + yCentreOffset
    , rectChordLength = y5 - y4
    , rectangleTopEdgeAngle =  ninetyDegrees - (Math.asin((rectChordLength / (2 * CCRadius))))
    , rectangleBottomEdgeAngle = ninetyDegrees + (Math.asin((rectChordLength / (2 * CCRadius))))
    , arc0 = {startAngle: 0, endAngle: 120 * toRadians, angle: 10, rotationSpeed: 1.5}
    , arc1 = {startAngle: 0, endAngle: 300 * toRadians, angle: 3,  rotationSpeed: -2.8}
    , arc2 = {startAngle: 0, endAngle: 240 * toRadians, angle: 20, rotationSpeed: 2.5}
    , arc3 = {startAngle: 0, endAngle: 180 * toRadians, angle: 15, rotationSpeed: -1.3}
    , arcData = [arc0, arc1, arc2, arc3];

// Adds SVG element to the document page
var svg = d3.select("body").append("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height"),
      arcs = svg.append("g")
                  .attr("transform", "translate(" + cx + ", " + cy + ")")
                  .attr("id", "arcs")
                  .style("fill", arcColor)
                  .style("opacity", .4);

// Setup arc
var arc = d3.arc()
              .cornerRadius(30);

// Create arc group appended to the "g" (group element)
var arcGroup = arcs.selectAll("g")
                        .data(arcData).enter()
                    .append("g")
                        .attr("id", function(d,i) { return "arc" + i.toString(); });

// Create arcPaths from arcData array
var arcPath = arcGroup.append("path")
                    .attr("class", "arcPath")
                    .attr("d", function(d) { return arc({
                          innerRadius: arcInner = (arcOuter + arcGap),
                          outerRadius: arcOuter = (arcInner + arcWidth),
                          startAngle: d.startAngle,
                          endAngle: d.endAngle
                        })
                    });


/*******************************************************************************
*******************************************************************************/
//*******************Code to create spinning arcs******************************
arcPath.each(function transition(d) {
  d.angle += d.rotationSpeed;
  if(moves === 1) {
                      d3.select("#arc0")
                          .data(arcData.filter(function(d,i){
                                                                if(i === 0) {
                                                                    arcLength = d.endAngle - d.startAngle;
                                                                    rectangleTopEdgeAngle = ninetyDegrees -
                                                                        (Math.asin((rectChordLength / (2 * (CCRadius + arcGap +
                                                                        (arcWidth / 2))))));
                                                                    newAngle1 = (rectangleTopEdgeAngle - arcLength) * toDegrees;
                                                                    oneStopped = true;
                                                                    return d.angle = newAngle1;
                                                                }}));
  }
  if(moves === 2) {
                      d3.select("#arc1")
                          .data(arcData.filter(function(d,i){
                                                                if(i === 0) d.angle = newAngle1;
                                                                if(i === 1) {
                                                                    arcLength = d.endAngle - d.startAngle;
                                                                    rectangleBottomEdgeAngle = ninetyDegrees +
                                                                        (Math.asin((rectChordLength / (2 * (CCRadius + (2 * arcGap) +
                                                                        (1.5 * arcWidth))))));
                                                                    newAngle2 = rectangleBottomEdgeAngle * toDegrees;
                                                                    return d.angle = newAngle2;
                                                                }}));
  }
  // Stop first 3 inner arcs when wedge is in postion 3
  if(moves === 3) {
                      d3.select("#arc1")
                          .data(arcData.filter(function(d,i){
                                                                if(i === 0) d.angle = newAngle1;
                                                                if(i === 1) d.angle = newAngle2;
                                                                if(i === 2) {
                                                                    arcLength = d.endAngle - d.startAngle;
                                                                    rectangleTopEdgeAngle = ninetyDegrees -
                                                                        (Math.asin((rectChordLength / (2 * (CCRadius + (3 * arcGap) +
                                                                        (2.5 * arcWidth))))));
                                                                    newAngle3 = (rectangleTopEdgeAngle  - arcLength) * toDegrees;
                                                                    return d.angle = newAngle3;
                                                                }}));
  }
  // Stop all arcs when wedge is in postion 4
  if(moves === 4) {
                      d3.select("#arc1")
                          .data(arcData.filter(function(d,i){
                                                                if(i === 0) d.angle = newAngle1
                                                                if(i === 1) d.angle = newAngle2
                                                                if(i === 2) d.angle = newAngle3
                                                                if(i === 3) {
                                                                    arcLength = d.endAngle - d.startAngle;
                                                                    rectangleBottomEdgeAngle = ninetyDegrees +
                                                                        (Math.asin((rectChordLength / (2 * (CCRadius + (4 * arcGap) +
                                                                        (3.5 * arcWidth))))));
                                                                    newAngle4 = rectangleBottomEdgeAngle * toDegrees;
                                                                    return d.angle = newAngle4;
                                                                }}));
  }
  // Spin arcs continuously
  d3.select(this).transition()
      .duration(3)
      .attr("transform", "rotate(" + d.angle + ")")
      .on("end", transition);
  });

/*******************************************************************************
*******************************************************************************/
//***************Code to create a circle in the middle*************************
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
    , y3 = cy - yCentreOffset
    , y6 = cy + yCentreOffset;

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
  console.log("Some mouseover event again");
  //Do some sort of color change
}

function rectMove() {
    if(moves < 5) {
      move += arcWidth + arcGap;
    }
}

function mouseDown() {
    if(isMoved && moves === 4) {
        clip2.transition()
              .duration(300)
              .ease(d3.easeBounce)
              .attr("transform", "translate(0)");
        rectPath.transition()
            .duration(300)
            .ease(d3.easeBounce)
            .attr("transform", "translate(0)");
        rM.transition()
            .duration(300)
            .attr("transform", "translate(0)");
      moves = 0;
      move = 0;
      isMoved = false;
  }
  else {
        rectMove();
        clip2.transition()
            .duration(300)
            .ease(d3.easeElastic)
            .attr("transform", "translate(" + move + ")");
        rectPath.transition()
            .duration(300)
            .ease(d3.easeElastic)
            .attr("transform", "translate(" + move + ")");
        rM.transition()
            .duration(300)
            .attr("transform", "translate(" + move + ")");
        moves++;
        console.log("moves = " + moves);
        arcNum();
        if(moves === 4) isMoved = true;
  }
}

function arcNum() {
   switch(moves) {
     case 1:
        arcNumber = 1;
        break;
     case 2:
        arcNumber = 2;
        break;
     case 3:
        arcNumber = 3;
        break;
      case 4:
        arcNumber = 4;
        break;
      default:
        break;
   }
}
