import csv
from pprint import pprint
from os import listdir
import datetime

def parse_data_from_reports():
    filepath = "./reports/csse_covid_19_data/csse_covid_19_daily_reports"
    samplefile = csv.DictReader(open("./data_old/time_series_19-covid-Confirmed.csv", "r"))

    headers = samplefile.fieldnames + ['3/14/20', '3/15/20']

    latlongdict = {}
    for item in samplefile:
        latlongdict[item["Province/State"]] = {"Lat" : item["Lat"], "Long" : item["Long"] }

    outfileConfirmed = csv.DictWriter(open('confirmed.csv', 'w'), fieldnames=headers)
    outfileConfirmed.writeheader()
    # outfileRecovered = csv.DictWriter(open('recovered.csv', 'w'))
    # outfileDeaths = csv.DictWriter(open('deaths.csv', 'w'))

    confirmeddict = {}

    for filename in listdir(filepath):
        if filename == ".gitignore" or filename == "README.md": continue

        f = csv.DictReader(open(filepath + '/' + filename, "r", encoding='utf-8-sig'))

        for line in f:
            date = datetime.datetime.strptime(filename.split('.')[0], '%m-%d-%Y').strftime('%-m/%-d/%y')
            n = line["Province/State"] + line["Country/Region"]
            if n not in confirmeddict:
                confirmeddict[n] = {}
                confirmeddict[n]["Province/State"] = line["Province/State"]
                confirmeddict[n]["Country/Region"] = line["Country/Region"]
                if confirmeddict[n]["Province/State"] not in latlongdict:
                    confirmeddict[n]["Lat"] = 0
                    confirmeddict[n]["Long"] = 0
                    continue
                confirmeddict[n]["Lat"] = latlongdict[confirmeddict[n]["Province/State"]]["Lat"]
                confirmeddict[n]["Long"] = latlongdict[confirmeddict[n]["Province/State"]]["Long"]
            confirmeddict[n][date] = line["Confirmed"]

    for entry in confirmeddict:
        outfileConfirmed.writerow(confirmeddict[entry])

    #pprint(confirmeddict)

def add_data_to_file():
    f = csv.DictReader(open("03-14-2020.csv", "r"))

    ddict = {}
    for line in f:
        n = line["Province/State"] + line["Country/Region"]
        ddict[n] = {}
        for l in line:
            ddict[n][l] = line[l]

    fieldnames = []
    f2 = open("time_series_19-covid-Confirmed.csv", "r")
    for elem in f2.readline().strip().split(','): fieldnames.append(elem)
    fieldnames.append('3/14/20')

    # confirmed
    f2 = csv.DictReader(open("time_series_19-covid-Confirmed.csv", "r"))
    f2out = csv.DictWriter(open("time_series_19-covid-Confirmed-correct.csv", "w"), fieldnames=fieldnames)

    f2out.writeheader()

    for line in f2:
        n = line["Province/State"] + line["Country/Region"]
        if n not in ddict: continue
        line['3/14/20'] = ddict[n]["Confirmed"]
        f2out.writerow(line)

    # recovered
    f2 = csv.DictReader(open("time_series_19-covid-Recovered.csv", "r"))
    f2out = csv.DictWriter(open("time_series_19-covid-Recovered-correct.csv", "w"), fieldnames=fieldnames)

    f2out.writeheader()

    for line in f2:
        n = line["Province/State"] + line["Country/Region"]
        if n not in ddict: continue
        line['3/14/20'] = ddict[n]["Recovered"]
        f2out.writerow(line)

    # recovered
    f2 = csv.DictReader(open("time_series_19-covid-Deaths.csv", "r"))
    f2out = csv.DictWriter(open("time_series_19-covid-Deaths-correct.csv", "w"), fieldnames=fieldnames)

    f2out.writeheader()

    for line in f2:
        n = line["Province/State"] + line["Country/Region"]
        if n not in ddict: continue
        line['3/14/20'] = ddict[n]["Deaths"]
        f2out.writerow(line)

parse_data_from_reports()
