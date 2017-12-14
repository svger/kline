import React from "react";
import Kline from "../build";
import styles from "../build/style/index.less";
import PropTypes from "prop-types";

class App extends React.Component {
  handleKLineChartConfig = () => {
    let { series, yAxis } = kLineChartConfig;
    let candlestickData = series[0].data;
    let yAxisLeft = yAxis[0].tickPositions;
    let MA5Fiirst = series[2].data[0];
    let MA10Fiirst = series[3].data[0];
    let MA30Fiirst = series[4].data[0];
    let MA5XPosition = 0;
    let MA10XPosition = 0;
    let MA30XPosition = 0;
    let dataArr = [];
    candlestickData.map(function(n, i) {
      if (series[2].data.length > 0 && n.x < series[2].data[0][0]) {
        MA5XPosition++;
      }

      if (series[3].data.length > 0 && n.x < series[3].data[0][0]) {
        MA10XPosition++;
      }

      if (series[4].data.length > 0 && n.x < series[4].data[0][0]) {
        MA30XPosition++;
      }
    });

    series.map(function(item, index) {
      if (item.type == "candlestick" || item.type == "column") {
        item.data.map(function(n, i) {
          let eachData = {};

          if (dataArr[i]) {
            for (let k in n) {
              let item = dataArr[i];
              item[k] = n[k];
            }
          } else {
            for (let k in n) {
              eachData[k] = n[k];
            }

            dataArr.push(eachData);
          }
        });
      }

      if (item.name == "MA5") {
        item.data.map(function(n, i) {
          let value = n[1];
          let item = dataArr[i + MA5XPosition];
          item["MA5"] = value;
        });
      }

      if (item.name == "MA10") {
        item.data.map(function(n, i) {
          let value = n[1];
          let item = dataArr[i + MA10XPosition];
          item["MA10"] = value;
        });
      }

      if (item.name == "MA30") {
        item.data.map(function(n, i) {
          let value = n[1];
          let item = dataArr[i + MA30XPosition];
          item["MA30"] = value;
        });
      }
    });

    return dataArr;
  };

  calculateData(data) {
    let array = [];
    data.map((item, index) => {
      let date = new Date(item.x);
      let date1 = date.toUTCString();
      let finalDate = new Date(date1);
      let newItem = {};
      newItem.date = finalDate;
      newItem.close = item.close;
      newItem.high = item.high;
      newItem.low = item.low;
      newItem.open = item.open;
      newItem.volume = item.y;
      newItem.volumeColor = item.color;
      newItem.x = item.x;
      newItem.MA5 = item.MA5;
      newItem.MA10 = item.MA10;
      newItem.MA30 = item.MA30;
      array.push(newItem);
    });

    return array;
  }

  render() {
    let dataArr =
      kLineChartConfig && this.handleKLineChartConfig(kLineChartConfig);
    let finalData = this.calculateData(dataArr);
    
    return (
      <div className="demoContainer">
        <Kline chartData={finalData} />
      </div>
    );
  }
}

export default App;

