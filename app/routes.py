from calendar import month
from pathlib import Path
import random
import json
from os.path import relpath
from datetime import datetime, timedelta

from flask import render_template,request
import pandas as pd
from meteostat import Point, Daily

from app import app


def create_json():
    json_data = json.dump({
        "timestamp": [datetime(2020, 1, 1) + timedelta(days=i) for i in range(365)] ,
        "timeseries": {
            "temp1": {
                "count"
            }

        }
    })

#is prime
def is_prime(n):
    if n == 1:
        return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0:
            return False
    return True

def datetime_format(value, format="%d-%m-%y"):
    return value.strftime(format)


WEATHER_FILE_PATH = Path(__file__).parent.parent / "weather.csv"


#1 year date without hours
year = [datetime(2020, 1, 1) + timedelta(days=i) for i in range(365)]

#months
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ]

def gen_data(days_num):
    data = []
    for i in range(days_num):
        for j in range(len(hours)):
            k = random.randint(0, 100)
            if is_prime(k):
                data.append([str(year[i]), hours[j], k%6])
            else:
                data.append([str(year[i]), hours[j], 6])
    return data

def gen_data1():
    data1 = []
    for i in range(len(year)):
        for j in range(len(months)):
            k = random.randint(0, 4319)
            if is_prime(k):
                data1.append([str(year[i]), months[j], k%4320])
            else:
                data1.append([str(year[i]), months[j], 4320])
    return data1, year

def get_virtual_data(year):
    
    data = []
    for j in range(len(hours)):
        for i in range(days_num):
            k = random.randint(0, 100)
            if is_prime(k):
                data.append([year[i], j, k%6])
            else:
                data.append([year[i], j, 6])
    return data, year[:days_num]

count = gen_data(365)

def create_json():
    json_data = json.dumps({
        "timestamp": [(datetime(2020, 1, 1) + timedelta(days=i)).isoformat() for i in range(365)] ,
        "timeseries": {
            "temp1": {
                "count": count,
                "total_count": 1000,
                "excpected_count": 6
            }
        }
    })
    return json_data


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/form', methods=['POST', 'GET'])
def form():
    return render_template('form.html')


@app.route('/heatmap', methods=['POST', 'GET'])
def heatmap():
        my_json = create_json() 
        json_data = json.loads(my_json)
        data1, days1 = gen_data1()
        days_temp = json_data['timestamp']
        for i in range(len(days_temp)):
            days_temp[i] = datetime.fromisoformat(days_temp[i])
        days = days_temp
        data = json_data['timeseries']['temp1']['count']
        #date = str(request.form['start_date']).split('-')
        return render_template('heatmap.html', data=data, days=days, hours=hours, data1=data1, days1=days1)


@app.route('/calendar-hm')
def calendar_hm():
    return render_template('calendar-hm.html')

@app.route('/two-ys')
def two_ys():
    return render_template('two_ys.html')

@app.route('/csv_test')
def csv_test():
    data = pd.read_csv(WEATHER_FILE_PATH)
    month = list(data['month'])
    temp = list(data['avg_temp (°C)'])
    return render_template('csv-test.html', month=month, temp=temp)

@app.route('/time')
def time():
    start = datetime(2000, 1, 1)
    end = datetime(2021, 12, 31)
    location = Point(44.837789, -0.57918)
    location1 = Point(52.520007, 13.404954)
    data = Daily(location, start, end)
    data1 = Daily(location1, start, end)
    data = data.fetch()
    data1 = data1.fetch()
    bdx_avg = list(data['tavg'])
    paris_avg = list(data1['tavg'])
    return render_template('time.html', bdx_avg=bdx_avg, paris_avg=paris_avg)    