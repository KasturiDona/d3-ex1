(function () {
  document.addEventListener('DOMContentLoaded', function () {

    var dataset = _.map(_.range(50), function (i) {
      return Math.random() * 50;
    });

    var margin = {top: 20, right: 30, bottom: 30, left: 30};
    var w = 400 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;

    var svg = d3.select('#chartArea').append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

   var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset) * 1.1 ])
    .range([0, h]);

  // var colorScale = d3.scale.quantile()
  //   .domain([0, dataset.length / 4, dataset.length])
  //   .range(['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']);

  var colorScale = d3.scale.quantize()
    .domain([0, dataset.length])
    .range(['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']);

  // var colorScale = d3.scale.linear()
  //   // .domain([0, d3.max(dataset)])
  //   .domain([0, dataset.length])
  //   .range(['orange', 'purple']);

  var xScale = d3.scale.ordinal()
    .domain(dataset)
    .rangeBands([0, w], 0.2, 0.3);

   var multiplier = 5;

    svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d, i) {
      return xScale(d);
    })
    .attr('y', function (d) {
      return h - yScale(d);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function (d) {
      return yScale(d);
    })
    // .attr('fill', colorScale);
    .attr('fill', function(d, i) {
      return colorScale(i)
    });

  });

}());
