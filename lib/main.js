document.addEventListener('DOMContentLoaded', function(){
    d3.select("svg")
        .append("text")
        .attr("x", 5)
        .attr("y", 30)
        .attr("fill", "#51809E")
        .style("font-size", 35)
        .text('Comet in');
    d3.select("svg")
        .append("text")
        .attr("x", 5)
        .attr("y", 65)
        .attr("fill", "#51809E")
        .style("font-size", 35)
        .style("font-weight", "bold")
        .text('Moomin-');
    d3.select("svg")
        .append("text")
        .attr("x", 85)
        .attr("y", 100)
        .attr("fill", "#51809E")
        .style("font-size", 35)
        .style("font-weight", "bold")
        .text('land');

    d3.select("svg")
        .append("svg:image")
        .attr("xlink:href", "img/moomin_house.png")
        .attr("x", "-30")
        .attr("y", "75")
        .attr("width", "180")
        .attr("height", "180");;
})