(function() {
  document.addEventListener('DOMContentLoaded', function() {

    function steppedTransition (selection) {
      selection
      .transition()
      .duration(500)
      .attr('cx', function (d) {
        return xScale(d.x);
      })
      .style('fill', 'red')
      .transition()
      .duration(500)
      .attr('cy', function (d) {
        return yScale(d.y);
      })
      .style('fill', 'blue')
      .transition()
      .duration(500)
      .attr('r', function (d) {
        return d.r;
      })
      .style('fill', 'yellow')
      .transition()
      .duration(500);
    }

    function plainTransition (selection, dur) {
      selection
      .transition()
      .duration(dur)
      .attr('cx', function (d) {
        return xScale(d.x);
      })
      .attr('cy', function (d) {
        return yScale(d.y);
      })
      .attr('r', function (d) {
        return d.r;
      })
      .style('fill', 'yellow')
      .transition();
    }

    function newData(datum) {
      datum.x = Math.round(Math.random() * 100),
      datum.y = Math.round(Math.random() * 100),
      datum.r = Math.round(5 + Math.random() * 10);
    }

    var dataset = _.map(_.range(25), function(i) {
      return {
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100),
        r: Math.round(5 + Math.random() * 10)
      };
    });
    dataset.push({x: 0, y: 0, r: 0});

    $("#update").click(function() {
      svg.selectAll('circle')
        .filter(function (d) {
          return d.x < 50;
        })
        .each(newData)
        .call(plainTransition, 2000);

      svg.selectAll('circle')
        .filter(function (d) {
          return d.x > 50;
        })
        .each(newData)
        .call(steppedTransition);
    })

    var margin = {
      top: 20,
      right: 20,
      bottom: 60,
      left: 60
    };
    var w = 400 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;

    var svg = d3.select('#chartArea').append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    var xScale = d3.scale.linear()
      .domain([0, 100])
      .range([0, w]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(5)
      .innerTickSize(6)
      .outerTickSize(12)
      .tickPadding(12);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, '+ (h + 20) + ')')
      .call(xAxis);

    var yScale = d3.scale.linear()
      .domain([0, 100])
      .range([h, 0]);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(5)
      .innerTickSize(6)
      .outerTickSize(12)
      .tickPadding(12);

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-20, 0)')
      .call(yAxis);

    svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', function(d) {
        return xScale(d.x);
      })
      .attr('cy', function(d) {
        return yScale(d.y);
      })
      .attr('r', function(d) {
        return d.r;
      });

  });

}());
