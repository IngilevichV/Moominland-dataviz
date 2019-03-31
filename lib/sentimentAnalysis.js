const viridis = ['#e25d46', '#f46d43', '#fdae61', '#fce97e', '#e6f598', '#87c699','#7abc8d', '#66c2b8', '#3288bd', '#2d79a8']

function linspace(start, end, n) {
    var out = [];
    var delta = (end - start) / (n - 1);

    var i = 0;
    while(i < (n - 1)) {
        out.push(start + (i * delta));
        i++;
    }

    out.push(end);
    return out;
}

// const colorScheme = d3.scale.linear().domain(linspace(0,1,10))
//       .interpolate(d3.interpolateHcl)
//       .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);



function drawSentimentAnalysisLegend(svg) {
    const colorLegendValues = linspace(0, 1, viridis.length);
    svg.append("svg:image")
        .attr("xlink:href","svgArrows/arrow1.svg")
        .attr("x", 945)
        .attr("y", 250)
        .attr("width", "80px")
        .attr("height", "40px")
        .attr("transform", "rotate(10)");
    
    svg.append("text")
        .attr("x", 890)
        .attr("y", 403)
        .style("font-size", "10px")
        .attr("fill", "darkgrey")
        .style("font-weight", "bold")
        .text("Sentiment");
    
    svg.append("text")
        .attr("x", 890)
        .attr("y", 413)
        .style("font-size", "10px")
        .attr("fill", "darkgrey")
        .style("font-weight", "bold")
        .text("analysis");
    
    svg.append("svg:image")
        .attr("xlink:href","svgArrows/arrow6.svg")
        .attr("x", 845)
        .attr("y", 460)
        .attr("width", "65px")
        .attr("height", "100px");
    
    for (i=1; i< viridis.length; i++) {
        svg.append("rect")
            .attr("x", 885)
            .attr("y", 11.2*i + 449)
            .attr("width", 9)
            .attr("height", 11.2)
            .attr("fill",viridis[i]);
    }

    const colorLegendValuesReverse = colorLegendValues.reverse();

    for (i=0; i< colorLegendValues.length; i++) {
        svg.append("text")
            .attr("x", 895)
            .attr("y", 11.3*i + 462)
            // .attr("text",colorLegendValues[i])
            .text(colorLegendValuesReverse[i].toFixed(2))
            .style("font-size", "6px")
    }
}

function drawSentimentAnalysisRects(g) {
    d3.text('data/sentiment_scores.csv', function(error, data){
        const sentimentAnalysisWrapper = g.append("g")
        sentimentAnalysisWrapper.attr("transform", "translate(0, 460)");

        const scores = data.split(',').map(elem => parseFloat(elem));
        const colorScheme = d3.scale.linear()
            .domain(linspace(0, 1, viridis.length))
            .interpolate(d3.interpolateHcl)
            .range(viridis.reverse());
        
        
        var dataArr = new Array();
        var width = 755/scores.length*11.5;
        var height = 10;
        
        for (let column = 0; column < scores.length/10; column++) {
            dataArr.push( new Array() );
            for (let row = 0; row < 10; row++) {
                // console.info(row)
                dataArr[column].push({
                    x: column*width,
                    y: row*height,
                    width: width,
                    height: height,
                    fill: colorScheme(scores[row%10 + column*10]),
                    value: scores[row%10 + column*10]
                })
            }
        }


        var row = sentimentAnalysisWrapper.selectAll(".row")
            .data(dataArr)
            .enter().append("g")
            .attr("class", "row");
        var column = row.selectAll(".square")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("class","square")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.width; })
            .attr("height", function(d) { return d.height; })
            .style("fill", function(d) { return d.fill; })
            .on("mouseover", function(d) {showToolTip(d)})
        
        const lineWidth = 850;
        
        for (let i = 0; i < 9; i++) {
            sentimentAnalysisWrapper.append("line")
                .attr("x1", i*(lineWidth + 15)/8)
                .attr("x2", i*(lineWidth + 15)/8)
                .attr("y1", -40)
                .attr("y2", 100)
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .attr("stroke-dasharray", "2")
                .style("opacity", i!==0 && i!==8 ? 1 : 0);
                
        }

    })
}

