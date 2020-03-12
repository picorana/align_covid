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

let topdiv = document.createElement('div')
topdiv.style.margin = '20px'

let lefttitle = document.createElement('div')
lefttitle.innerHTML = 'Comparing outbreaks'
lefttitle.style.color = '#aaa'
lefttitle.style.fontSize = 'x-large'
lefttitle.style.fontWeight = 'bold'
topdiv.appendChild(lefttitle)

let lefttext = document.createElement('div')
lefttext.innerHTML = "The following chart reports the current state of the coronavirus outbreak in different countries, aligned by number of infected people. Use the slider on top to change the alignment value. <br> A number of relevant events is reported under each subchart. Countries are sorted by current number of infected population. The purpose of the chart is to compare events at different points of the outbreak, and perhaps try to understand what to expect in the next few days. Understanding events while being out of the context is hard, so all help in populating the relevant events is welcome in <a href='https://github.com/picorana/align_covid/issues'>the issues of the repository</a>. <br> Data source: <a href='https://github.com/CSSEGISandData/COVID-19'>https://github.com/CSSEGISandData/COVID-19</a> "
lefttext.style.width = '70%'
lefttext.style.fontSize = 'small'
topdiv.appendChild(lefttext)

let rightinfo = document.createElement('div')
rightinfo.innerHTML = '<a href="https://github.com/picorana/align_covid/issues">Report an issue or incorrect information</a><br><a href="https://github.com/picorana/align_covid">See it on github</a><br>Author: <a href="https://picorana.github.io/">picorana</a>'
rightinfo.style.position = 'absolute'
rightinfo.style.textAlign = 'right'
rightinfo.style.top = '20px'
rightinfo.style.right = '20px'
topdiv.appendChild(rightinfo)

document.body.appendChild(topdiv)

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('margin-top', '10px')

let sliderscale = d3.scaleLog()
  .domain([1, 10000])

