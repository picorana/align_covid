let addconfirmedslider = (scale, translatenum) => {
  let sliderscale = d3.scaleLog()
    .domain([1, scale.domain()[1]])

  var sliderSimple = d3
    .sliderBottom(sliderscale)
    .width(sliderwidth)
    .tickFormat(d3.format(".0s"))
    .ticks(10)
    .default(translatenum)
    .on('onchange', val => {
      d3.select('p#value-simple').text(d3.format('')(val));

        d3.selectAll('.barchart')
          .transition(100)
          .attr('transform', (d, i) => {
              let translatex = (width/2 - d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > val))*rectsize + separatorlinewidth/2)
              if (val > d["Infected"][d["Infected"].length - 1]["Num"]) return 'translate('+ 10 +', '+(i*cellheight)+')'
              return 'translate(' + translatex + ', '+(i*cellheight)+')'
        })
        .attr('opacity', (d, i) => {
          if(val > d["Infected"][d["Infected"].length - 1]["Num"]) return 0.3
          else return 1
        })
        svg.attr('height', d3.selectAll('.barchart').filter(d => d["Infected"][d["Infected"].length - 1]["Num"]).size() * cellheight + cellheight)

    });

    var gSimple = svg
      .append('g')
      .attr('transform', 'translate('+(width/2 - sliderwidth/2)+',10)')

    gSimple.call(sliderSimple);

    tickvaluearray = [1, 10, 100, 1000, 10000]

    gSimple.selectAll('.tick').filter(d => tickvaluearray.indexOf(d) == -1).attr('opacity', 0)
}
