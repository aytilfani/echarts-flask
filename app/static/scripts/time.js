var dom = document.getElementById('main');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var option;
let base = +new Date(2000, 1, 1);
let oneDay = 24 * 3600 * 1000;
let data = []
let data1 = []
for (let i = 0; i < 8035; i++) {
  let now = new Date((base += oneDay));
  data.push([now, bdx_avg[i]]);
}
let base1 = +new Date(2000, 1, 1);
for (let i = 0; i < 8035; i++) {
    let now = new Date((base1 += oneDay));
    data1.push([now, paris_avg[i]]);
  }
option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'center',
    text: 'Berlin and Bordeaux temperature'
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value'
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  series: [
    {
        name: 'Berlin average temperature',
        type: 'line',
        smooth: true,
        symbol: 'none',
        color: '#5470C6',
        yAxisIndex: 0,
        data: data1
    },
    {
        name: 'Bordeaux average temperature',
        type: 'line',
        smooth: true,
        symbol: 'none',
        color: '#EE6666',
        yAxisIndex: 0,
        data: data
    }
  ]
};


if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);