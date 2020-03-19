
let addlegend = () => {
  let g = svg.append('g')
    .attr('transform', 'translate('+ (width/2 + sliderwidth/2 + 50) +', 0)')

  let cradius = 5

  g.append('circle')
    .attr('r', cradius)
    .attr('cy', 50)
    .attr('fill', '#004853')

  g.append('text')
    .attr('font-family', 'Arial')
    .attr('font-size', 'small')
    .attr('y', 55)
    .attr('x', 10)
    .attr('fill', 'black')
    .text('Deaths')

  g.append('circle')
    .attr('r', cradius)
    .attr('cy', 30)
    .attr('fill', '#00B9BD')

  g.append('text')
    .attr('font-family', 'Arial')
    .attr('font-size', 'small')
    .attr('y', 35)
    .attr('x', 10)
    .attr('fill', 'black')
    .text('Recovered')

  g.append('circle')
    .attr('r', cradius)
    .attr('cy', 10)
    .attr('fill', "#FB6900")

  g.append('text')
    .attr('font-family', 'Arial')
    .attr('font-size', 'small')
    .attr('y', 15)
    .attr('x', 10)
    .attr('fill', 'black')
    .text('Confirmed cases')
}

let mktopdiv = () => {
  let topdiv = document.createElement('div')
  topdiv.style.margin = '20px'
  topdiv.style.position = 'absolute'
  topdiv.style.top = 0

  let lefttitle = document.createElement('div')
  lefttitle.innerHTML = 'Comparing outbreaks'
  lefttitle.style.color = '#aaa'
  lefttitle.style.fontSize = 'x-large'
  lefttitle.style.fontWeight = 'bold'
  topdiv.appendChild(lefttitle)

  let lefttext = document.createElement('div')
  lefttext.innerHTML = "The following chart reports the current state of the coronavirus outbreak in different countries, aligned by number of infected people. Use the slider on top to change the alignment value. <br> A number of relevant events is reported under each subchart. Countries are sorted by current number of infected population. The purpose of the chart is to compare events at different points of the outbreak, and perhaps try to understand what to expect in the next few days. Understanding events while being out of the context is hard, so all help in populating the relevant events is welcome in <a href='https://github.com/picorana/align_covid/issues'>the issues of the repository</a>. <br> Data source: <a href='https://github.com/CSSEGISandData/COVID-19'>https://github.com/CSSEGISandData/COVID-19</a> and <a href='https://github.com/pcm-dpc/COVID-19'>https://github.com/pcm-dpc/COVID-19</a>"
  lefttext.style.width = '70%'
  lefttext.style.fontSize = 'small'
  topdiv.appendChild(lefttext)

  let rightinfo = document.createElement('div')
  rightinfo.innerHTML = '<a href="https://github.com/picorana/align_covid/issues">Report an issue or incorrect information</a><br><a href="https://github.com/picorana/align_covid" aria-label="Star picorana/align_covid on GitHub">See it on github</a><br>Author: <a href="https://picorana.github.io/">picorana</a><br><a class="github-button" href="https://github.com/picorana" data-size="large" data-show-count="true" aria-label="Follow @picorana on GitHub">Follow @picorana</a><br><a class="github-button" href="https://github.com/picorana/align_covid" data-icon="octicon-star" data-size="large" aria-label="Star picorana/align_covid on GitHub">Star</a>'
  rightinfo.style.position = 'absolute'
  rightinfo.style.textAlign = 'right'
  rightinfo.style.top = '20px'
  rightinfo.style.right = '20px'
  topdiv.appendChild(rightinfo)

  let centerlinks = document.createElement('div')
  centerlinks.style.textAlign = 'center'
  centerlinks.style.marginTop = '2%'
  centerlinks.style.color = '#888'
  centerlinks.innerHTML = 'See: <a href="./">World</a>  ●  <a href="./us_states.html">US States</a> ● <a href="./italy.html">Italian Regions</a>'
  topdiv.append(centerlinks)

  let showgrowth = (val) => {
    showing_growth = val
    if (val){
      d3.selectAll('.rectbox')
        .transition(500)
        .attr('opacity', 0.2)
      d3.selectAll('.casestext')
        .transition(500)
        .attr('opacity', 0.2)
      d3.selectAll('.eventtext')
        .transition(500)
        .attr('opacity', 0.2)

      d3.selectAll('.growthpath')
        .transition(500)
        .attr('opacity', 1)
      d3.selectAll('.growthaxis')
        .transition(500)
        .attr('opacity', 1)
    } else {
      if (!showing_death_growth){
        d3.selectAll('.rectbox')
          .transition(500)
          .attr('opacity', 1)
        d3.selectAll('.casestext')
          .transition(500)
          .attr('opacity', 1)
        d3.selectAll('.eventtext')
          .transition(500)
          .attr('opacity', 1)
      }

      d3.selectAll('.growthpath')
        .transition(500)
        .attr('opacity', 0)
      d3.selectAll('.growthaxis')
        .transition(500)
        .attr('opacity', 0)
    }
  }

  let showdeathgrowth = (val) => {
    showing_death_growth = val
    if (val){
      d3.selectAll('.rectbox')
        .transition(500)
        .attr('opacity', 0.2)
      d3.selectAll('.casestext')
        .transition(500)
        .attr('opacity', 0.2)
      d3.selectAll('.eventtext')
        .transition(500)
        .attr('opacity', 0.2)

      d3.selectAll('.deathgrowthpath')
        .transition(500)
        .attr('opacity', 1)
      d3.selectAll('.deathgrowthaxis')
        .transition(500)
        .attr('opacity', 1)
    } else {
      if (!showing_growth){
        d3.selectAll('.rectbox')
          .transition(500)
          .attr('opacity', 1)
        d3.selectAll('.casestext')
          .transition(500)
          .attr('opacity', 1)
        d3.selectAll('.eventtext')
          .transition(500)
          .attr('opacity', 1)
      }

      d3.selectAll('.deathgrowthpath')
        .transition(500)
        .attr('opacity', 0)
      d3.selectAll('.deathgrowthaxis')
        .transition(500)
        .attr('opacity', 0)
    }
  }

  let optiondiv = document.createElement('div')
  optiondiv.style.textAlign = "center"
  optiondiv.style.marginTop = "10px"
  optiondiv.style.display = "flex"
  optiondiv.style.justifyContent = "center"

  let genswitch = (text, appelem, fname) => {
    let t = document.createElement('div')
    t.innerHTML = text
    let switchlabel = document.createElement('label')
    switchlabel.className = "switch"
    let growthswitch = document.createElement('input')
    growthswitch.type = "checkbox"
    growthswitch.oninput = (input) => fname(input.target.checked)
    let growthspan = document.createElement('span')
    growthspan.className = "rslider round"
    switchlabel.appendChild(growthswitch)
    switchlabel.appendChild(growthspan)
    t.append(switchlabel)
    t.style.fontSize = '0.8em'
    t.style.textAlign = 'right'
    switchlabel.style.marginBottom = '1px'
    appelem.appendChild(t)
    return t
  }

  grdiv = document.createElement('div')
  grdiv.innerHTML = 'Growth'
  grdiv.style.border = 'solid 4px #ddd'
  grdiv.style.padding = '5px'
  optiondiv.appendChild(grdiv)

  scalediv = document.createElement('div')
  scalediv.innerHTML = 'Scales'
  scalediv.style.border = 'solid 4px #ddd'
  scalediv.style.padding = '5px'
  scalediv.style.marginLeft = '10px'
  optiondiv.appendChild(scalediv)

  viewdiv = document.createElement('div')
  viewdiv.innerHTML = 'Views'
  viewdiv.style.border = 'solid 4px #ddd'
  viewdiv.style.padding = '5px'
  viewdiv.style.marginLeft = '10px'
  optiondiv.appendChild(viewdiv)

  let tonlydeaths = genswitch("Show deaths only: ", viewdiv, showDeathsOnly)
  let tgrowth = genswitch("Show growth: ", grdiv, showgrowth)
  let tdgrowth = genswitch("Show death growth: ", grdiv, showdeathgrowth)
  let tunique = genswitch("Unique scale by country: ", scalediv, useUniqueScalePerCountry)
  let tnormalize = genswitch("Normalize by population: ", scalediv, normalizeByPopulation)

  topdiv.appendChild(optiondiv)

  document.body.appendChild(topdiv)

  return topdiv
}
