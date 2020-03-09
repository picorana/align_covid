// source: https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv

let width = window.innerWidth*0.9
let height = 5000
let cellheight = 400
let rectsize = 20
//let heightscale = 5000000
let heightscale = 0.05
let separatorlinewidth = 3

let sliderwidth = 500

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('margin-top', '10px')

var sliderSimple = d3
  .sliderBottom()
  .min(0)
  .max(2000)
  .width(sliderwidth)
  .ticks(5)
  .default(400)
  .on('onchange', val => {
    d3.select('p#value-simple').text(d3.format('')(val));
    d3.selectAll('.barchart')
      .transition(20)
      .attr('transform', (d, i) => {
        let translatex = (width/2 - d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > val))*rectsize + separatorlinewidth/2)
        if (val > d["Infected"][d["Infected"].length - 1]["Num"]) return 'translate(10, '+(i*cellheight)+')'
        return 'translate(' + translatex + ', '+(i*cellheight)+')'
    })
  });

  var gSimple = svg
    .append('g')
    .attr('transform', 'translate('+(width/2 - sliderwidth/2)+',30)');

  gSimple.call(sliderSimple);

let pop_values = {
  "Mainland China": 1378665000,
  "Italy": 60600590,
  "France": 66896109,
  "US": 323127513,
  "Spain": 46443959,
  "Germany": 82667685,
  "Switzerland": 8372098
}

let events = {
  "Italy":{
    "2/22" : "North Quarantine",
    "2/29" : "Declared level 3 by CDC",
    "3/4" : "Schools mandatory shutdown",
    "3/7" : "North Lockdown",
  },
  "Spain": {
    "2/12" : "Mobile World Congress cancelled",
    "2/24" : "Tenerife lockdown"
  },
  "Germany": {
    "2/26" : "North Rhine-Westphalia initiates school closures",
    "3/2" : "ECDC raises threat level to high"
  }
}

d3.csv('time_series_19-covid-Confirmed.csv')
  .then((data) => {
    let tmpdict = {}
    for (let record of data){
      let groupby = record["Country/Region"]
      if (tmpdict[groupby] == undefined) tmpdict[groupby] = []
      tmpdict[groupby].push(record)
    }
    //console.log(tmpdict)
    let tmplist = []
    for (let country in tmpdict){
      let countryobj = {"Country" : country, "Infected":[]}
      let datedict = {}
      for (let record of tmpdict[country]) {
        for (let date in record){
          if (date == "Province/State" || date == "Country/Region" || date == "Lat" || date == "Long") continue
          if (datedict[date] == undefined) datedict[date] = 0
          datedict[date] += parseFloat(record[date])
        }
      }
      for (let elem in datedict){
        let num = datedict[elem]
        //if (pop_values[country] != undefined) num = num/pop_values[country]
        countryobj["Infected"].push({"Date":elem, "Num":num, "Country":country})
      }
      tmplist.push(countryobj)
    }

    let translatenum = 400

    tmplist = tmplist.filter(d => d["Country"] != "Others" && d["Country"] != "Mainland China")
    tmplist = tmplist.filter(d => d["Infected"][d["Infected"].length - 1]["Num"] > translatenum)
    //tmplist = tmplist.sort((a, b) => a["Infected"][a["Infected"].length - 1]["Num"] < b["Infected"][b["Infected"].length - 1]["Num"])
    //tmplist = tmplist.filter(d => pop_values[d["Country"]] != undefined)

    let d3line = d3.line()
        .x(d => d[0])
        .y(d => d[1]);

    let chartg = svg.append('g')
      .attr('transform', 'translate(0,200)')

    svg.append('path')
      .attr('d', d3line([[width/2, 0],[width/2, height]]))
      .style('stroke-dasharray', '5 5')
      .attr('stroke', '#aaa')
      .attr('stroke-width', separatorlinewidth)

    svg.append('path')
      .attr('d', d3line([[width/2 + rectsize*7, 0],[width/2 + rectsize*7, height]]))
      .style('stroke-dasharray', '3 3')
      .attr('stroke', '#ddd')
      .attr('stroke-width', separatorlinewidth)

    svg.append('path')
      .attr('d', d3line([[width/2 - rectsize*7, 0],[width/2 - rectsize*7, height]]))
      .style('stroke-dasharray', '3 3')
      .attr('stroke', '#ddd')
      .attr('stroke-width', separatorlinewidth)

    barcharts = chartg.selectAll('.barchart')
      .data(tmplist)
      .enter()
      .append('g')
      .attr('class', 'barchart')
      .attr('transform', (d, i) => {
          let translatex = width/2 - d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > translatenum))*rectsize + separatorlinewidth/2
          return 'translate('+translatex+','+ (i*cellheight) +')'
      })

    rectsection = barcharts.selectAll('.rectsection')
      .data(d => d["Infected"])
      .enter()
      .append("g")
      .attr("class", "rectsection")
      .attr("transform", (d, i) => "translate("+i*rectsize+",0)")

    rectsection.append("rect")
      .attr("width", rectsize*.9)
      .attr("height", d => d["Num"]*heightscale)
      .attr("fill", "orange")

    rectsection.append("text")
      .text(d => {
        if (events[d["Country"]] != undefined && events[d["Country"]][d["Date"].split("/").slice(0,2).join("/")] != undefined) return events[d["Country"]][d["Date"].split("/").slice(0,2).join("/")]
      })
      .attr("transform", "rotate(-90)")
      .attr("font-family", "Arial")
      .attr("font-size", "small")
      .attr("x", d => -d["Num"]*heightscale - 50)
      .attr("y", +15)
      .attr("fill", "gray")
      .attr("text-anchor", "end")

    rectsection.append("text")
      .text(d => d["Num"] != 0? d["Date"].split("/").slice(0,2).join("/") : "")
      .attr("transform", "rotate(-90)")
      .attr("font-family", "Arial")
      .attr("font-size", "small")
      .attr("y", +15)
      .attr("x", 10)
      .attr("fill", "gray")

    rectsection.append("text")
      .text(d => d["Num"] != 0? d["Num"] : "")
      .attr("transform", "rotate(-90)")
      .attr("font-family", "Arial")
      .attr("font-size", "small")
      .attr("y", +15)
      .attr("x", d => -d["Num"]*heightscale - 10)
      .attr("fill", "gray")
      .attr('text-anchor', 'end')

    barcharts
      .append('text')
      .attr("font-family", "Arial")
      .attr("y", cellheight/4)
      .attr("x", d => d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > 0))*rectsize)
      .attr("fill", "#aaa")
      .attr("font-size", "2em")
      .attr("font-weight", "bold")
      .text(d => d["Country"])


      //.data(d => d["Infected"])
      //.data(d[0])
      //.attr('transform', (d, i) => console.log(d))
      // .attr('width', 10)
      // .attr('height', 10)
      // .attr('fill', 'gray')
      // .attr('y', (d, i) => i*20)

  })
