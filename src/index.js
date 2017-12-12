"use strict";
import React, { Component } from "react";
import Chart from "./Chart";
import styles from "./style/index.less";
import PropTypes from "prop-types";

class stockChartKline extends Component {
  static propTypes = {
    config: PropTypes.object,
    startDay: PropTypes.string,
    endDay: PropTypes.string,
    volumeMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onToggleOrientation: PropTypes.func,
    kLineChartConfig: PropTypes.object
  };

  calculateData() {
    const { data } = this.props;
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
    let finalData = this.calculateData();

    return <div className="container_bg_ChatBkg">
        <Chart type="hybrid" data={finalData} />
      </div>;
  }
}

export default stockChartKline;

