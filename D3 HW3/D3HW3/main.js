//Global variables
const topMargin = 150;
const sideMargin = 250;
const width = 1000; 
const height = 800;
const parseTime = d3.timeParse("%Y"); //time parser for years
            
//Load WA Commute Types dataset and define variables
d3.csv("WSDOT Crash Causes 2015-2025.csv").then(data => {
console.log("data", data)
    
    data.forEach(d => { 
    d.year = parseTime(d.Year); //parse Year as time data
    d.distracted = +d.Distracted;
    d.speeding = +d.Speeding;
    d.alcohol = +d.Alcohol;
    d.drugs = +d.Drugs;
    d.drowsy = +d.Drowsy;
    });


//Scales
//Time uses Year and Linear uses a 0-100 percentage of the population
const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([sideMargin, width-sideMargin]); 

const yScale = d3.scaleLinear()
    .domain([0, 35])
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
    .y(d=>yScale(d.distracted));

const lineCarpool = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.speeding))

const linePublic = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.alcohol))

const lineWalk = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.drugs))

const lineBike = d3.line()
    .x(d=>xScale(d.year))
    .y(d=>yScale(d.drowsy))

//Line rendering and styling
svg.append("path")
    .data([data])
    .attr("d", lineAlone)
    .attr("class", "lineDistracted")

svg.append("path")
    .data([data])
    .attr("d", lineCarpool)
    .attr("class", "lineSpeeding")

svg.append("path")
    .data([data])
    .attr("d", linePublic)
    .attr("class", "lineAlcohol")

svg.append("path")
    .data([data])
    .attr("d", lineWalk)
    .attr("class", "lineDrugs")

svg.append("path")
    .data([data])
    .attr("d", lineBike)
    .attr("class", "lineDrowsy")


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
    .text("% of Total Crashes")


//Line labels
//positioned to right side of lines and matching colors
svg.append("text")
    .attr("class", "labelDistracted")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 255)
    .text("Distracted")
    .style("fill", "#e33719");

svg.append("text")
    .attr("class", "labelSpeeding")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 205)
    .text("Speeding")
    .style("fill", "#f5a031");

svg.append("text")
    .attr("class", "labelAlcohol")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 240)
    .text("Alcohol")
    .style("fill", "#569ae8");

svg.append("text")
    .attr("class", "labelDrugs")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 330)
    .text("Drugs")
    .style("fill", "#84e01b");

svg.append("text")
    .attr("class", "labelDrowsy")
    .attr("x", width - sideMargin + 5)
    .attr("y", topMargin + 470)
    .text("Drowsy")
    .style("fill", "#ba6ded");


//Header
svg.append("text")
    .attr("class", "header")
    .attr("x", sideMargin - 90)
    .attr("y", topMargin - 110)
    .text("WA State Fatal Vehicle Crash Causes 2015-2025")

//Author
svg.append("text")
    .attr("class", "author")
    .attr("x", sideMargin - 87)
    .attr("y", topMargin - 85)
    .text("By Jeffrey Choi")

//Source
svg.append("text")
    .attr("class", "source")
    .attr("x", sideMargin - 90)
    .attr("y", topMargin + 580)
    .text("Source: Washington State Department of Transportation - WSDOT Crash Data")


//Checkbox interaction
d3.selectAll("input[type='checkbox']")
.on("change", function(){

    const selectedLine = this.value;
    const selectedLabel = selectedLine.replace("line", "label");

    //Show line
    if(this.checked){

        svg.select("." + selectedLine)
            .transition()
            .duration(500)
            .style("opacity", 1);

        svg.select("." + selectedLabel)
            .transition()
            .duration(500)
            .style("opacity", 1);

    //Hide line
    } else {

        svg.select("." + selectedLine)
            .transition()
            .duration(500)
            .style("opacity", 0);

        svg.select("." + selectedLabel)
            .transition()
            .duration(500)
            .style("opacity", 0);
    }
})

});