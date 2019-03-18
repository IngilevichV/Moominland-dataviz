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
    
    // lineChartLegend.append("svg:image")
    //                 .attr("xlink:href","svgArrows/up-broken-line-arrow.svg")
    //                 .attr("width", "50px")
    //                 .attr("height", "50px")
    //                 .attr("transform","rotate(-90)")
    //                 // .attr("fill", "darkgrey");

    lineChartLegend.append("text")
                    .attr("x", 65)
                    .attr("y", -30)
                    .text("Emergence of")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey");
    
    lineChartLegend.append("text")
                    .attr("x", 55)
                    .attr("y", -18)
                    .text("new heroes in book.")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey");

    const lineWidth = 950;
        d3.csv('data/colors_new_characters.csv', function (error, data) {
            lineChartWrapper.append("line")
                .attr("x1", 0)
                .attr("x2", lineWidth+15)
                .attr("y1", 400)
                .attr("y2", 400)
                .attr("stroke", "black");
                for (let i = 0; i < 9; i++) {
                    lineChartWrapper.append("line")
                        .attr("x1", i*(lineWidth + 15)/8)
                        .attr("x2", i*(lineWidth + 15)/8)
                        .attr("y1", 400-5)
                        .attr("y2", 400+5)
                        .attr("stroke", "black");

                    if (i < 8) {
                        lineChartWrapper.append("text")
                            .attr("x", i*lineWidth/8 + lineWidth/8/2.7)
                            .attr("y", 400+15)
                            .attr("fill", "black")
                            .text(`Day ${i+1}`);

                        const colors = data[i].colors.split(", ");
                        colors.forEach((color, j)=>{
                            const rectWidth = lineWidth/7/colors.length;
                            lineChartWrapper.append("rect")
                                .attr("x", i*lineWidth/8+rectWidth*j)
                                .attr("y", 420)
                                .attr("fill", color)
                                .attr("width", rectWidth)
                                .attr("height", "30");
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
                                .attr("stroke", "black");
                            gCharactersWrappers.append("circle")
                                .attr("cx", k*8+15)
                                .attr("cy", -((characters.length-k)*16))
                                .attr("fill", "black")
                                .attr("r", 3);

                            gCharactersWrappers.append("text")
                                .attr("x", k*8+5+15+3)
                                .attr("y", -((characters.length-k)*17-5))
                                .attr("fill", "black")
                                .text(character)
                                .style("font-size", "11px");
                        }
                        
                    })
                    gCharactersWrappers.attr("transform", `translate(${i*lineWidth/8}, 405)`)
                    }

                }
        });
        drawSentimentAnalysisRects(lineChartWrapper);
    

})

