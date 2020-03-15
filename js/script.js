// source: https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv

let width = window.innerWidth*0.98
let height = 5000
let cellheight = 350
let rectsize = 15
//let heightscale = 5000000
let heightscale = 0.02
let separatorlinewidth = 2

let sliderwidth = 500
let animating = false

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('margin-top', '10px')

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
    "2/29" : "Declared CDC level 3",
    "3/4" : "Schools mandatory shutdown",
    "3/7" : "North Lockdown",
    "3/9" : "Statewide lockdown",
    "3/11" : "Only bare necessities allowed"
  },
  "Spain": {
    "2/12" : "Mobile World Congress cancelled",
    "2/24" : "Tenerife lockdown",
    "3/9" : "Schools in Madrid closed",
    "3/11" : "Events with > 1000 cancelled"
  },
  "Germany": {
    "2/26" : "first school closures",
    "3/2" : "ECDC threat level high",
    "3/10" : "Events with > 1000 cancelled"
  },
  "Iran": {
    "2/28" : "Declared CDC level 3"
  },
  "South Korea": {
    "2/24" : "Declared CDC level 3"
  },
  "US" : {
    "3/10" : "first school closures"
  },
  "Switzerland":{
    "2/28" : "Events with > 1000 cancelled"
  },
  "Japan" : {
    "2/27" : "Mandatory school shutdown"
  },
  "Norway" : {
    "3/10" : "Community transmission reported"
  },
  "Netherlands" : {
    "3/1" : "Community transmission reported",
    "3/10" : "Large events banned"
  },
  "Sweden" : {
    "3/9" : "Community transmission reported",
    "3/11" : "Large events banned"
  },
  "UK" : {
    "2/28" : "first school closures",
  },
  "Republic of Korea" : {
    "2/20" : "Military bases lockdown",
    "2/24" : "CDC level 3",
  },
  "Lombardia" : {
    "03/07" : "Lockdown"
  }

}

let d3line = d3.line()
    .x(d => d[0])
    .y(d => d[1]);

let getDataFromAltState = (data, record, firstName, secondName) => {
  r = {"Country/Region": firstName}
  altstate = data.find(r => r["Country/Region"] == secondName)
  for (let date in record){
    if (date == "Province/State" || date == "Country/Region" || date == "Lat" || date == "Long") continue
    else r[date] = parseFloat(record[date]) + parseFloat(altstate[date])
    if (record[date] == "") r[date] = parseInt(altstate[date])
  }
  return r
}

