function appendText(svg, x, y, text) {
    svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .text(text)
        .attr("font-size", "10px")
        .attr("fill", "darkgrey");
}


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
        .attr("height", "180");

    const svg = d3.select("svg");

    appendText(svg, 140, 260, "You must go on a long journey");
    appendText(svg, 130, 275, "before you can really find out");
    appendText(svg, 110, 290, "how wonderful home is.");

    appendText(svg, 140, 180, "It would be awful");
    appendText(svg, 150, 195, "if the world exploded.");
    appendText(svg, 160, 210, "It's so beautiful.");

    appendText(svg, 490, 15, "You are too young to understand, ");
    appendText(svg, 440, 30, "but as a matter of fact, a jewel is the only");
    appendText(svg, 480, 45, "present for a lady.");

    appendText(svg, 490, 325, "How nice and fluffy");
    appendText(svg, 510, 340, "you are!");

    appendText(svg, 800, 15, "Instruments used: D3.js, Python");
    appendText(svg, 825, 30, "Author: Varvara Ingilevich");
    appendText(svg, 865, 45, "ITMO University");

    
    // d3.select("svg").append("text")
    //     .attr("x", 140)
    //     .attr("y", 250)
    //     .text("You must go on a long journey")
    //     .attr("font-size", "10px")
    //     .attr("fill", "darkgrey");

    // d3.select("svg").append("text")
    //     .attr("x", 140)
    //     .attr("y", 265)
    //     .text("before you can really find out")
    //     .attr("font-size", "10px")
    //     .attr("fill", "darkgrey");

    // d3.select("svg").append("text")
    //     .attr("x", 140)
    //     .attr("y", 280)
    //     .text("how wonderful home is.")
    //     .attr("font-size", "10px")
    //     .attr("fill", "darkgrey");

})