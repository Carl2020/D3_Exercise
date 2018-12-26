var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Select body, append SVG area to it, and set the dimensions
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load census data from data.csv
  d3.csv("assets/data/data.csv")
    .then(function(censusData) {
   
    // parse the data
      censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.abbr = data.abbr;
        console.log("In Poverty (%)", data.poverty);
        console.log("Lack Healthcare (%)", data.healthcare);
        console.log("abbr", data.abbr);
      });

    // Create linear scales for the horizontal and vertical axes
      var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(censusData, d => d.poverty)])
        .range([8, width])
        .nice();
    
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d=> d.healthcare)])
        .range([height, 0]); // might need to reverse this to start with chartHeight
    
    // Create 2 new functions passing our scales in as arguments
    // These will be used to create the chart's axes
      var xAxis = d3.axisBottom(xLinearScale);
      var yAxis = d3.axisLeft(yLinearScale);
        
    // Append our axes to the svg group area
      chartGroup.append("g")
        .call(yAxis);
    
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    
    // append circles to the page
      var circlesGroup = chartGroup.selectAll("#scatter")
        .data(censusData)
        .enter();

        circlesGroup
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "12")
        .attr("class", "stateCircle");

    // add state abbreviation text to the circles
        circlesGroup
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare)+4)
        .text(function(d, i=0){return `${d.abbr}`})
        .attr("class", "stateText");
        
    // Create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Lacks Healthcare  (%)");

      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("In Poverty  (%)");
    });