let getInfected = (data, groupbyname, filterbyname) => {
  let tmpdict = {}
  ussum = 0
  for (let record of data){
    if (filterbyname != undefined){
      if (record["Country/Region"] != filterbyname) continue
    }

    // if (record[groupbyname] == "Iran") record = getDataFromAltState(data, record, "Iran", "Iran (Islamic Republic of)")
    // if (record[groupbyname] == "Iran (Islamic Republic of)") continue
    //
    // if (record[groupbyname] == "Republic of Korea") record = getDataFromAltState(data, record, "Republic of Korea", "Korea, South")
    // if (record[groupbyname] == "Korea, South") continue
    //
    // if (record[groupbyname] == "UK") record = getDataFromAltState(data, record, "UK", "United Kingdom")
    // if (record[groupbyname] == "United Kingdom") continue

    if (record["3/11/20"] == "") delete record["3/11/20"]

    let groupby = record[groupbyname]
    if (tmpdict[groupby] == undefined) tmpdict[groupby] = []
    tmpdict[groupby].push(record)
  }

  let tmplist = []
  for (let country in tmpdict){
    let countryobj = {"Country" : country, "Infected":[]}
    let datedict = {}
    for (let record of tmpdict[country]) {
      for (let date in record){
        if (country == "US"){
          if (date == "3/10/20" && states.indexOf(record["Province/State"]) == -1) continue
        }
        if (date == "Province/State" || date == "Country/Region" || date == "Lat" || date == "Long") continue
        if (datedict[date] == undefined) datedict[date] = 0
        if (record[date] == "") continue
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

  return tmplist
}

let filterItaly = (data, groupbyname, filterbyname) => {
  let tmpdict = {}
  for (let record of data){
    let groupby = record["denominazione_regione"]
    if (tmpdict[groupby] == undefined) tmpdict[groupby] = []
    tmpdict[groupby].push(record)
  }

  let tmplist = []
  for (let region in tmpdict){
    let countryobj = {"Country" : region, "Infected":[]}
    for (let record of tmpdict[region]) {
      let numvar = 'totale_casi'
      if (groupbyname == "Confirmed") numvar = 'totale_casi'
      else if (groupbyname == "Deaths") numvar = "deceduti"
      else if (groupbyname == "Recovered") numvar = "dimessi_guariti"
      let date = record["data"].split(' ')[0].split('-').slice(1,3).join('/')
      countryobj["Infected"].push({"Date": date, "Num":parseInt(record[numvar]), "Country":region})
    }
    tmplist.push(countryobj)

  }

  return tmplist
}

let filterUS = (data, groupbyname, filterbyname) => {
  let tmpdict = {}
  for (let record of data){
    if (filterbyname != undefined){
      if (record["Country/Region"] != filterbyname) continue
    }

    if (record["3/11/20"] == "" && states.indexOf(record["Province/State"]) == -1) delete record["3/11/20"]
    //if (states.indexOf(record["Province/State"]) != -1) delete record["3/10/20"]

    //console.log(record)
    let groupby = ''
    if (states.indexOf(record["Province/State"]) == -1 && record["Province/State"] != "Diamond Princess" && record["Province/State"] != "Grand Princess")
      groupby = state_abbr[record[groupbyname].split(',')[1].trim()]
    else groupby = record[groupbyname]
    if (groupby == undefined) continue
    if (groupby == "Diamond Princess" || groupby == "Grand Princess") continue
    //console.log(groupby, state_abbr[groupby])
    if (tmpdict[groupby] == undefined) tmpdict[groupby] = []
    tmpdict[groupby].push(record)
  }

  let tmplist = []
  for (let country in tmpdict){
    let countryobj = {"Country" : country, "Infected":[]}
    let datedict = {}
    for (let record of tmpdict[country]) {
      for (let date in record){

        //if (date == "3/10/20" && states.indexOf(record["Province/State"]) == -1) continue

        if (date == "Province/State" || date == "Country/Region" || date == "Lat" || date == "Long") continue
        if (datedict[date] == undefined) datedict[date] = 0
        if (record[date] == "") continue
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

  return tmplist
}

  let drawGuidelines = () => {

    for (i in [...new Array(5)]){
      svg.append('path')
        .attr('d', d3line([[width/2 + rectsize*(2-i)*7, 80],[width/2 + rectsize*(2-i)*7, height]]))
        .style('stroke-dasharray', i==2? '5 5':'3 3')
        .attr('stroke', i==2? '#aaa' : '#eee')
        .attr('stroke-width', separatorlinewidth)
    }
  }

  let draw = (dataCases, dataRecovered, dataDeaths, translatenum, cutoffnum, scale, groupbyname, filterbyname = undefined) => {
    d3.csv(dataCases)
      .then((data) => {
        d3.csv(dataRecovered)
          .then((datarecovered) => {
            d3.csv(dataDeaths)
              .then((datadeaths) => {

        let d3line = d3.line()
            .x(d => d[0])
            .y(d => d[1]);

        let chartg = svg.append('g')
          .attr('transform', 'translate(0,200)')

        drawGuidelines()

        tmplist = []
        deathlist = []
        recoveredlist = []

        if (filterbyname == "US"){
          tmplist = filterUS(data, groupbyname, filterbyname)
          deathlist = filterUS(datadeaths, groupbyname, filterbyname)
          recoveredlist = filterUS(datarecovered, groupbyname, filterbyname)
        } else if (filterbyname == "Italy") {
          tmplist = filterItaly(data, "Confirmed")
          deathlist = filterItaly(datadeaths, "Deaths")
          recoveredlist = filterItaly(datarecovered, "Recovered")
        } else {
          tmplist = getInfected(data, groupbyname, filterbyname)
          deathlist = getInfected(datadeaths, groupbyname, filterbyname)
          recoveredlist = getInfected(datarecovered, groupbyname, filterbyname)
        }

        tmplist = tmplist.filter(d => d["Country"] != "Others" && d["Country"] != "Mainland China" && d["Country"] != "China" && d["Country"] != "Cruise Ship")
        tmplist = tmplist.filter(d => d["Infected"][d["Infected"].length - 1]["Num"] > cutoffnum)
        tmplist = tmplist.sort((a, b) => a["Infected"][a["Infected"].length - 1]["Num"] < b["Infected"][b["Infected"].length - 1]["Num"]? 1: -1)

        barcharts = chartg.selectAll('.barchart')
          .data(tmplist)
          .enter()
          .append('g')
          .attr('class', 'barchart')
          .attr('transform', (d, i) => {
              // let translatex = width/2 - d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > translatenum))*rectsize + separatorlinewidth/2
              // return 'translate('+translatex+','+ (i*cellheight) +')'
              let translatex = (width/2 - d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > translatenum))*rectsize + separatorlinewidth/2)
              if (translatenum > d["Infected"][d["Infected"].length - 1]["Num"]) return 'translate('+ 10 +', '+(i*cellheight)+')'
              return 'translate(' + translatex + ', '+(i*cellheight)+')'
          })
          .attr('opacity', (d, i) => {
            if(translatenum > d["Infected"][d["Infected"].length - 1]["Num"]) return 0.3
            else return 1
          })

        rectsection = barcharts.selectAll('.rectsection')
          .data(d => d["Infected"])
          .enter()
          .append("g")
          .attr("class", "rectsection")
          .attr("transform", (d, i) => "translate("+i*rectsize+",0)")

        //let scale = linearScale

        let rectbox = rectsection.append('g')
          .attr('class', 'rectbox')

        rectbox.append("rect")
          .attr("width", rectsize*.9)
          .attr("height", d => scale(d["Num"]))
          .attr("fill", "#FB6900")
          .attr('class', 'confirmedrect')

        rectbox
          .append('rect')
          .attr('width', rectsize*.9)
          .attr('height', d => {
            if (deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"]) == undefined) return 0
            else return scale(deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"])
          })
          .attr('fill', '#004853')
          .attr('class', 'deathrect')

        rectbox
          .append('rect')
          .attr('width', rectsize*.9)
          .attr('y', d => {
            if (deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"]) == undefined) return 0
            else return scale(deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"])
          })
          .attr('height', d => {
            if (filterbyname == "Italy"){
              return scale(recoveredlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"])
            } else {
              let numrec = recoveredlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]
              let numdead = 0
              if (deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"]) == undefined) numdead = 0
              else numdead = deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]
              return scale(numrec + numdead) - scale(numdead)
            }

          })
          .attr('fill', '#00B9BD')
          .attr('class', 'recoveredrect')

        rectsection.append("text")
          .text(d => {
            if (events[d["Country"]] != undefined && events[d["Country"]][d["Date"].split("/").slice(0,2).join("/")] != undefined) return events[d["Country"]][d["Date"].split("/").slice(0,2).join("/")]
          })
          .attr("transform", "rotate(-90)")
          .attr("font-family", "Arial")
          .attr("font-size", "small")
          .attr('class', 'eventtext')
          .attr("x", d => d["Num"] < scale.domain()[1]/2? -scale(d["Num"]) - 50 : -10)
          .attr("y", +rectsize*3/4)
          .attr("fill", d => d["Num"] < scale.domain()[1]/2? "gray" : "white")
          .attr("text-anchor", d=> d["Num"] != scale.domain()[1]/2? "end" : "start")

        rectsection.append("text")
          .text(d => d["Num"] != 0? d["Date"].split("/").slice(0,2).join("/") : "")
          .attr("transform", "rotate(-90)")
          .attr("font-family", "Arial")
          .attr("font-size", "x-small")
          .attr("y", +rectsize*3/4)
          .attr("x", 10)
          .attr("fill", "gray")

        rectsection.append("text")
          .text(d => d["Num"] != 0? d["Num"] : "")
          .attr("transform", "rotate(-90)")
          .attr("font-family", "Arial")
          .attr("font-size", "x-small")
          .attr("class", "casestext")
          .attr("y", +rectsize*3/4)
          .attr("x", d => -scale(d["Num"]) - 10)
          .attr("fill", "gray")
          .attr('text-anchor', 'end')

        if (isMobile || true){
          for (elem of tmplist){
            svg
              .append('text')
              .attr("font-family", "Arial")
              .attr("y", tmplist.indexOf(elem)*cellheight + cellheight/2 + 80)
              .attr("x", 50)
              .attr("fill", "#aaa")
              .attr("font-size", "2em")
              .attr("font-weight", "bold")
              .text(elem["Country"])
          }
        } else {
          barcharts
            .append('text')
            .attr("font-family", "Arial")
            .attr("y", cellheight/4)
            .attr("x", d => d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > 0))*rectsize + rectsize)
            .attr("fill", "#aaa")
            .attr("font-size", "2em")
            .attr("font-weight", "bold")
            .text(d => d["Country"])
            .attr('stroke', 'white')
            .attr('stroke-width', 5)
          barcharts
            .append('text')
            .attr("font-family", "Arial")
            .attr("y", cellheight/4)
            .attr("x", d => d["Infected"].indexOf(d["Infected"].find(e => e["Num"] > 0))*rectsize + rectsize)
            .attr("fill", "#aaa")
            .attr("font-size", "2em")
            .attr("font-weight", "bold")
            .text(d => d["Country"])
        }

          svg.attr('height', d3.selectAll('.barchart').filter(d => d["Infected"][d["Infected"].length - 1]["Num"]).size() * cellheight + cellheight)

          drawGrowthRates(tmplist, scale, rectsection)
          addconfirmedslider(scale, translatenum)
          //useUniqueScalePerCountry(rectsection, tmplist, deathlist, recoveredlist, filterbyname)
      })
      })
    })
  }

let useUniqueScalePerCountry = (val, filterbyname = undefined) => {
  let confirmedlist = tmplist
  let countrymaxvals = {}
  for (let c in confirmedlist){
    let country = confirmedlist[c]["Country"]
    let gconf = confirmedlist.find(e => e["Country"] == country)["Infected"]
    let maxval = gconf[gconf.length - 1]["Num"]
    countrymaxvals[country] = maxval
  }

  let transitiontime = 1000

  rectsection.selectAll('.confirmedrect')
    .transition(transitiontime)
    .attr('height', d => {
      let newscale = d3.scaleLinear()
        .domain([1, countrymaxvals[d["Country"]]])
        .range([0, cellheight*0.8])
      return newscale(d["Num"])
    })

  rectsection.selectAll('.casestext')
  .transition(transitiontime)
  .attr('x', d => {
    let newscale = d3.scaleLinear()
      .domain([1, countrymaxvals[d["Country"]]])
      .range([0, cellheight*0.8])
    return -newscale(d["Num"]) - 10
  })

  rectsection.selectAll('.eventtext')
  .transition(transitiontime)
  .attr('x', d => {
    let newscale = d3.scaleLinear()
      .domain([1, countrymaxvals[d["Country"]]])
      .range([0, cellheight*0.8])
    return d["Num"] < newscale.domain()[1]/2? -newscale(d["Num"]) - 50 : -10
  })

  rectsection.selectAll('.deathrect')
  .transition(transitiontime)
    .attr('height', d => {
      let newscale = d3.scaleLinear()
        .domain([1, countrymaxvals[d["Country"]]])
        .range([0, cellheight*0.8])
      if (deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"]) == undefined) return 0
      else return newscale(deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"])
    })

  rectsection.selectAll('.recoveredrect')
  .transition(transitiontime)
  .attr('y', d => {
    let newscale = d3.scaleLinear()
      .domain([1, countrymaxvals[d["Country"]]])
      .range([0, cellheight*0.8])
    if (deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"]) == undefined) return 0
    else return newscale(deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"])
  })
  .attr('height', d => {
    let newscale = d3.scaleLinear()
      .domain([1, countrymaxvals[d["Country"]]])
      .range([0, cellheight*0.8])
    if (filterbyname == "Italy"){
      return newscale(recoveredlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"])
    } else {
      let numrec = recoveredlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]
      let numdead = 0
      if (deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"]) == undefined) numdead = 0
      else numdead = deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]
      return newscale(numrec + numdead) - newscale(numdead)
    }

  })
}

let drawGrowthRates = (tmplist, scale, rectsection) => {

  let growthrates = []
  for (let n in tmplist){
    countrylist = []
    country = tmplist[n]["Country"]
    countryobj = {"Country": country, "Infected":countrylist}
    for (let ev in tmplist[n]["Infected"]) {
      if (ev == 0) continue
      // se cresce da 17 a 20
      // (20-17) : 20 = x : 100
      // 100*diff/curr
      let newval = tmplist[n]["Infected"][ev]["Num"]
      let oldval = tmplist[n]["Infected"][ev-1]["Num"]
      let diff = newval - oldval
      //if (diff == 0) diff = 0.01
      let val = 100*(diff)/oldval
      countrylist.push({"Num": val, "Date": tmplist[n]["Infected"][ev]["Date"], "Country":country})
    }
    growthrates.push(countryobj)
  }

  linecharts = barcharts.append('g')

  let linechartscale = d3.scaleLinear()
    .domain([1, 100])
    .range([0, scale.range()[1]])
    .clamp(true)

  var axis = d3.axisRight(linechartscale)
    .tickFormat(d => d + '%')
    .tickSize(- growthrates[0]["Infected"].length*rectsize)

  linecharts.append("g")
    .attr("transform", "translate("+(growthrates[0]["Infected"].length*rectsize + rectsize*2)+")")
    .call(axis)
    .attr('class', 'growthaxis')
    .attr('opacity', 0)

  linecharts.selectAll('.domain')
    .attr('opacity', 0.2)

  linecharts.selectAll('.tick').select('line')
    .attr('stroke-dasharray', '3 3')
    .attr('color', '#ccc')

  linecharts.append('path')
    .attr('d', d => {
      let grate = growthrates.find(el => el["Country"] == d["Country"])["Infected"]
      let tmparr = []
      for (let el in grate){
        if (isNaN(grate[el]["Num"])) continue
        if (grate[el]["Num"] < linechartscale.domain()[0]) continue
        if (d["Infected"].find(e => e["Date"] == grate[el]["Date"])["Num"] < 50) continue
        //if (grate[el]["Num"] > linechartscale.domain()[1]) tmparr.push([(el)*rectsize + rectsize*1.5, linechartscale(100)])
        //if (grate[el]["Num"] == 0) continue
        tmparr.push([(el)*rectsize + rectsize*1.5, linechartscale(grate[el]["Num"])])
      }
      return d3line(tmparr)
    })
    .attr('stroke', 'red')
    .attr('class', 'growthpath')
    .attr('stroke-width', 1)
    .attr('fill', 'none')
    .attr('opacity', 0)

}

  let drawChina = () => {
    let translatenum = 300
    let cutoffnum = 300

    let logScale = d3.scaleSymlog()
    .domain([0, 80000])
    .range([0, cellheight*0.8]);

    let linearScale = d3.scaleLinear()
    .domain([0, 80000])
    .range([0, cellheight*0.8])

    fileCases = 'data/time_series_19-covid-Confirmed.csv'
    fileRecovered = 'data/time_series_19-covid-Recovered.csv'
    fileDeaths = 'data/time_series_19-covid-Deaths.csv'
    draw(fileCases, fileRecovered, fileDeaths, translatenum, cutoffnum, logScale, "Province/State", "Mainland China")
  }

  let drawUS = () => {
    let translatenum = 20
    let cutoffnum = 20

    let logScale = d3.scaleSymlog()
    .domain([0, 1000])
    .range([0, cellheight*0.8]);

    let linearScale = d3.scaleLinear()
    .domain([0, 600])
    .range([0, cellheight*0.8])

    fileCases = 'data/time_series_19-covid-Confirmed-correct.csv'
    fileRecovered = 'data/time_series_19-covid-Recovered-correct.csv'
    fileDeaths = 'data/time_series_19-covid-Deaths-correct.csv'
    draw(fileCases, fileRecovered, fileDeaths, translatenum, cutoffnum, linearScale, "Province/State", "US")
  }

  let drawItaly = () => {
    let translatenum = 200
    let cutoffnum = 30
    let linearScale = d3.scaleLinear()
    .domain([0, 12000])
    .range([0, cellheight*0.8])

    fileCases = 'data/dpc-covid19-ita-regioni.csv'
    fileRecovered = 'data/dpc-covid19-ita-regioni.csv'
    fileDeaths = 'data/dpc-covid19-ita-regioni.csv'
    draw(fileCases, fileRecovered, fileDeaths, translatenum, cutoffnum, linearScale, "", "Italy")
  }

  let drawCountries = () => {
    let translatenum = 300
    let cutoffnum = 300
    let linearScale = d3.scaleLinear()
    .domain([0, 18000])
    .range([0, cellheight*0.8])

    fileCases = 'data/time_series_19-covid-Confirmed-correct.csv'
    fileRecovered = 'data/time_series_19-covid-Recovered-correct.csv'
    fileDeaths = 'data/time_series_19-covid-Deaths-correct.csv'
    draw(fileCases, fileRecovered, fileDeaths, translatenum, cutoffnum, linearScale, "Country/Region")
  }
