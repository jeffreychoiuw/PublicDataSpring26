//Global variables
const topMargin = 150;
const sideMargin = 250;
const width = 1000; 
const height = 800;
const parseTime = d3.timeParse("%Y"); //time parser for years
            
//Load WA Commute Types dataset and define variables
d3.csv("Census WA Commuting Types by Year.csv").then(data => {
console.log("data", data)
    
    data.forEach(d => { 
    d.year = parseTime(d.Year); //parse Year as time data
    d.alone = +d["Drove Alone"];
    d.carpool = +d.Carpooled;
    d.public = +d["Public Transportation"];
    d.walk = +d.Walked;
    d.bike = +d.Biked;
    d.remote = +d["Remote Work"];
    });


//Scales
//Time uses Year and Linear uses a 0-100 percentage of the population
const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([sideMargin, width-sideMargin]); 

const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height-topMargin, topMargin]); 


//Axes
//bottom axis with tick time formatting
const bottomAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.timeFormat("%Y"));

//left axis with tick percentage formatting
const leftAxis = d3.axisLeft()
    .scale(yScale)
    .tickFormat(d => d + "%");
    
            
//SVG element
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


//Line generators
const lineAlone = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.alone));

const lineCarpool = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.carpool))

const linePublic = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.public))

const lineWalk = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.walk))

const lineBike = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.bike))

const lineRemote = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.remote))


//Line rendering and styling
svg.append("path")
    .data([data])
    .attr("d", lineAlone)
    .attr("class", "lineAlone")

svg.append("path")
    .data([data])
    .attr("d", lineCarpool)
    .attr("class", "lineCarpool")

svg.append("path")
    .data([data])
    .attr("d", linePublic)
    .attr("class", "linePublic")

svg.append("path")
    .data([data])
    .attr("d", lineWalk)
    .attr("class", "lineWalk")

svg.append("path")
    .data([data])
    .attr("d", lineBike)
    .attr("class", "lineBike")

svg.append("path")
    .data([data])
    .attr("d", lineRemote)
    .attr("class", "lineRemote")


//Axes rendering and styling
svg.append("g")
    .attr("class", "axis") 
    .attr("transform", "translate(0," + (height - topMargin) + ")") 
    .call(bottomAxis);    

svg.append("g")
    .attr("class", "axis") 
    .attr("transform", "translate(" + sideMargin + ",0)")
    .call(leftAxis);
            

//Axes labels
//bottomAxis
svg.append("text")
    .attr("class", "label")
    .attr("x", sideMargin + 235)
    .attr("y", topMargin + 545)
    .text("Year")

//leftAxis
svg.append("text")
    .attr("class", "label")
    .attr("x", sideMargin - 75)
    .attr("y", topMargin - 15)
    .text("Population")


//Line labels
//positioned to right side of lines and matching colors
svg.append("text")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 180)
    .text("Drove Alone")
    .style("fill", "#e33719");

svg.append("text")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 460)
    .text("Carpooled")
    .style("fill", "#f5a031");

svg.append("text")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 478)
    .text("Public Transportation")
    .style("fill", "#569ae8");

svg.append("text")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 493)
    .text("Walked")
    .style("fill", "#84e01b");

svg.append("text")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 506)
    .text("Biked")
    .style("fill", "#ba6ded");

svg.append("text")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 425)
    .text("Remote Work")
    .style("fill", "#2b343d");


//Header
svg.append("text")
    .attr("class", "header")
    .attr("x", sideMargin - 90)
    .attr("y", topMargin - 80)
    .text("WA State Commuting Types 2018-2024")

//Author
svg.append("text")
    .attr("class", "author")
    .attr("x", sideMargin - 87)
    .attr("y", topMargin - 55)
    .text("By Jeffrey Choi")

//Source
svg.append("text")
    .attr("class", "source")
    .attr("x", sideMargin - 90)
    .attr("y", topMargin + 580)
    .text("Source: U.S. Census Bureau")
});