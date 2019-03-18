d3.csv('data/day_data.csv', function (error, data) {
    // console.info(data);
    var mpr = chordMpr(data);
    // console.info(mpr)
    mpr
    .addValuesToMap('from')
    .setFilter(function (row, a, b) {
        // console.info(row, a, b)
        return (row.from === a.name && row.to === b.name)
    })
    .setAccessor(function (recs, a, b) {
        if (!recs[0]) return 0;
        return +recs[0].value;
        });

    // console.info(mpr.getMatrix())
    drawChords(mpr.getMatrix(), mpr.getMap());
 });