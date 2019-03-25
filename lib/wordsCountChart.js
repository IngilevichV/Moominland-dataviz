document.addEventListener('DOMContentLoaded', function(){
    const bubbleChartWrapper = d3.select("svg")
            .append("g")
            .attr("class", "bubbleChartWrapper");
    bubbleChartWrapper.attr("transform", "translate(500,10) rotate(-10)")
    var diameter = 400,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(4);

    function classes(root) {
        var classes = [];
        
        function recurse(name_eng, node) {
            if (node.count) node.count.forEach(function(child) { recurse(node.name_eng, child); });
            else classes.push({packageName: name_eng, className: node.name_eng, value: node.value});
        }
        
        recurse(null, root);
        return {children: classes};
        }
    drawWordsLegend(bubbleChartWrapper);
    d3.json("data/count_words.json", function(error, data) {
        var node = bubbleChartWrapper.selectAll(".node")
            .data(bubble.nodes(classes(data))
            .filter(function(d) { return !d.children; }))
            .enter().append("g")
            .attr("class", "node")
            
        node.attr("transform", function(d) {`translate(1500, -500)`})
            .transition()
            .duration(function(d) {return 120 * Math.random() * d.x/10})
            .attr("transform", function(d) {return `translate(${d.className === 'Snuf- kin' ? d.x - 10 : d.x},${d.className === 'Snuf- kin' ? d.y + 6 + 5 + 4 : d.y}) rotate(10)`; });
        
        node.append("circle")
            .attr("r", function(d) {if (d.className === 'Snuf- kin'){return d.r/1.5} return d.r+1; })
            .style("fill", function(d) { return color(d.packageName); })
            .style("opacity", 0.5)
            // .on("mouseover", function(d) {
            //         tooltip.text(d.className + ": " + format(d.value));
            //         tooltip.style("visibility", "visible");
            // })
            // .on("mousemove", function() {
            //     return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
            // })
            // .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

        node.append("text")
            .attr("dy", function(d){if(d.className.split(" ").length>1) {return ".01em"} return ".2em"})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .style("font-size", function(d){if (d.r > 30) {return 20} else if (d.r > 15 ) {return 10} else {return 7} })
            .text(function(d) { return `${d.className.split(" ")[0]}` })
            .attr("fill", "#3e7395");
        node.append("text")
            .attr("dy", ".9em")
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .style("font-size", function(d){if (d.r > 30) {return 20} else if (d.r > 15 ) {return 10} else {return 7} })
            .text(function(d) {if(d.className.split(" ")[1]) return `${d.className.split(" ")[1]}` })
            .attr("fill", "#3e7395");
    })
})