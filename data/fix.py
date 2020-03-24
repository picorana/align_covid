import os
import csv
from pprint import pprint
import datetime

basepath = "./daily_reports/csse_covid_19_data/csse_covid_19_daily_reports"
f_out = csv.DictWriter(open('us_states.csv', 'w'), fieldnames=['Date', 'State', 'Confirmed', 'Recovered', 'Deaths'])

f_out.writeheader()

datedict = {}

for file in os.listdir(basepath):
    if file == '.gitignore' or file == 'README.md': continue
    reader = csv.DictReader(open(basepath + "/" + file, 'r', encoding='utf-8-sig'))

    statedict = {}

    for line in reader:
        key_country = "Country/Region"
        key_date = "Last Update"
        key_province = "Province/State"
        key_confirmed = "Confirmed"

        if key_country not in line:
            key_country = "Country_Region"
        if key_date not in line:
            key_date = "Last_Update"
        if key_province not in line:
            key_province = "Province_State"
        if key_confirmed not in line:
            print(line)

        if line[key_country] != "US": continue

        if line["Deaths"] == '': line["Deaths"] = 0
        if line["Recovered"] == '': line["Recovered"] = 0

        d = line[key_date].replace("T", " ").split(" ")[0]
        if "/" in d:
            if len(d.split('/')[2]) == 4:
                d = datetime.datetime.strptime(d, '%m/%d/%Y')
            else:
                d = datetime.datetime.strptime(d, '%m/%d/%y')
            d = d.strftime('%Y-%M-%d')

        state = line[key_province]
        if state == "US": continue

        if state not in statedict:
            statedict[state] = {'Confirmed': 0, 'Deaths': 0, 'Recovered': 0, 'Date':d, 'State': state}
        statedict[state]['Confirmed'] += int(line["Confirmed"])
        statedict[state]['Deaths'] += int(line["Deaths"])
        statedict[state]['Recovered'] += int(line["Recovered"])

    for state in statedict:
        d = statedict[state]['Date']
        if d not in datedict: datedict[d] = {}
        if state not in datedict[d]:
            datedict[d][state] = statedict[state]

for date in datedict:
    for state in datedict[date]:
        f_out.writerow(datedict[date][state])
