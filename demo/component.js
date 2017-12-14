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
    // let dataArr =
    //   kLineChartConfig && this.handleKLineChartConfig(kLineChartConfig);
    let finalData = this.calculateData(kLineChartConfig);

      return (
      <div className="demoContainer">
      </div>
    );
  }
}

export default App;

const kLineChartConfig = [{"x":1506556800000,"open":12.85,"high":12.88,"low":12.77,"close":12.84,"color":"green","y":241249},{"x":1506643200000,"open":12.82,"high":12.91,"low":12.81,"close":12.87,"color":"red","y":198222,"MA5":12.87,"MA10":12.88,"MA30":12.83},{"x":1507507200000,"open":13.27,"high":13.29,"low":13,"close":13.04,"color":"green","y":521490,"MA5":12.89,"MA10":12.89,"MA30":12.85},{"x":1507593600000,"open":13.05,"high":13.1,"low":12.98,"close":13.1,"color":"red","y":274939,"MA5":12.94,"MA10":12.91,"MA30":12.87},{"x":1507680000000,"open":13.08,"high":13.11,"low":13.03,"close":13.06,"color":"green","y":187063,"MA5":12.98,"MA10":12.93,"MA30":12.89},{"x":1507766400000,"open":13.05,"high":13.09,"low":12.97,"close":13.05,"color":"green","y":171252,"MA5":13.02,"MA10":12.95,"MA30":12.91},{"x":1507852800000,"open":13.01,"high":13.08,"low":12.92,"close":12.94,"color":"green","y":208575,"MA5":13.04,"MA10":12.96,"MA30":12.91},{"x":1508112000000,"open":12.98,"high":13.06,"low":12.94,"close":13.04,"color":"red","y":236111,"MA5":13.04,"MA10":12.96,"MA30":12.92},{"x":1508198400000,"open":13.04,"high":13.06,"low":12.94,"close":12.99,"color":"green","y":146923,"MA5":13.02,"MA10":12.98,"MA30":12.92},{"x":1508284800000,"open":12.99,"high":13.1,"low":12.93,"close":13.07,"color":"red","y":454587,"MA5":13.02,"MA10":13,"MA30":12.93},{"x":1508371200000,"open":13.03,"high":13.16,"low":12.98,"close":13.13,"color":"red","y":528811,"MA5":13.03,"MA10":13.03,"MA30":12.94},{"x":1508457600000,"open":13.09,"high":13.1,"low":13.01,"close":13.01,"color":"green","y":172284,"MA5":13.05,"MA10":13.04,"MA30":12.95},{"x":1508716800000,"open":13.02,"high":13.03,"low":12.83,"close":12.84,"color":"green","y":315638,"MA5":13.01,"MA10":13.02,"MA30":12.95},{"x":1508803200000,"open":12.84,"high":12.95,"low":12.82,"close":12.86,"color":"red","y":272360,"MA5":12.98,"MA10":13,"MA30":12.95},{"x":1508889600000,"open":12.86,"high":12.94,"low":12.82,"close":12.9,"color":"red","y":207438,"MA5":12.95,"MA10":12.98,"MA30":12.94},{"x":1508976000000,"open":12.87,"high":12.88,"low":12.78,"close":12.82,"color":"green","y":252751,"MA5":12.89,"MA10":12.96,"MA30":12.94},{"x":1509062400000,"open":12.85,"high":12.94,"low":12.82,"close":12.85,"color":"green","y":326738,"MA5":12.85,"MA10":12.95,"MA30":12.94},{"x":1509321600000,"open":12.84,"high":12.84,"low":12.59,"close":12.7,"color":"green","y":747136,"MA5":12.83,"MA10":12.92,"MA30":12.93},{"x":1509408000000,"open":12.6,"high":12.66,"low":12.58,"close":12.61,"color":"red","y":201207,"MA5":12.78,"MA10":12.88,"MA30":12.91},{"x":1509494400000,"open":12.63,"high":12.72,"low":12.53,"close":12.54,"color":"green","y":353687,"MA5":12.7,"MA10":12.83,"MA30":12.9},{"x":1509580800000,"open":12.52,"high":12.57,"low":12.43,"close":12.53,"color":"red","y":482670,"MA5":12.65,"MA10":12.77,"MA30":12.89},{"x":1509667200000,"open":12.53,"high":12.6,"low":12.43,"close":12.58,"color":"red","y":328481,"MA5":12.59,"MA10":12.72,"MA30":12.88},{"x":1509926400000,"open":12.56,"high":12.56,"low":12.45,"close":12.47,"color":"green","y":200168,"MA5":12.55,"MA10":12.69,"MA30":12.87},{"x":1510012800000,"open":12.49,"high":12.6,"low":12.41,"close":12.54,"color":"red","y":386773,"MA5":12.53,"MA10":12.65,"MA30":12.86},{"x":1510099200000,"open":12.54,"high":12.68,"low":12.49,"close":12.58,"color":"red","y":371341,"MA5":12.54,"MA10":12.62,"MA30":12.85},{"x":1510185600000,"open":12.57,"high":12.63,"low":12.53,"close":12.55,"color":"green","y":174633,"MA5":12.54,"MA10":12.59,"MA30":12.84},{"x":1510272000000,"open":12.54,"high":12.63,"low":12.46,"close":12.63,"color":"red","y":499253,"MA5":12.55,"MA10":12.57,"MA30":12.83},{"x":1510531200000,"open":12.65,"high":12.85,"low":12.63,"close":12.8,"color":"red","y":780093,"MA5":12.62,"MA10":12.58,"MA30":12.82},{"x":1510617600000,"open":12.76,"high":12.77,"low":12.58,"close":12.6,"color":"green","y":337549,"MA5":12.63,"MA10":12.58,"MA30":12.81},{"x":1510704000000,"open":12.6,"high":12.63,"low":12.55,"close":12.6,"color":"green","y":280765,"MA5":12.64,"MA10":12.59,"MA30":12.8},{"x":1510790400000,"open":12.57,"high":12.57,"low":12.38,"close":12.39,"color":"green","y":356807,"MA5":12.6,"MA10":12.57,"MA30":12.79},{"x":1510876800000,"open":12.38,"high":12.8,"low":12.38,"close":12.78,"color":"red","y":1093365,"MA5":12.63,"MA10":12.59,"MA30":12.79},{"x":1511136000000,"open":12.7,"high":12.86,"low":12.61,"close":12.85,"color":"red","y":614954,"MA5":12.64,"MA10":12.63,"MA30":12.78},{"x":1511222400000,"open":12.81,"high":13.17,"low":12.75,"close":12.94,"color":"red","y":1161794,"MA5":12.71,"MA10":12.67,"MA30":12.78},{"x":1511308800000,"open":13,"high":13.44,"low":13,"close":13.23,"color":"red","y":1145762,"MA5":12.84,"MA10":12.74,"MA30":12.78},{"x":1511395200000,"open":13.24,"high":13.32,"low":12.91,"close":13.06,"color":"green","y":819126,"MA5":12.97,"MA10":12.79,"MA30":12.78},{"x":1511481600000,"open":13.11,"high":13.18,"low":12.93,"close":13.09,"color":"green","y":596124,"MA5":13.03,"MA10":12.83,"MA30":12.79},{"x":1511740800000,"open":13.09,"high":13.12,"low":12.81,"close":13.1,"color":"red","y":792502,"MA5":13.08,"MA10":12.86,"MA30":12.79},{"x":1511827200000,"open":13.03,"high":13.07,"low":12.92,"close":12.94,"color":"green","y":340319,"MA5":13.08,"MA10":12.9,"MA30":12.79},{"x":1511913600000,"open":12.95,"high":13.04,"low":12.81,"close":12.94,"color":"green","y":418467,"MA5":13.03,"MA10":12.93,"MA30":12.78},{"x":1512000000000,"open":12.91,"high":12.95,"low":12.8,"close":12.91,"color":"green","y":399163,"MA5":13,"MA10":12.98,"MA30":12.77},{"x":1512086400000,"open":12.93,"high":12.95,"low":12.81,"close":12.91,"color":"green","y":385774,"MA5":12.96,"MA10":13,"MA30":12.77},{"x":1512345600000,"open":12.87,"high":12.94,"low":12.84,"close":12.92,"color":"red","y":364792,"MA5":12.92,"MA10":13,"MA30":12.77},{"x":1512432000000,"open":12.92,"high":13.27,"low":12.91,"close":13.17,"color":"red","y":1237967,"MA5":12.97,"MA10":13.03,"MA30":12.78},{"x":1512518400000,"open":13.12,"high":13.16,"low":12.91,"close":12.96,"color":"green","y":435649,"MA5":12.97,"MA10":13,"MA30":12.79},{"x":1512604800000,"open":12.95,"high":13.03,"low":12.91,"close":12.96,"color":"red","y":348022,"MA5":12.98,"MA10":12.99,"MA30":12.79},{"x":1512691200000,"open":12.98,"high":12.99,"low":12.87,"close":12.93,"color":"green","y":312962,"MA5":12.99,"MA10":12.97,"MA30":12.79},{"x":1512950400000,"open":12.92,"high":13.04,"low":12.85,"close":12.97,"color":"red","y":366499,"MA5":13,"MA10":12.96,"MA30":12.8},{"x":1513036800000,"open":12.97,"high":12.97,"low":12.74,"close":12.75,"color":"green","y":303700,"MA5":12.91,"MA10":12.94,"MA30":12.81},{"x":1513123200000,"open":12.8,"high":12.81,"low":12.63,"close":12.74,"color":"green","y":193453,"MA5":12.87,"MA10":12.92,"MA30":12.81},{"x":1513209600000,"open":12.79,"high":12.79,"low":12.66,"close":12.69,"color":"green","y":161416,"MA5":12.82,"MA10":12.9,"MA30":12.82}];
