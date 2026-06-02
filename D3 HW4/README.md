# 2025 Vehicle Crashes by WA County (D3 HW4)

## Description
This map shows the difference in Washington vehicle crashes by counties for 2025. I used a color scale that highlights the highest crash counties as dark red and the lowest as light yellow. King county and the surrounding counties have the highest vehicle crashes due to the high population density and primary highway usage like I-5. Some other high county locations include Spokane on the east and Clark, which contains Vancouver city near Portland. To create this map, I used this [D3 Choropleth map tutorial](https://d3-graph-gallery.com/graph/choropleth_hover_effect.html) which also include the hover effect used on the individual counties. I also used this [D3 tooltips tutorial](https://d3-graph-gallery.com/graph/interactivity_tooltip.html) and our in-class examples to create the hover tooltips that say each county's crash counts. Because the tutorials were for D3 versions 4 and 6, I had to adapt them for version 7. Finally, I found the GeoJSON file for Washington counties at [this GitHub repository](https://github.com/jake-low/covid-19-wa-data/blob/master/README.md) which originates from U.S. Census shapefiles.

Data Source: [Washington State Department of Transportation](https://wsdot.wa.gov/about/transportation-data/crash-data)

## Chart Output GIF
<img src="Chart Output.gif" width=1000>