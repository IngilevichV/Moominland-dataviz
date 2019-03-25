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
        var width = 800/scores.length*11.5;
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
                    fill: colorScheme(scores[row%10 + column*10])
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
    })
}
