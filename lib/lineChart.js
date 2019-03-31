const colorsMapper = {
    "blue":"#0779A9",
    "black": "#2C2525",
    "yellow": "#FFC53B",
    "red": "#DB6742",
    "green": "#DB6742",
    "white": "white",
    "purple": "#84598F",
    "grey": "#B1B8BE",
    "silver": "#BCBCBC",
    "gold": "#E0AF33"
}

function drawColorEmergenceLegend(svg) {
    svg.append("svg:image")
        .attr("xlink:href","svgArrows/arrow5.svg")
        .attr("x", 760)
        .attr("y", -1)
        .attr("width", "80px")
        .attr("height", "60px")
        // .attr("transform", "rotate(10)");
    
    svg.append("text")
        .attr("x", 780)
        .attr("y", -20)
        .style("font-size", "10px")
        .attr("fill", "darkgrey")
        .style("font-weight", "bold")
        .text("Mention of colors");
    
    svg.append("text")
        .attr("x", 809)
        .attr("y", -7)
        .style("font-size", "10px")
        .attr("fill", "darkgrey")
        .style("font-weight", "bold")
        .text("in the text.");
}

document.addEventListener('DOMContentLoaded', function(){
    // TODO: после подгрузки хордового графика
    const lineChartWrapper = d3.select("svg")
            .append("g")
            .attr("class", "lineChartWrapper");
    lineChartWrapper.attr("transform", "translate(0, 0)");

    const lineChartLegend = d3.select("svg")
                                .append("g")
                                .attr("class", "lineChartLegend")
                                .attr("transform", "translate(85, 380)");
    
    lineChartLegend.append("svg:image")
                    .attr("xlink:href","svgArrows/arrow2.svg")
                    .attr("x", 40)
                    .attr("y", -35)
                    .attr("width", "80px")
                    .attr("height", "70px")
                    // .attr("transform","rotate(-90)");

    lineChartLegend.append("text")
                    .attr("x", 50)
                    .attr("y", -30)
                    .text("Emergence of")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey");
    
    lineChartLegend.append("text")
                    .attr("x", 37)
                    .attr("y", -18)
                    .text("new heroes in book.")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey");
    
    lineChartLegend.append("svg:image")
                    .attr("xlink:href","img/comet.svg")
                    .attr("x", 715)
                    .attr("y", -60)
                    .attr("width", "80px")
                    .attr("height", "70px")
                    // .attr("transform","rotate(-90)");

    drawColorEmergenceLegend(lineChartLegend);

    const lineWidth = 850;
    d3.csv('data/colors_new_characters.csv', function (error, data) {
        lineChartWrapper.append("line")
            .attr("x1", 0)
            .attr("x2", lineWidth+15)
            .attr("y1", 400)
            .attr("y2", 400)
            .attr("stroke", "#51809E");
            for (let i = 0; i < 9; i++) {
                lineChartWrapper.append("line")
                    .attr("x1", i*(lineWidth + 15)/8)
                    .attr("x2", i*(lineWidth + 15)/8)
                    .attr("y1", 400-5)
                    .attr("y2", 400+5)
                    .attr("stroke", "#51809E");

                if (i < 8) {
                    lineChartWrapper.append("text")
                        .attr("x", i*lineWidth/8 + lineWidth/8/2.7)
                        .attr("y", 400+15)
                        .attr("fill", "#51809E")
                        .text(`Day ${i+1}`);

                    const colors = data[i].colors.split(", ");
                    colors.forEach((color, j)=>{
                        const rectWidth = lineWidth/7/colors.length;
                        lineChartWrapper.append("rect")
                            .attr("x", i*lineWidth/8+rectWidth*j)
                            .attr("y", 420)
                            .attr("fill", colorsMapper[color])
                            .attr("width", rectWidth)
                            .attr("height", "30")
                            .attr("opacity", 0.8);
                    })

                const characters = data[i].characters.split(", ");
                const gCharactersWrappers = lineChartWrapper.append("g");
                // if(characters.length>1) {}
                characters.forEach((character, k) => {
                    if(character) {
                        gCharactersWrappers.append("line")
                            .attr("x1", k*8+15)
                            .attr("x2", k*8+15)
                            .attr("y1", -5)
                            .attr("y2", -((characters.length-k)*16))
                            .attr("stroke", "#51809E");
                        gCharactersWrappers.append("circle")
                            .attr("cx", k*8+15)
                            .attr("cy", -((characters.length-k)*16))
                            .attr("fill", "#51809E")
                            .attr("r", 3);

                        gCharactersWrappers.append("text")
                            .attr("x", k*8+5+15+3)
                            .attr("y", -((characters.length-k)*17-5))
                            .attr("fill", "#51809E")
                            .text(character)
                            .style("font-size", "11px");
                    }
                    
                })
                gCharactersWrappers.attr("transform", `translate(${i*lineWidth/8}, 405)`)
                }

            }
    });
    drawSentimentAnalysisRects(lineChartWrapper);
    drawSentimentAnalysisLegend(lineChartWrapper);
})

