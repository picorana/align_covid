import csv
from pprint import pprint

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
