var w = 600;
var h = 400;
var path;
var subjects;

$.getJSON('./data.json', function (json) {
  subjects = json;

  _.keys(subjects).forEach(function (subject) {
    subjects[subject].forEach(function (d) {
      d.date = d3.time.format("%Y%m%d").parse(d.date);
    });
  });

  path = d3
    .select('#chartArea')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .append('g')
    .append('path');

    updateChart('math');

});

function updateChart(subject) {
  var data = subjects[subject];
  var dates = _.pluck(data, 'date');
  var counts = _.pluck(data, 'count');

  var x = d3.time.scale()
    .domain(d3.extent(dates))
    .range([0, w]);

  var y = d3.scale.linear()
    .domain(d3.extent(counts))
    .range([h, 0]);

  // var line = d3.svg.line()
  //   .interpolate('bundle')
  //   .x(function (d) {
  //     return x(d.date);
  //   })
  //   .y(function (d) {
  //     return y(d.count);
  //   });

    var area = d3.svg.area()
      .interpolate('bundle')
      .x(function (d) {
        return x(d.date);
      })
      .y0(function (d) {
        return y(0);
      })
      .y1(function (d) {
        return y(d.count);
      });

  path
    .datum(data)
    .transition()
    .duration(450)
    .attr('d', line);
}
