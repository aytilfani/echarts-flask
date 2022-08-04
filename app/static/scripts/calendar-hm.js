var dom = document.getElementById("main");
var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false
});

function is_prime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (var i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

function getVirtulData(year) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate(+year + 1 + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        var k = Math.floor(Math.random() * 200);
        if (is_prime(k)) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                k % 144
            ]);
        }
        else {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                144]);
        }

    }
    return data;
}


option = {
    title: {
        top: 30,
        left: 'center',
        text: 'Number of measurements per day'
    },
    tooltip: {
        position: 'top',
        formatter: function (p) {
            var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
            return format + ': ' + p.data[1];
        }
    },
    visualMap: {
        min: 0,
        max: 144,
        calculable: true,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65
    },
    calendar: [{
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2021',
        itemStyle: {
            borderWidth: 0.5
        },
        yearLabel: { show: false }
    }],
    series: [{
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: getVirtulData('2021')
    }
    ]
};

if (option && typeof option === "object") {
    myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
