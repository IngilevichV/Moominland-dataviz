document.addEventListener('DOMContentLoaded', function(){
    d3.select("svg")
        .append("text")
        .attr("x", 5)
        .attr("y", 30)
        .attr("fill", "black")
        .style("font-size", 35)
        .text('Comet in');
    d3.select("svg")
        .append("text")
        .attr("x", 5)
        .attr("y", 85)
        .attr("fill", "black")
        .style("font-size", 35)
        .text('Moomin-');
    d3.select("svg")
        .append("text")
        .attr("x", 5)
        .attr("y", 140)
        .attr("fill", "black")
        .style("font-size", 35)
        .text('land');
})