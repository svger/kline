import React from 'react';
import Kline from "../src";
import styles from "../src//style/index.less";
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
  }

  render() {
    let dataArr = kLineChartConfig && this.handleKLineChartConfig(kLineChartConfig);

    return <div className="demoContainer">
        <Kline data={dataArr} />
      </div>;
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
    animation: false,
    height: 240,
    zoomType: "none",
    backgroundColor: "#393c43",
    plotBorderColor: "#434750",
    plotBorderWidth: 1,
    pinchType: null,
    margin: [0, 0, 0, 0],
    spacing: [0, 0, 0, 0]
  },
  tooltip: {
    backgroundColor: "rgba(10, 10, 10, 0.8)",
    borderWidth: 0,
    shared: true,
    crosshairs: true
  },
  xAxis: { gridLineColor: "#434750", labels: { enabled: false } },
  yAxis: [
    {
      height: "70%",
      gridLineColor: "#434750",
      gridLindeWidth: 0,
      tickPositions: [24.4827, 29.33, 34.1683],
      minorTickInterval: 2.4214,
      minorGridLineDashStyle: "dash",
      minorGridLineColor: "#434750",
      minorGridLineWidth: 0.8,
      showLastLabel: true,
      opposite: false,
      labels: { style: { color: "#c5c5c5" }, align: "left", x: 0, y: 10 }
    },
    {
      top: "70%",
      height: "30%",
      opposite: true,
      gridLineColor: "#434750",
      gridLindeWidth: 0,
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
    column: {}
  },
  series: [
    {
      type: "candlestick",
      name: "",
      data: [
        {
          x: 1506384000000,
          open: 26.12,
          high: 27.22,
          low: 26.1,
          close: 26.76,
          fixed: ""
        },
        {
          x: 1506470400000,
          open: 27,
          high: 27.28,
          low: 26.52,
          close: 26.84,
          fixed: ""
        },
        {
          x: 1506556800000,
          open: 27,
          high: 27.15,
          low: 26.4,
          close: 26.41,
          fixed: ""
        },
        {
          x: 1506643200000,
          open: 26.56,
          high: 26.8,
          low: 26,
          close: 26.25,
          fixed: ""
        },
        {
          x: 1507507200000,
          open: 27.45,
          high: 27.65,
          low: 26.24,
          close: 26.47,
          fixed: ""
        },
        {
          x: 1507593600000,
          open: 26.4,
          high: 26.69,
          low: 26.19,
          close: 26.59,
          fixed: ""
        },
        {
          x: 1507680000000,
          open: 26.69,
          high: 27.27,
          low: 26.47,
          close: 26.87,
          fixed: ""
        },
        {
          x: 1507766400000,
          open: 26.99,
          high: 27.2,
          low: 26.72,
          close: 27.1,
          fixed: ""
        },
        {
          x: 1507852800000,
          open: 27.2,
          high: 27.58,
          low: 26.81,
          close: 26.93,
          fixed: ""
        },
        {
          x: 1508112000000,
          open: 26.96,
          high: 26.97,
          low: 26.13,
          close: 26.31,
          fixed: ""
        },
        {
          x: 1508198400000,
          open: 26.32,
          high: 26.52,
          low: 26.14,
          close: 26.21,
          fixed: ""
        },
        {
          x: 1508284800000,
          open: 26.21,
          high: 26.56,
          low: 25.61,
          close: 26.43,
          fixed: ""
        },
        {
          x: 1508371200000,
          open: 26.44,
          high: 26.57,
          low: 26.01,
          close: 26.05,
          fixed: ""
        },
        {
          x: 1508457600000,
          open: 26,
          high: 26.23,
          low: 25.73,
          close: 26.16,
          fixed: ""
        },
        {
          x: 1508716800000,
          open: 26.17,
          high: 26.2,
          low: 25.77,
          close: 25.93,
          fixed: ""
        },
        {
          x: 1508803200000,
          open: 25.81,
          high: 27.2,
          low: 25.81,
          close: 27,
          fixed: ""
        },
        {
          x: 1508889600000,
          open: 27.01,
          high: 28,
          low: 26.86,
          close: 27.43,
          fixed: ""
        },
        {
          x: 1508976000000,
          open: 27.3,
          high: 27.88,
          low: 26.91,
          close: 27.53,
          fixed: ""
        },
        {
          x: 1509062400000,
          open: 27.7,
          high: 28.28,
          low: 27.26,
          close: 27.5,
          fixed: ""
        },
        {
          x: 1509321600000,
          open: 27.5,
          high: 29,
          low: 27.41,
          close: 28.98,
          fixed: ""
        },
        {
          x: 1509408000000,
          open: 28.8,
          high: 29.28,
          low: 28.28,
          close: 28.96,
          fixed: ""
        },
        {
          x: 1509494400000,
          open: 28.96,
          high: 30.54,
          low: 28.73,
          close: 29.15,
          fixed: ""
        },
        {
          x: 1509580800000,
          open: 29.3,
          high: 29.48,
          low: 28.68,
          close: 29.45,
          fixed: ""
        },
        {
          x: 1509667200000,
          open: 29.23,
          high: 29.52,
          low: 28.05,
          close: 28.19,
          fixed: ""
        },
        {
          x: 1509926400000,
          open: 28.2,
          high: 28.27,
          low: 26.95,
          close: 27.46,
          fixed: ""
        },
        {
          x: 1510012800000,
          open: 27.36,
          high: 27.95,
          low: 27.3,
          close: 27.85,
          fixed: ""
        },
        {
          x: 1510099200000,
          open: 27.75,
          high: 28.14,
          low: 27.41,
          close: 27.64,
          fixed: ""
        },
        {
          x: 1510185600000,
          open: 27.52,
          high: 27.79,
          low: 27.3,
          close: 27.67,
          fixed: ""
        },
        {
          x: 1510272000000,
          open: 27.6,
          high: 27.83,
          low: 27.36,
          close: 27.51,
          fixed: ""
        },
        {
          x: 1510531200000,
          open: 27.45,
          high: 27.49,
          low: 26.8,
          close: 27.06,
          fixed: ""
        },
        {
          x: 1510617600000,
          open: 27.05,
          high: 28.5,
          low: 26.7,
          close: 28.5,
          fixed: ""
        },
        {
          x: 1510704000000,
          open: 28.28,
          high: 28.66,
          low: 27.91,
          close: 28.44,
          fixed: ""
        },
        {
          x: 1510790400000,
          open: 28.35,
          high: 29.38,
          low: 28.32,
          close: 28.94,
          fixed: ""
        },
        {
          x: 1510876800000,
          open: 28.85,
          high: 29.6,
          low: 28.6,
          close: 28.9,
          fixed: ""
        },
        {
          x: 1511136000000,
          open: 28.8,
          high: 29.01,
          low: 27.48,
          close: 28.9,
          fixed: ""
        },
        {
          x: 1511222400000,
          open: 28.54,
          high: 31.79,
          low: 28.54,
          close: 31.79,
          fixed: ""
        },
        {
          x: 1511308800000,
          open: 31.9,
          high: 33.08,
          low: 31.54,
          close: 32.5,
          fixed: ""
        },
        {
          x: 1511395200000,
          open: 32.42,
          high: 32.74,
          low: 31.02,
          close: 31.3,
          fixed: ""
        },
        {
          x: 1511481600000,
          open: 31.18,
          high: 32.29,
          low: 30.47,
          close: 31.8,
          fixed: ""
        },
        {
          x: 1511740800000,
          open: 31.45,
          high: 32.6,
          low: 30.59,
          close: 31.52,
          fixed: ""
        },
        {
          x: 1511827200000,
          open: 31.09,
          high: 31.35,
          low: 30.1,
          close: 30.75,
          fixed: ""
        },
        {
          x: 1511913600000,
          open: 30.78,
          high: 33.83,
          low: 30.28,
          close: 33.82,
          fixed: ""
        },
        {
          x: 1512000000000,
          open: 33.1,
          high: 33.4,
          low: 30.68,
          close: 31.22,
          fixed: ""
        },
        {
          x: 1512086400000,
          open: 30.5,
          high: 32.03,
          low: 30.5,
          close: 30.73,
          fixed: ""
        },
        {
          x: 1512345600000,
          open: 30.6,
          high: 31.3,
          low: 29.9,
          close: 30.85,
          fixed: ""
        },
        {
          x: 1512432000000,
          open: 30.6,
          high: 31.48,
          low: 30.2,
          close: 31.03,
          fixed: ""
        },
        {
          x: 1512518400000,
          open: 30.73,
          high: 31.2,
          low: 30.26,
          close: 30.77,
          fixed: ""
        },
        {
          x: 1512604800000,
          open: 30.57,
          high: 31.9,
          low: 29.9,
          close: 29.95,
          fixed: ""
        },
        {
          x: 1512691200000,
          open: 29.38,
          high: 29.88,
          low: 29.05,
          close: 29.82,
          fixed: ""
        },
        {
          x: 1512950400000,
          open: 29.82,
          high: 29.95,
          low: 29.3,
          close: 29.93,
          fixed: ""
        }
      ],
      yAxis: 0
    },
    {
      type: "column",
      name: "",
      data: [
        { color: "red", x: 1506384000000, y: 593044 },
        { color: "green", x: 1506470400000, y: 367534 },
        { color: "green", x: 1506556800000, y: 262347 },
        { color: "green", x: 1506643200000, y: 345752 },
        { color: "green", x: 1507507200000, y: 711737 },
        { color: "red", x: 1507593600000, y: 367101 },
        { color: "red", x: 1507680000000, y: 425997 },
        { color: "red", x: 1507766400000, y: 348979 },
        { color: "green", x: 1507852800000, y: 329928 },
        { color: "green", x: 1508112000000, y: 315008 },
        { color: "green", x: 1508198400000, y: 184811 },
        { color: "red", x: 1508284800000, y: 334052 },
        { color: "green", x: 1508371200000, y: 202525 },
        { color: "red", x: 1508457600000, y: 145915 },
        { color: "green", x: 1508716800000, y: 197527 },
        { color: "red", x: 1508803200000, y: 509187 },
        { color: "red", x: 1508889600000, y: 445727 },
        { color: "red", x: 1508976000000, y: 422766 },
        { color: "green", x: 1509062400000, y: 447443 },
        { color: "red", x: 1509321600000, y: 676711 },
        { color: "red", x: 1509408000000, y: 463277 },
        { color: "red", x: 1509494400000, y: 622931 },
        { color: "red", x: 1509580800000, y: 361906 },
        { color: "green", x: 1509667200000, y: 455428 },
        { color: "green", x: 1509926400000, y: 509485 },
        { color: "red", x: 1510012800000, y: 379818 },
        { color: "green", x: 1510099200000, y: 398661 },
        { color: "red", x: 1510185600000, y: 234126 },
        { color: "green", x: 1510272000000, y: 305912 },
        { color: "green", x: 1510531200000, y: 347146 },
        { color: "red", x: 1510617600000, y: 735825 },
        { color: "red", x: 1510704000000, y: 541077 },
        { color: "red", x: 1510790400000, y: 574432 },
        { color: "red", x: 1510876800000, y: 563943 },
        { color: "red", x: 1511136000000, y: 395088 },
        { color: "red", x: 1511222400000, y: 1081788 },
        { color: "red", x: 1511308800000, y: 1052969 },
        { color: "green", x: 1511395200000, y: 580325 },
        { color: "red", x: 1511481600000, y: 524343 },
        { color: "red", x: 1511740800000, y: 521581 },
        { color: "green", x: 1511827200000, y: 405786 },
        { color: "red", x: 1511913600000, y: 897712 },
        { color: "green", x: 1512000000000, y: 1000665 },
        { color: "red", x: 1512086400000, y: 557438 },
        { color: "red", x: 1512345600000, y: 379890 },
        { color: "red", x: 1512432000000, y: 564302 },
        { color: "red", x: 1512518400000, y: 389794 },
        { color: "green", x: 1512604800000, y: 590007 },
        { color: "red", x: 1512691200000, y: 588187 },
        { color: "red", x: 1512950400000, y: 502135 }
      ],
      yAxis: 1,
      colorByPoint: true,
      colors: [
        "red",
        "green",
        "green",
        "green",
        "green",
        "red",
        "red",
        "red",
        "green",
        "green",
        "green",
        "red",
        "green",
        "red",
        "green",
        "red",
        "red",
        "red",
        "green",
        "red",
        "red",
        "red",
        "red",
        "green",
        "green",
        "red",
        "green",
        "red",
        "green",
        "green",
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "green",
        "red",
        "red",
        "green",
        "red",
        "green",
        "red",
        "red",
        "red",
        "red",
        "green",
        "red",
        "red"
      ]
    },
    {
      type: "line",
      name: "MA5",
      data: [
        [1506384000000, 27.56],
        [1506470400000, 27.19],
        [1506556800000, 26.79],
        [1506643200000, 26.48],
        [1507507200000, 26.55],
        [1507593600000, 26.51],
        [1507680000000, 26.52],
        [1507766400000, 26.66],
        [1507852800000, 26.79],
        [1508112000000, 26.76],
        [1508198400000, 26.68],
        [1508284800000, 26.6],
        [1508371200000, 26.39],
        [1508457600000, 26.23],
        [1508716800000, 26.16],
        [1508803200000, 26.31],
        [1508889600000, 26.51],
        [1508976000000, 26.81],
        [1509062400000, 27.08],
        [1509321600000, 27.69],
        [1509408000000, 28.08],
        [1509494400000, 28.42],
        [1509580800000, 28.81],
        [1509667200000, 28.95],
        [1509926400000, 28.64],
        [1510012800000, 28.42],
        [1510099200000, 28.12],
        [1510185600000, 27.76],
        [1510272000000, 27.63],
        [1510531200000, 27.55],
        [1510617600000, 27.68],
        [1510704000000, 27.84],
        [1510790400000, 28.09],
        [1510876800000, 28.37],
        [1511136000000, 28.74],
        [1511222400000, 29.39],
        [1511308800000, 30.21],
        [1511395200000, 30.68],
        [1511481600000, 31.26],
        [1511740800000, 31.78],
        [1511827200000, 31.57],
        [1511913600000, 31.84],
        [1512000000000, 31.82],
        [1512086400000, 31.61],
        [1512345600000, 31.47],
        [1512432000000, 31.53],
        [1512518400000, 30.92],
        [1512604800000, 30.67],
        [1512691200000, 30.48],
        [1512950400000, 30.3]
      ],
      yAxis: 0,
      color: "white",
      lineWidth: 0.8
    },
    {
      type: "line",
      name: "MA10",
      data: [
        [1506384000000, 27.72],
        [1506470400000, 27.83],
        [1506556800000, 27.72],
        [1506643200000, 27.41],
        [1507507200000, 27.26],
        [1507593600000, 27.04],
        [1507680000000, 26.85],
        [1507766400000, 26.72],
        [1507852800000, 26.63],
        [1508112000000, 26.65],
        [1508198400000, 26.6],
        [1508284800000, 26.56],
        [1508371200000, 26.52],
        [1508457600000, 26.51],
        [1508716800000, 26.46],
        [1508803200000, 26.5],
        [1508889600000, 26.55],
        [1508976000000, 26.6],
        [1509062400000, 26.65],
        [1509321600000, 26.92],
        [1509408000000, 27.2],
        [1509494400000, 27.47],
        [1509580800000, 27.81],
        [1509667200000, 28.01],
        [1509926400000, 28.17],
        [1510012800000, 28.25],
        [1510099200000, 28.27],
        [1510185600000, 28.28],
        [1510272000000, 28.29],
        [1510531200000, 28.09],
        [1510617600000, 28.05],
        [1510704000000, 27.98],
        [1510790400000, 27.93],
        [1510876800000, 28],
        [1511136000000, 28.14],
        [1511222400000, 28.54],
        [1511308800000, 29.02],
        [1511395200000, 29.38],
        [1511481600000, 29.81],
        [1511740800000, 30.26],
        [1511827200000, 30.48],
        [1511913600000, 31.02],
        [1512000000000, 31.25],
        [1512086400000, 31.43],
        [1512345600000, 31.63],
        [1512432000000, 31.55],
        [1512518400000, 31.38],
        [1512604800000, 31.24],
        [1512691200000, 31.05],
        [1512950400000, 30.89]
      ],
      yAxis: 0,
      color: "yellow",
      lineWidth: 0.8
    },
    {
      type: "line",
      name: "MA30",
      data: [
        [1506384000000, 24.73],
        [1506470400000, 24.92],
        [1506556800000, 25.1],
        [1506643200000, 25.24],
        [1507507200000, 25.39],
        [1507593600000, 25.53],
        [1507680000000, 25.67],
        [1507766400000, 25.83],
        [1507852800000, 25.98],
        [1508112000000, 26.08],
        [1508198400000, 26.18],
        [1508284800000, 26.29],
        [1508371200000, 26.38],
        [1508457600000, 26.49],
        [1508716800000, 26.59],
        [1508803200000, 26.7],
        [1508889600000, 26.82],
        [1508976000000, 26.87],
        [1509062400000, 26.93],
        [1509321600000, 27.05],
        [1509408000000, 27.17],
        [1509494400000, 27.29],
        [1509580800000, 27.35],
        [1509667200000, 27.31],
        [1509926400000, 27.29],
        [1510012800000, 27.26],
        [1510099200000, 27.23],
        [1510185600000, 27.2],
        [1510272000000, 27.19],
        [1510531200000, 27.22],
        [1510617600000, 27.28],
        [1510704000000, 27.33],
        [1510790400000, 27.42],
        [1510876800000, 27.51],
        [1511136000000, 27.59],
        [1511222400000, 27.76],
        [1511308800000, 27.95],
        [1511395200000, 28.09],
        [1511481600000, 28.25],
        [1511740800000, 28.42],
        [1511827200000, 28.58],
        [1511913600000, 28.82],
        [1512000000000, 28.99],
        [1512086400000, 29.15],
        [1512345600000, 29.31],
        [1512432000000, 29.45],
        [1512518400000, 29.56],
        [1512604800000, 29.64],
        [1512691200000, 29.72],
        [1512950400000, 29.75]
      ],
      yAxis: 0,
      color: "magenta",
      lineWidth: 0.8
    }
  ]
};
