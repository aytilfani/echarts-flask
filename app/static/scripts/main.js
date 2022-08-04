//is_Prime
function is_Prime(num) {
    if (num < 2) { return false; }
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function myFunc(vars) {
  return vars
}

var dom = document.getElementById("main");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false
});
var app = {};


var dom1 = document.getElementById("main1");
var myChart1 = echarts.init(dom1, null, {
  renderer: "canvas",
  useDirtyRect: false
});



//months
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let base = +new Date(2020, 1, 1);
let oneDay = 24 * 3600 * 1000;
let donnes = []

for (let i = 0; i < 365; i++) {
  let now = new Date((base += oneDay));
  for (let j = 0; j < 12; j++) {
    //get random number between 0 and 4320
    let k = Math.floor(Math.random()*4320);
    if ( is_Prime(k) ) {
      donnes.push([now.toLocaleString(), months[j], k % 4320]);
    }
    else {
      donnes.push([now.toLocaleString(), months[j], 4320]);
    }
  }
}  





//var option;

// prettier-ignore
/*const hours = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
    '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

// prettier-ignore
const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
// prettier-ignore
const data1 = [];
for (var i = 0; i < hours.length; i++) {
  for (var j = 0; j < days.length; j++) {
    var k = Math.floor(Math.random() * 7);
    data1.push([i, j, k]);
  }
}
*/

option = {
  tooltip: {
    position: "top"
  },
  grid: {
    height: "50%",
    top: "10%"
  },
  xAxis: {
    data: days,
    type: "category",
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: "category",
    data: hours,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 6,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "15%"
  },
  series: [
    {
      name: "Number of measurements",
      type: "heatmap",
      data: data1,
      emphasis: {
        itemStyle: {
          shadowBlur: 6,
          shadowColor: "rgba(0, 0, 0, 1)"
        }
      }
    }
  ]
};


option1 = {
  tooltip: {
    position: "top"
  },
  grid: {
    height: "50%",
    top: "10%"
  },
  xAxis: {
    data: days1,
    type: "category",
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: "category",
    data: months,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 4320,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "15%"
  },
  series: [
    {
      name: "Number of measurements",
      type: "heatmap",
      data: donnes,
      emphasis: {
        itemStyle: {
          shadowBlur: 6,
          shadowColor: "rgba(0, 0, 0, 1)"
        }
      }
    }
  ]
};


if (option && typeof option === "object") {
  myChart.setOption(option);
}

if (option1 && typeof option1 === "object") {
  myChart1.setOption(option1);
}

window.addEventListener("resize", myChart.resize);
//window.addEventListener("resize", myChart1.resize);



 