var sliderSimple = d3
  .sliderBottom(sliderscale)
  //.min(0)
  //.max(2000)
  .width(sliderwidth)
  .tickFormat(d3.format(".0s"))
  .ticks(10)
  .default(300)
  .on('onchange', val => {
    //val = Math.log(val);
    d3.select('p#value-simple').text(d3.format('')(val));

      d3.selectAll('.barchart')
        .transition(100)
        .attr('transform', (d, i) => {
            animating = true
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
    .attr('transform', 'translate('+(width/2 - sliderwidth/2)+',30)');

  gSimple.call(sliderSimple);

  tickvaluearray = [1, 10, 100, 1000, 10000]

  d3.selectAll('.tick').filter(d => tickvaluearray.indexOf(d) == -1).attr('opacity', 0)


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
    "3/9" : "Statewide lockdown"
  },
  "Spain": {
    "2/12" : "Mobile World Congress cancelled",
    "2/24" : "Tenerife lockdown"
  },
  "Germany": {
    "2/26" : "first school closures",
    "3/2" : "ECDC threat level high"
  },
  "Iran": {
    "2/28" : "Declared CDC level 3"
  },
  "South Korea": {
    "2/24" : "Declared CDC level 3"
  }
}

let states = ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"]

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

    if (record[groupbyname] == "Iran") record = getDataFromAltState(data, record, "Iran", "Iran (Islamic Republic of)")
    if (record[groupbyname] == "Iran (Islamic Republic of)") continue

    if (record[groupbyname] == "Republic of Korea") record = getDataFromAltState(data, record, "Republic of Korea", "Korea, South")
    if (record[groupbyname] == "Korea, South") continue

    if (record[groupbyname] == "UK") record = getDataFromAltState(data, record, "UK", "United Kingdom")
    if (record[groupbyname] == "United Kingdom") continue

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

  let drawGuidelines = () => {

    let d3line = d3.line()
        .x(d => d[0])
        .y(d => d[1]);

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

        let tmplist = getInfected(data, groupbyname, filterbyname)
        tmplist = tmplist.filter(d => d["Country"] != "Others" && d["Country"] != "Mainland China" && d["Country"] != "China" && d["Country"] != "Cruise Ship")
        tmplist = tmplist.filter(d => d["Infected"][d["Infected"].length - 1]["Num"] > cutoffnum)
        tmplist = tmplist.sort((a, b) => a["Infected"][a["Infected"].length - 1]["Num"] < b["Infected"][b["Infected"].length - 1]["Num"]? 1: -1)

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

        //let scale = linearScale

        rectsection.append("rect")
          .attr("width", rectsize*.9)
          .attr("height", d => scale(d["Num"]))
          .attr("fill", "#FB6900")

        let deathlist = getInfected(datadeaths, groupbyname, filterbyname)
        let recoveredlist = getInfected(datarecovered, groupbyname, filterbyname)

        rectsection
          .append('rect')
          .attr('width', rectsize*.9)
          .attr('height', d => scale(deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]))
          .attr('fill', '#004853')

        rectsection
          .append('rect')
          .attr('width', rectsize*.9)
          .attr('y', d => scale(deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]))
          .attr('height', d => {
            let numrec = recoveredlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]
            let numdead = deathlist.find(e => d["Country"] == e["Country"])["Infected"].find(e => e["Date"] == d["Date"])["Num"]
            return scale(numrec + numdead) - scale(numdead)
          })
          .attr('fill', '#00B9BD')

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

        let linechartscale = d3.scaleLog()
          .domain([1, 200])
          .range([-30, -80])

        linecharts.append('path')
          .attr('d', d => {
            let grate = growthrates.find(el => el["Country"] == d["Country"])["Infected"]
            let tmparr = []
            for (let el in grate){
              if (isNaN(grate[el]["Num"])) continue
              if (d["Infected"].find(e => e["Date"] == grate[el]["Date"])["Num"] < 50) continue
              if (grate[el]["Num"] == 0) continue
              tmparr.push([(el)*rectsize + rectsize*1.5, linechartscale(grate[el]["Num"])])
            }
            return d3line(tmparr)
          })
          .attr('stroke', 'red')
          .attr('stroke-width', 1)
          .attr('fill', 'none')
          .attr('opacity', 0.0)

        rectsection.append("text")
          .text(d => {
            if (events[d["Country"]] != undefined && events[d["Country"]][d["Date"].split("/").slice(0,2).join("/")] != undefined) return events[d["Country"]][d["Date"].split("/").slice(0,2).join("/")]
          })
          .attr("transform", "rotate(-90)")
          .attr("font-family", "Arial")
          .attr("font-size", "small")
          .attr("x", d => d["Num"] < 5000? -scale(d["Num"]) - 50 : -10)
          .attr("y", +rectsize*3/4)
          .attr("fill", d => d["Num"] < 5000? "gray" : "white")
          .attr("text-anchor", d=> d["Num"] != 5000? "end" : "start")

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
          .attr("y", +rectsize*3/4)
          .attr("x", d => -scale(d["Num"]) - 10)
          .attr("fill", "gray")
          .attr('text-anchor', 'end')

        if (isMobile){
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

      })
      })
    })
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
    let translatenum = 2
    let cutoffnum = 2

    let logScale = d3.scaleSymlog()
    .domain([0, 1000])
    .range([0, cellheight*0.8]);

    let linearScale = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, cellheight*0.8])

    fileCases = 'data/time_series_19-covid-Confirmed.csv'
    fileRecovered = 'data/time_series_19-covid-Recovered.csv'
    fileDeaths = 'data/time_series_19-covid-Deaths.csv'
    draw(fileCases, fileRecovered, fileDeaths, translatenum, cutoffnum, linearScale, "Province/State", "US")
  }

  let drawCountries = () => {
    let translatenum = 300
    let cutoffnum = 300
    let linearScale = d3.scaleLinear()
    .domain([0, 13000])
    .range([0, cellheight*0.8])

    fileCases = 'data/time_series_19-covid-Confirmed.csv'
    fileRecovered = 'data/time_series_19-covid-Recovered.csv'
    fileDeaths = 'data/time_series_19-covid-Deaths.csv'
    draw(fileCases, fileRecovered, fileDeaths, translatenum, cutoffnum, linearScale, "Country/Region")
  }
