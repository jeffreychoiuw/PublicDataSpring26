//Global variables
const topMargin = 150;
const sideMargin = 100;
const width = 800; 
const height = 800;
            
//Load WA County Crashes dataset & WA Counties GeoJSON and define variables
Promise.all([
    d3.json("wa-counties.geo.json"),
    d3.csv("WSDOT County Crashes 2025.csv")
]).then(function(files) {
const data = {
    "map": files[1].map(d => ({
        county: d.County,
        crashes: +d.Crashes
    }))
};
//Set map variables
const waCounties = files[0];
const waMap = new Map();
data.map.forEach(d => {
    waMap.set(d.county, d.crashes);
});


//SVG element
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

//Map and projection
const projection = d3.geoMercator()
    .fitSize([width, height], waCounties);
const path = d3.geoPath()
    .projection(projection);


//Color scale using dataset
const values = Array.from(waMap.values());
const colorScale = d3.scaleThreshold()
    .domain([100, 500, 1000, 2500, 5000, 10000, 20000])
    .range(d3.schemeYlOrRd[7]);


//Mouse functions for hover effect and tooltip
const mouseOver = function(event, d) {
    const county = d.properties.NAME;
    const value = waMap.get(county) || 0;
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
    
    tooltip
        .style("opacity", 1)
        .html(`<strong>${county}</strong><br>Crashes: ${value}`);
};

const mouseMove = function(event, d) {
    tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
};

const mouseLeave = function(event, d) {
    d3.select(this)
        .style("stroke", "white")
        .style("opacity", 0.9);
    
    tooltip.style("opacity", 0);
};


//Tooltip creation and styling
const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("padding", "6px 10px")
    .style("border", "1px solid #999")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);


//Draw map, colorScale uses data to make higher crash counts darker red and lower lighter yellow
svg.append("g")
    .selectAll("path")
    .data(waCounties.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => {
        const county = d.properties.NAME;
        const value = waMap.get(county) || 0;
        return colorScale(value);
    })
    .attr("class", "County")
    .style("opacity", 0.9)
    .style("stroke", "white")
    .on("mouseover", mouseOver)
    .on("mousemove", mouseMove)
    .on("mouseleave", mouseLeave);


//Header
svg.append("text")
    .attr("class", "header")
    .attr("x", sideMargin - 90)
    .attr("y", topMargin - 80)
    .text("2025 Vehicle Crashes by WA County")

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
    .text("Source: Washington State Department of Transportation - WSDOT Crash Data")

});