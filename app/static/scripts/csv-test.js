var dom = document.getElementById('main');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var option;

const colors = ['#5470C6', '#EE6666'];

option = {
    xAxis: {
        type: 'category',
        data: month
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: temp,
            type: 'line'
        }
    ]
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);