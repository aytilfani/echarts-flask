import csv

with open('weather.csv', 'r') as f:
    reader = csv.reader(f)
    data = list(reader)
    print(data)
