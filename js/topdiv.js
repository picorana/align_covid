let topdiv = document.createElement('div')
topdiv.style.margin = '20px'

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
centerlinks.innerHTML = 'See: <a href="/">World</a>  ●  <a href="./us_states.html">US States</a> ● <a href="./italy.html">Italian Regions</a>'
topdiv.append(centerlinks)

let showgrowth = (val) => {
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
    d3.selectAll('.rectbox')
      .transition(500)
      .attr('opacity', 1)
    d3.selectAll('.casestext')
      .transition(500)
      .attr('opacity', 1)
    d3.selectAll('.eventtext')
      .transition(500)
      .attr('opacity', 1)

    d3.selectAll('.growthpath')
      .transition(500)
      .attr('opacity', 0)
    d3.selectAll('.growthaxis')
      .transition(500)
      .attr('opacity', 0)
  }
}

let optiondiv = document.createElement('div')
optiondiv.style.textAlign = "center"
optiondiv.style.marginTop = "10px"
let optiontext1 = document.createElement('div')
optiontext1.innerHTML = "Show growth: "
optiondiv.appendChild(optiontext1)
let switchlabel = document.createElement('label')
switchlabel.className = "switch"
let growthswitch = document.createElement('input')
growthswitch.type = "checkbox"
growthswitch.oninput = (input) => showgrowth(input.target.checked)
let growthspan = document.createElement('span')
growthspan.className = "rslider round"
switchlabel.appendChild(growthswitch)
switchlabel.appendChild(growthspan)
optiondiv.appendChild(switchlabel)
topdiv.appendChild(optiondiv)

document.body.appendChild(topdiv)
