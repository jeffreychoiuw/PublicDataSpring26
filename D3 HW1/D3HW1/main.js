    //Global variables
        const topMargin = 50;
        const sideMargin = 250;
        const width = 1000; 
        const height = 600;


    //Load Seattle Departments dataset and define variables
        d3.csv("Seattle Departments.csv").then(data => {
            console.log("data", data)
        
        //Format data, Count formats as a number
        data.forEach(d => { 
            d.Department = d.Department;
            d.Count = +d.Count; 
        });

        //Keep top 15 rows
        data = data.slice(0,15);
        
        const maxY = d3.max(data, d => d.Count);


    //Scales
        //Linear is for Count and Band is for Departments
        const xScale = d3.scaleLinear()
                        .domain([0, maxY])
                        .range([sideMargin, width - sideMargin]);
        
        const yScale = d3.scaleBand()
                        .domain(data.map(d => d.Department))
                        .range([topMargin, height - topMargin])
                        .paddingInner(.02);
        

    //SVG element
        const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);


    //Bars
        //Position, scale, and color bars for Departments
        //Count determines bar length
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => sideMargin)
            .attr("y", d => yScale(d.Department))
            .attr("width", d => xScale(d.Count) - sideMargin)
            .attr("height", yScale.bandwidth())
            .attr("fill", "#3A52CF");


    //Axes
        const topAxis = d3.axisTop()
                             .scale(xScale);
        
        const leftAxis = d3.axisLeft()
                           .scale(yScale);
    
        //Move and display axes
        svg.append("g")
            .attr("transform", "translate(0," + (topMargin) + ")") 
            .call(topAxis);

        svg.append("g")
            .attr("transform", "translate(" + sideMargin + ",0)")
            .call(leftAxis);

    });