const kLineChartConfig = {
  global: { timezoneOffset: 0, useUTC: true },
  credits: { enabled: false },
  rangeSelector: { enabled: false },
  scrollbar: { enabled: false },
  navigator: { enabled: false },
  chart: {
    height: 240,
    backgroundColor: "#393c43",
    plotBorderColor: "#434750",
    plotBorderWidth: 1,
    pinchType: null,
    margin: [0, 0, 0, 0],
    spacing: [0, 0, 0, 0]
  },
  tooltip: {
    backgroundColor: "#333",
    borderColor: "#666",
    shared: true,
    crosshairs: [{ width: 1, color: "#76808d" }, { width: 1, color: "#76808d" }]
  },
  xAxis: { gridLineColor: "#434750", labels: { enabled: false } },
  yAxis: [
    {
      height: "70%",
      gridLineColor: "#434750",
      tickPositions: [12.38, 12.73, 13.09, 13.44],
      showLastLabel: true,
      opposite: false,
      labels: { style: { color: "#c5c5c5" }, align: "left", x: 0, y: 10 }
    },
    {
      top: "70%",
      height: "30%",
      opposite: true,
      gridLineColor: "#434750",
      labels: { enabled: false }
    }
  ],
  plotOptions: {
    candlestick: {
      upLineColor: "red",
      upColor: "red",
      lineColor: "green",
      color: "green",
      maxPointWidth: 6
    },
    column: { colorByPoint: true }
  },
  series: [
    {
      type: "candlestick",
      name: "",
      data: [
        {
          x: 1506556800000,
          open: 12.85,
          high: 12.88,
          low: 12.77,
          close: 12.84
        },
        {
          x: 1506643200000,
          open: 12.82,
          high: 12.91,
          low: 12.81,
          close: 12.87
        },
        { x: 1507507200000, open: 13.27, high: 13.29, low: 13, close: 13.04 },
        { x: 1507593600000, open: 13.05, high: 13.1, low: 12.98, close: 13.1 },
        {
          x: 1507680000000,
          open: 13.08,
          high: 13.11,
          low: 13.03,
          close: 13.06
        },
        {
          x: 1507766400000,
          open: 13.05,
          high: 13.09,
          low: 12.97,
          close: 13.05
        },
        {
          x: 1507852800000,
          open: 13.01,
          high: 13.08,
          low: 12.92,
          close: 12.94
        },
        {
          x: 1508112000000,
          open: 12.98,
          high: 13.06,
          low: 12.94,
          close: 13.04
        },
        {
          x: 1508198400000,
          open: 13.04,
          high: 13.06,
          low: 12.94,
          close: 12.99
        },
        { x: 1508284800000, open: 12.99, high: 13.1, low: 12.93, close: 13.07 },
        {
          x: 1508371200000,
          open: 13.03,
          high: 13.16,
          low: 12.98,
          close: 13.13
        },
        { x: 1508457600000, open: 13.09, high: 13.1, low: 13.01, close: 13.01 },
        {
          x: 1508716800000,
          open: 13.02,
          high: 13.03,
          low: 12.83,
          close: 12.84
        },
        {
          x: 1508803200000,
          open: 12.84,
          high: 12.95,
          low: 12.82,
          close: 12.86
        },
        { x: 1508889600000, open: 12.86, high: 12.94, low: 12.82, close: 12.9 },
        {
          x: 1508976000000,
          open: 12.87,
          high: 12.88,
          low: 12.78,
          close: 12.82
        },
        {
          x: 1509062400000,
          open: 12.85,
          high: 12.94,
          low: 12.82,
          close: 12.85
        },
        { x: 1509321600000, open: 12.84, high: 12.84, low: 12.59, close: 12.7 },
        { x: 1509408000000, open: 12.6, high: 12.66, low: 12.58, close: 12.61 },
        {
          x: 1509494400000,
          open: 12.63,
          high: 12.72,
          low: 12.53,
          close: 12.54
        },
        {
          x: 1509580800000,
          open: 12.52,
          high: 12.57,
          low: 12.43,
          close: 12.53
        },
        { x: 1509667200000, open: 12.53, high: 12.6, low: 12.43, close: 12.58 },
        {
          x: 1509926400000,
          open: 12.56,
          high: 12.56,
          low: 12.45,
          close: 12.47
        },
        { x: 1510012800000, open: 12.49, high: 12.6, low: 12.41, close: 12.54 },
        {
          x: 1510099200000,
          open: 12.54,
          high: 12.68,
          low: 12.49,
          close: 12.58
        },
        {
          x: 1510185600000,
          open: 12.57,
          high: 12.63,
          low: 12.53,
          close: 12.55
        },
        {
          x: 1510272000000,
          open: 12.54,
          high: 12.63,
          low: 12.46,
          close: 12.63
        },
        { x: 1510531200000, open: 12.65, high: 12.85, low: 12.63, close: 12.8 },
        { x: 1510617600000, open: 12.76, high: 12.77, low: 12.58, close: 12.6 },
        { x: 1510704000000, open: 12.6, high: 12.63, low: 12.55, close: 12.6 },
        {
          x: 1510790400000,
          open: 12.57,
          high: 12.57,
          low: 12.38,
          close: 12.39
        },
        { x: 1510876800000, open: 12.38, high: 12.8, low: 12.38, close: 12.78 },
        { x: 1511136000000, open: 12.7, high: 12.86, low: 12.61, close: 12.85 },
        {
          x: 1511222400000,
          open: 12.81,
          high: 13.17,
          low: 12.75,
          close: 12.94
        },
        { x: 1511308800000, open: 13, high: 13.44, low: 13, close: 13.23 },
        {
          x: 1511395200000,
          open: 13.24,
          high: 13.32,
          low: 12.91,
          close: 13.06
        },
        {
          x: 1511481600000,
          open: 13.11,
          high: 13.18,
          low: 12.93,
          close: 13.09
        },
        { x: 1511740800000, open: 13.09, high: 13.12, low: 12.81, close: 13.1 },
        {
          x: 1511827200000,
          open: 13.03,
          high: 13.07,
          low: 12.92,
          close: 12.94
        },
        {
          x: 1511913600000,
          open: 12.95,
          high: 13.04,
          low: 12.81,
          close: 12.94
        },
        { x: 1512000000000, open: 12.91, high: 12.95, low: 12.8, close: 12.91 },
        {
          x: 1512086400000,
          open: 12.93,
          high: 12.95,
          low: 12.81,
          close: 12.91
        },
        {
          x: 1512345600000,
          open: 12.87,
          high: 12.94,
          low: 12.84,
          close: 12.92
        },
        {
          x: 1512432000000,
          open: 12.92,
          high: 13.27,
          low: 12.91,
          close: 13.17
        },
        {
          x: 1512518400000,
          open: 13.12,
          high: 13.16,
          low: 12.91,
          close: 12.96
        },
        {
          x: 1512604800000,
          open: 12.95,
          high: 13.03,
          low: 12.91,
          close: 12.96
        },
        {
          x: 1512691200000,
          open: 12.98,
          high: 12.99,
          low: 12.87,
          close: 12.93
        },
        {
          x: 1512950400000,
          open: 12.92,
          high: 13.04,
          low: 12.85,
          close: 12.97
        },
        {
          x: 1513036800000,
          open: 12.97,
          high: 12.97,
          low: 12.74,
          close: 12.75
        },
        { x: 1513123200000, open: 12.8, high: 12.81, low: 12.63, close: 12.74 },
        { x: 1513209600000, open: 12.79, high: 12.79, low: 12.67, close: 12.68 }
      ],
      yAxis: 0
    },
    {
      type: "column",
      name: "",
      data: [
        { color: "green", x: 1506556800000, y: 241249 },
        { color: "red", x: 1506643200000, y: 198222 },
        { color: "green", x: 1507507200000, y: 521490 },
        { color: "red", x: 1507593600000, y: 274939 },
        { color: "green", x: 1507680000000, y: 187063 },
        { color: "green", x: 1507766400000, y: 171252 },
        { color: "green", x: 1507852800000, y: 208575 },
        { color: "red", x: 1508112000000, y: 236111 },
        { color: "green", x: 1508198400000, y: 146923 },
        { color: "red", x: 1508284800000, y: 454587 },
        { color: "red", x: 1508371200000, y: 528811 },
        { color: "green", x: 1508457600000, y: 172284 },
        { color: "green", x: 1508716800000, y: 315638 },
        { color: "red", x: 1508803200000, y: 272360 },
        { color: "red", x: 1508889600000, y: 207438 },
        { color: "green", x: 1508976000000, y: 252751 },
        { color: "green", x: 1509062400000, y: 326738 },
        { color: "green", x: 1509321600000, y: 747136 },
        { color: "red", x: 1509408000000, y: 201207 },
        { color: "green", x: 1509494400000, y: 353687 },
        { color: "red", x: 1509580800000, y: 482670 },
        { color: "red", x: 1509667200000, y: 328481 },
        { color: "green", x: 1509926400000, y: 200168 },
        { color: "red", x: 1510012800000, y: 386773 },
        { color: "red", x: 1510099200000, y: 371341 },
        { color: "green", x: 1510185600000, y: 174633 },
        { color: "red", x: 1510272000000, y: 499253 },
        { color: "red", x: 1510531200000, y: 780093 },
        { color: "green", x: 1510617600000, y: 337549 },
        { color: "green", x: 1510704000000, y: 280765 },
        { color: "green", x: 1510790400000, y: 356807 },
        { color: "red", x: 1510876800000, y: 1093365 },
        { color: "red", x: 1511136000000, y: 614954 },
        { color: "red", x: 1511222400000, y: 1161794 },
        { color: "red", x: 1511308800000, y: 1145762 },
        { color: "green", x: 1511395200000, y: 819126 },
        { color: "green", x: 1511481600000, y: 596124 },
        { color: "red", x: 1511740800000, y: 792502 },
        { color: "green", x: 1511827200000, y: 340319 },
        { color: "green", x: 1511913600000, y: 418467 },
        { color: "green", x: 1512000000000, y: 399163 },
        { color: "green", x: 1512086400000, y: 385774 },
        { color: "red", x: 1512345600000, y: 364792 },
        { color: "red", x: 1512432000000, y: 1237967 },
        { color: "green", x: 1512518400000, y: 435649 },
        { color: "red", x: 1512604800000, y: 348022 },
        { color: "green", x: 1512691200000, y: 312962 },
        { color: "red", x: 1512950400000, y: 366499 },
        { color: "green", x: 1513036800000, y: 303700 },
        { color: "green", x: 1513123200000, y: 193453 },
        { color: "green", x: 1513209600000, y: 82232 }
      ],
      yAxis: 1,
      colors: [
        "green",
        "red",
        "green",
        "red",
        "green",
        "green",
        "green",
        "red",
        "green",
        "red",
        "red",
        "green",
        "green",
        "red",
        "red",
        "green",
        "green",
        "green",
        "red",
        "green",
        "red",
        "red",
        "green",
        "red",
        "red",
        "green",
        "red",
        "red",
        "green",
        "green",
        "green",
        "red",
        "red",
        "red",
        "red",
        "green",
        "green",
        "red",
        "green",
        "green",
        "green",
        "green",
        "red",
        "red",
        "green",
        "red",
        "green",
        "red",
        "green",
        "green",
        "green"
      ]
    },
    {
      type: "line",
      name: "MA5",
      data: [
        [1506643200000, 12.87],
        [1507507200000, 12.89],
        [1507593600000, 12.94],
        [1507680000000, 12.98],
        [1507766400000, 13.02],
        [1507852800000, 13.04],
        [1508112000000, 13.04],
        [1508198400000, 13.02],
        [1508284800000, 13.02],
        [1508371200000, 13.03],
        [1508457600000, 13.05],
        [1508716800000, 13.01],
        [1508803200000, 12.98],
        [1508889600000, 12.95],
        [1508976000000, 12.89],
        [1509062400000, 12.85],
        [1509321600000, 12.83],
        [1509408000000, 12.78],
        [1509494400000, 12.7],
        [1509580800000, 12.65],
        [1509667200000, 12.59],
        [1509926400000, 12.55],
        [1510012800000, 12.53],
        [1510099200000, 12.54],
        [1510185600000, 12.54],
        [1510272000000, 12.55],
        [1510531200000, 12.62],
        [1510617600000, 12.63],
        [1510704000000, 12.64],
        [1510790400000, 12.6],
        [1510876800000, 12.63],
        [1511136000000, 12.64],
        [1511222400000, 12.71],
        [1511308800000, 12.84],
        [1511395200000, 12.97],
        [1511481600000, 13.03],
        [1511740800000, 13.08],
        [1511827200000, 13.08],
        [1511913600000, 13.03],
        [1512000000000, 13],
        [1512086400000, 12.96],
        [1512345600000, 12.92],
        [1512432000000, 12.97],
        [1512518400000, 12.97],
        [1512604800000, 12.98],
        [1512691200000, 12.99],
        [1512950400000, 13],
        [1513036800000, 12.91],
        [1513123200000, 12.87],
        [1513209600000, 12.81]
      ],
      yAxis: 0,
      color: "white",
      lineWidth: 0.8
    },
    {
      type: "line",
      name: "MA10",
      data: [
        [1506643200000, 12.88],
        [1507507200000, 12.89],
        [1507593600000, 12.91],
        [1507680000000, 12.93],
        [1507766400000, 12.95],
        [1507852800000, 12.96],
        [1508112000000, 12.96],
        [1508198400000, 12.98],
        [1508284800000, 13],
        [1508371200000, 13.03],
        [1508457600000, 13.04],
        [1508716800000, 13.02],
        [1508803200000, 13],
        [1508889600000, 12.98],
        [1508976000000, 12.96],
        [1509062400000, 12.95],
        [1509321600000, 12.92],
        [1509408000000, 12.88],
        [1509494400000, 12.83],
        [1509580800000, 12.77],
        [1509667200000, 12.72],
        [1509926400000, 12.69],
        [1510012800000, 12.65],
        [1510099200000, 12.62],
        [1510185600000, 12.59],
        [1510272000000, 12.57],
        [1510531200000, 12.58],
        [1510617600000, 12.58],
        [1510704000000, 12.59],
        [1510790400000, 12.57],
        [1510876800000, 12.59],
        [1511136000000, 12.63],
        [1511222400000, 12.67],
        [1511308800000, 12.74],
        [1511395200000, 12.79],
        [1511481600000, 12.83],
        [1511740800000, 12.86],
        [1511827200000, 12.9],
        [1511913600000, 12.93],
        [1512000000000, 12.98],
        [1512086400000, 13],
        [1512345600000, 13],
        [1512432000000, 13.03],
        [1512518400000, 13],
        [1512604800000, 12.99],
        [1512691200000, 12.97],
        [1512950400000, 12.96],
        [1513036800000, 12.94],
        [1513123200000, 12.92],
        [1513209600000, 12.9]
      ],
      yAxis: 0,
      color: "yellow",
      lineWidth: 0.8
    },
    {
      type: "line",
      name: "MA30",
      data: [
        [1506643200000, 12.83],
        [1507507200000, 12.85],
        [1507593600000, 12.87],
        [1507680000000, 12.89],
        [1507766400000, 12.91],
        [1507852800000, 12.91],
        [1508112000000, 12.92],
        [1508198400000, 12.92],
        [1508284800000, 12.93],
        [1508371200000, 12.94],
        [1508457600000, 12.95],
        [1508716800000, 12.95],
        [1508803200000, 12.95],
        [1508889600000, 12.94],
        [1508976000000, 12.94],
        [1509062400000, 12.94],
        [1509321600000, 12.93],
        [1509408000000, 12.91],
        [1509494400000, 12.9],
        [1509580800000, 12.89],
        [1509667200000, 12.88],
        [1509926400000, 12.87],
        [1510012800000, 12.86],
        [1510099200000, 12.85],
        [1510185600000, 12.84],
        [1510272000000, 12.83],
        [1510531200000, 12.82],
        [1510617600000, 12.81],
        [1510704000000, 12.8],
        [1510790400000, 12.79],
        [1510876800000, 12.79],
        [1511136000000, 12.78],
        [1511222400000, 12.78],
        [1511308800000, 12.78],
        [1511395200000, 12.78],
        [1511481600000, 12.79],
        [1511740800000, 12.79],
        [1511827200000, 12.79],
        [1511913600000, 12.78],
        [1512000000000, 12.77],
        [1512086400000, 12.77],
        [1512345600000, 12.77],
        [1512432000000, 12.78],
        [1512518400000, 12.79],
        [1512604800000, 12.79],
        [1512691200000, 12.79],
        [1512950400000, 12.8],
        [1513036800000, 12.81],
        [1513123200000, 12.81],
        [1513209600000, 12.82]
      ],
      yAxis: 0,
      color: "magenta",
      lineWidth: 0.8
    }
  ]
};
