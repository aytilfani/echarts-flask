var dom = document.getElementById('main');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

const colors = ['#5470C6', '#EE6666', '#EE6456'];
option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      // to see data in tabular form
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['Production PV', 'Temperature']
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Production PV',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} KWh'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: false,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Production UV',
      type: 'bar',
      yAxisIndex: 0,
      data: [
        200.0, 400.9, 700.0, 2300.2, 2500.6, 7600.7, 13500.6, 16200.2, 3200.6, 2000.0, 600.4, 300.3
      ],
      markPoint: {
        data: [
          { type: 'max', symbol: 'circle', name: 'Max' },
          { type: 'min', symbol: 'circle', name: 'Min' }
        ]
      }
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, null, 12.0, 6.2],
      markPoint: {
        data: [
          { type: 'max', symbol: 'circle', name: 'Max' },
          { type: 'min', symbol: 'circle', name: 'Min' }
        ]
      }
    }, 
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 2,
      data: [2.0, 5.2, 3.3, 4.5, 6.3, 10.2, 25,3, 23.4, 23.0, 16.5, 120.0, 6.2],
      markPoint: {
        data: [
          { type: 'max', symbol: 'circle', name: 'Max' },
          { type: 'min', symbol: 'circle', name: 'Min' }
        ]
      }
    }

  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);