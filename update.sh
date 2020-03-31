#!/bin/bash
cd data/daily_reports/
git pull
cd ..
python3 fix.py
cd COVID-19
git pull
cd ../..

d=$(date '+%Y-%m-%d')

git add .
echo "update ${d}"