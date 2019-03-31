  

//*******************************************************************
//  CHORD MAPPER 
//*******************************************************************


const characters={
  1: "Moomin-pappa",
  2: "Sniff",
  3: "Mumin-troll",
  4: "Moomin-mamma",
  5: "Kitty",
  6: "Muskrat",
  7: "Snifkin",
  8: "Hemulen",
  9: "Professors",
  10: "Snork-maiden",
  11: "Poisonous-Bush-Angostura",
  12: "Snork",
  13: "Saleswoman-in the store",
  14: "Tiny",
  15: "Skrut",
  16: "Hemulen's-brother"
}

function chordMpr (data) {
    var mpr = {}, mmap = {}, n = 0,
        matrix = [], filter, accessor;
  
    mpr.setFilter = function (fun) {
        // console.info(filter, fun)
      filter = fun;
      return this;
    },
    mpr.setAccessor = function (fun) {
      accessor = fun;
      return this;
    },
    mpr.getMatrix = function () {
      matrix = [];
      _.each(mmap, function (a) {
        if (!matrix[a.id]) matrix[a.id] = [];
        _.each(mmap, function (b) {
         var recs = _.filter(data, function (row) {
            return filter(row, a, b);
          })
          matrix[a.id][b.id] = accessor(recs, a, b);
        });
      });
      return matrix;
    },
    mpr.getMap = function () {
      return mmap;
    },
    mpr.printMatrix = function () {
      _.each(matrix, function (elem) {
        // console.log(elem);
      })
    },
    mpr.addToMap = function (value, info) {
      if (!mmap[value]) {
        mmap[value] = { name: value, id: n++, data: info }
      }
    },
    mpr.addValuesToMap = function (varName, info) {
      var values = _.uniq(_.pluck(data, varName));
      _.map(values, function (v) {
        if (!mmap[v]) {
          mmap[v] = { name: v, id: n++, data: info }
        }
      });
      return this;
    }
    return mpr;
  }
  //*******************************************************************
  //  CHORD READER
  //*******************************************************************
  function chordRdr (matrix, mmap) {
    return function (d) {
      var i,j,s,t,g,m = {};
      if (d.source) {
        i = d.source.index; j = d.target.index;
        s = _.where(mmap, {id: i });
        t = _.where(mmap, {id: j });
        m.sname = s[0].name;
        m.sdata = d.source.value;
        m.svalue = +d.source.value;
        m.stotal = _.reduce(matrix[i], function (k, n) { return k + n }, 0);
        m.tname = t[0].name;
        m.tdata = d.target.value;
        m.tvalue = +d.target.value;
        m.ttotal = _.reduce(matrix[j], function (k, n) { return k + n }, 0);
      } else {
        g = _.where(mmap, {id: d.index });
        m.gname = g[0].name;
        m.gdata = g[0].data;
        m.gvalue = d.value;
      }
      m.mtotal = _.reduce(matrix, function (m1, n1) { 
        return m1 + _.reduce(n1, function (m2, n2) { return m2 + n2}, 0);
      }, 0);
      return m;
    }
  }

    function drawChordsLegend(svg) {
      const chordsLegendWrapper = svg.append("g").attr("class", "chordsLegend");
      chordsLegendWrapper.attr("transform","translate(-190, -100)")
      chordsLegendWrapper.append("svg:image")
                      .attr("xlink:href","svgArrows/turn-right-arrow-with-broken-line.svg")
                      .attr("width", "50px")
                      .attr("height", "50px")
                      .attr("transform","rotate(0)")
                      // .attr("fill", "darkgrey");
      chordsLegendWrapper.append("text")
                    .attr("x", -10)
                    .attr("y", -15)
                    .text("Conversations")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey");
    
      chordsLegendWrapper.append("text")
                    .attr("x", -10)
                    .attr("y", -3)
                    .text("of the characters.")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey");
    }

    function drawWordsLegend(svg) {
      const wordsLegendWrapper = svg.append("g").attr("class", "wordsLegend");
      wordsLegendWrapper.attr("transform","translate(350, 130)")
      wordsLegendWrapper.append("svg:image")
                      .attr("xlink:href","svgArrows/arrow4.svg")
                      .attr("width", "80px")
                      .attr("height", "80px")
                      .attr("transform","translate(10,0)rotate(30)");
      wordsLegendWrapper.append("text")
                    .attr("x", -32)
                    .attr("y", -7)
                    .text("The most used words")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey")
                    .attr("transform","rotate(10)");

      wordsLegendWrapper.append("text")
                    .attr("x", -30)
                    .attr("y", 7)
                    .text("in the book.")
                    .style("font-size", "10")
                    .style("font-weight", "bold")
                    .attr("fill", "darkgrey")
                    .attr("transform","rotate(10)");
    
      
    }

  //*******************************************************************
      //  DRAW THE CHORD DIAGRAM
      //*******************************************************************
    function drawChords (matrix, mmap) {
        var w = 500, h = 370, r1 = h / 2, r0 = r1 - 100;
        var fill = d3.scale.ordinal()
            .domain(d3.range(4))
            // .range(["#FFDD89", "#957244", "#F26223", 'green', 'yellow', 'red', 'purple', 'pink', 'green', 'blue', 'lime' ,"#0000CD", "#00008B", "#000080", "FF00FF", "Olive", "LightCoral", "orange", "Chocolate", "DarkRed", "Chartreuse", "BlanchedAlmond", "PaleTurquoise", "Cyan", "Turquoise"]);
            .range(['#6988A6', '#C0B865', '#63cafe', '#0B8E78', '#187A6A', '#E53D00', '#3E8914', '#F2CB01', '#21A0A0', '#96E072', '#ED9701', '#B1D856']);

        var chord = d3.layout.chord()
            .padding(.02)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending);
        var arc = d3.svg.arc()
            .innerRadius(r0)
            .outerRadius(r0 + 20);
        var svg = d3.select("svg")
        // .attr("viewBox", `0 0 ${w} ${h}`)
            .attr("width", "95%")
            .attr("height", "50%")
          .append("svg:g")
            .attr("id", "circle")
            .attr("transform", "translate(" + (w / 2 -20 + 80 + 100) + "," + (h / 2-30) + ")");
            svg.append("circle")
                .attr("r", r0 + 20)
                .attr("fill", "none");
        drawChordsLegend(svg)
        var rdr = chordRdr(matrix, mmap);
        chord.matrix(matrix);
        var g = svg.selectAll("g.group")
            .data(chord.groups())
          .enter().append("svg:g")
            .attr("class", "group")
            .on("mouseover", mouseover)
            .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });
        g.append("svg:path")
            .style("stroke", "#51809E")
            .style("stroke-width", "2px")
            .style("fill", function(d) { return fill(d.index); })
            .attr("d", arc);

        g.append("svg:text")
            .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
            .attr("dy", ".35em")
            .style("font-family", "helvetica, arial, sans-serif")
            .style("font-size", "10px")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d) {
              const translateY =characters[rdr(d).gname]==="Moomin-mamma" ? 5 : 0;
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (r0 + 26) + "," + translateY + ")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) {return characters[rdr(d).gname].split('-')[0]; })
            .style("font-family", "Sniglet")
            // .attr("fill","#51809E");
            .attr("fill", function(d,i) {return fill(chord.groups()[i].index); });
        
        g.append("svg:text")
            .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
            .attr("dy", ".35em")
            .style("font-family", "helvetica, arial, sans-serif")
            .style("font-size", "10px")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d) {
              const translateY = d.angle * 180 / Math.PI - 90 > 50 ? -8 : 8;
              const translateYAdditional = characters[rdr(d).gname]==="Moomin-mamma" ? 3 : 0;
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (r0 + 26) + "," + (translateY+translateYAdditional) + ")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) {return characters[rdr(d).gname].split('-')[1]; })
            .style("font-family", "Sniglet")
            .attr("fill", function(d,i) {return fill(chord.groups()[i].index); });
          // console.info(chord.chords());

          var chordPaths = svg.selectAll("path.chord")
                .data(chord.chords())
              .enter().append("svg:path")
                .attr("class", "chord")
                .style("stroke", function(d) { return d3.rgb(fill(d.target.index)).darker(); })
                .style("fill", function(d) { return fill(d.target.index); })
                .attr("d", d3.svg.chord().radius(r0))
                .on("mouseover", function (d) {
                  d3.select("#tooltip")
                    .style("visibility", "visible")
                    .html(chordTip(rdr(d)))
                    .style("top", function () { return (d3.event.pageY - 100)+"px"})
                    .style("left", function () { return (d3.event.pageX - 100)+"px";})
                })
                .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });
          function chordTip (d) {
            var p = d3.format(".2%"), q = d3.format(",.3r")
            return "Chord Info:<br/>"
              + p(d.svalue/d.stotal) + " (" + q(d.svalue) + ") of "
              + d.sname + " prefer " + d.tname
              + (d.sname === d.tname ? "": ("<br/>while...<br/>"
              + p(d.tvalue/d.ttotal) + " (" + q(d.tvalue) + ") of "
              + d.tname + " prefer " + d.sname))
          }
          function groupTip (d) {
            var p = d3.format(".1%"), q = d3.format(",.3r")
            return "Group Info:<br/>"
                + d.gname + " : " + q(d.gvalue) + "<br/>"
                + p(d.gvalue/d.mtotal) + " of Matrix Total (" + q(d.mtotal) + ")"
          }
          function mouseover(d, i) {
            d3.select("#tooltip")
              .style("visibility", "visible")
              .html(groupTip(rdr(d)))
              .style("top", function () { return (d3.event.pageY - 80)+"px"})
              .style("left", function () { return (d3.event.pageX - 130)+"px";})
            chordPaths.classed("fade", function(p) {
              return p.source.index != i
                  && p.target.index != i;
            });
          }
      }