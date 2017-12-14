'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import {
  ChartCanvas,
  Chart,
  axes,
  helper,
  utils,
  tooltip,
  scale,
  series
} from 'cefc-reactstockcharts';
import styles from './style/index.less';
const numberFormat = format('.2f');

function tooltipContent(ys) {
  return ({ currentItem, xAccessor }) => {
    let xTime = currentItem.date;
    let year = xTime.getFullYear();
    let month = xTime.getMonth() + 1;
    let day = xTime.getDate();
    let currentDate = '日期:' + year + '/' + month + '/' + day;
    let { MA5, MA10, MA30, close, volume } = currentItem;
    let kLineJudge = (!MA5 && !MA10 && !MA30 && !close && !volume);

    if (kLineJudge) {
      return null;
    }

    return {
      x: currentDate,
      y: [
        {
          label: '开盘价',
          value: currentItem.open && numberFormat(currentItem.open)
        },
        {
          label: '收盘价',
          value: currentItem.close && numberFormat(currentItem.close)
        },
        {
          label: '最高价',
          value: currentItem.high && numberFormat(currentItem.high)
        },
        {
          label: '最低价',
          value: currentItem.low && numberFormat(currentItem.low)
        },
        {
          label: '成交量',
          value: currentItem.volume && numberFormat(currentItem.volume)
        }
      ]
        .concat(ys.map(each => ({
          label: each.label,
          value: each.value(currentItem),
          stroke: each.stroke
        }))).filter(line => line.value)
    };
  };
}

class stockChartKline extends Component {

  render() {
    let {
      type,
      chartData,
      width,
      ratio,
      height,
      lineChartHeight,
      barChartHeight
    } = this.props;
    const margin = { left: 0, right: 25, top: 10, bottom: 20 };
    const xScaleProvider = scale.discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(chartData);
    const start = xAccessor(utils.last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <div className="container_bg_ChatBkg">
        <ChartCanvas height={height} width={width} ratio={ratio} margin={margin} type={type} displayXAccessor={displayXAccessor} seriesName="MSFT" data={data} xScale={xScale} xAccessor={xAccessor} xExtents={xExtents} zIndex={0} panEvent mouseMoveEvent zoomEvent={false} clamp={false}>
          <Chart id={1} yExtents={[d => [d.high, d.low, d.MA5, d.MA10, d.MA30]]} height={lineChartHeight} origin={(w, h) => [0, 0]}>
            <axes.XAxis axisAt="bottom" orient="bottom" ticks={1} zoomEnabled={false} showTicks={false} showDomain={false} />
            <axes.YAxis axisAt="right" orient="right" ticks={2} zoomEnabled={false} showTicks={false} showDomain={false} />
            <series.CandlestickSeries />
            <series.LineSeries yAccessor={d => d.MA5} stroke="white" />
            <series.LineSeries yAccessor={d => d.MA10} stroke="yellow" />
            <series.LineSeries yAccessor={d => d.MA30} stroke="magenta" />
            <tooltip.HoverTooltip
                tooltipContent={tooltipContent([
                    {
                      label: 'MA5',
                        value: d => d.MA5,
                        stroke: 'white'
                    },
                    {
                      label: 'MA10',
                        value: d => d.MA10,
                        stroke: 'yellow'
                    },
                    {
                      label: 'MA30',
                        value: d => d.MA30,
                        stroke: 'magenta'
                    }
                    ])} fontSize={15}
            />
          </Chart>
          <Chart id={2} yExtents={[d => d.volume]} height={barChartHeight} origin={(w, h) => [0, h - 40]}>
            <axes.YAxis axisAt="left" orient="left" ticks={5} tickFormat={format('.0s')} showTicks={false} showDomain={false} />
            <series.BarSeries
                yAccessor={d => {
                  return d.volume;
                }} fill={d => {
                  return d.volume ? d.volumeColor : '#393c43';
                }}
            />
          </Chart>
        </ChartCanvas>
      </div>)
  }
}

stockChartKline.propTypes = {
  chartData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']),
  lineChartHeight: PropTypes.number,
  width: PropTypes.number,
  barChartHeight: PropTypes.number,
  ratio: PropTypes.number,
  height: PropTypes.number,
};

stockChartKline.defaultProps = {
  type: 'hybrid',
  lineChartHeight: 168,
  barChartHeight: 40
};

export default helper.fitDimensions(stockChartKline);
