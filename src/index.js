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

    if (String(day).length < 2) { //说明是121这样的日期，转为1201
      day = '0' + String(day);
    }
    let currentDate = '日期:' + year + '/' + month + '/' + day;
    let { MA5, MA10, MA30, close, volume } = currentItem;
    let kLineJudge = (!MA5 && !MA10 && !MA30 && !close && !volume);

    if (kLineJudge) {
      return null;
    }

    // 下面两个if是为了实现开盘价和收盘价同行，最高价和最低价同行
    let openCloseLabel = {};
    let lowHighLabel = {};

    if (currentItem.open || currentItem.close) {
      // 判断openCloseLabel.label等于什么
      currentItem.open && (openCloseLabel.label = '开盘价');
      !currentItem.open && currentItem.close && (openCloseLabel.label = '收盘价');
      // 判断openCloseLabel.value等于什么
      let openValue = currentItem.open && numberFormat(currentItem.open);
      let closeLabel = currentItem.close && '收盘价';
      let closeValue = currentItem.close && numberFormat(currentItem.close);
      openCloseLabel.value = `${openValue}  ${closeLabel}: ${closeValue}`;
    }

    if (currentItem.high || currentItem.low) {
      // 判断lowHighLabel.label等于什么
      currentItem.high && (lowHighLabel.label = '最高价');
      !currentItem.high && currentItem.low && (lowHighLabel.label = '最低价');
      // 判断lowHighLabel.value等于什么
      let highValue = currentItem.high && numberFormat(currentItem.high);
      let lowLabel = currentItem.low && '最低价';
      let lowValue = currentItem.low && numberFormat(currentItem.low);
      lowHighLabel.value = `${highValue}  ${lowLabel}: ${lowValue}`;
    }

    return {
      x: currentDate,
      y: [
        openCloseLabel,
        lowHighLabel,
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
    let { type, chartData, width, ratio, height, lineChartHeight, barChartHeight, chartMargin, showGrid, offset, backgroundColor, lineTickValues, barTickValues  } = this.props;
    const xScaleProvider = scale.discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(chartData);
    const start = xAccessor(utils.last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];
    let gridWidth = width - chartMargin.left - chartMargin.right;
    let lineYGrid = showGrid ? {
      innerTickSize: -1 * gridWidth,
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 1,
      tickStrokeWidth: 1,
      tickSize: 100,
      tickValues: lineTickValues
    } : {};
    let barYGrid = showGrid ? {
      innerTickSize: -1 * gridWidth,
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 1,
      tickStrokeWidth: 1,
      tickSize: 100,
      tickValues: barTickValues
    } : {};

    return (
      <div className="container_bg_ChatBkg" style={{'backgroundColor': backgroundColor}}>
        <ChartCanvas height={height} width={width} ratio={ratio} margin={chartMargin} type={type} displayXAccessor={displayXAccessor} seriesName="MSFT" data={data} xScale={xScale} xAccessor={xAccessor} xExtents={xExtents} zIndex={0} panEvent mouseMoveEvent zoomEvent={false} clamp={false}>
          <Chart id={1} yExtents={[d => [d.high, d.low, d.MA5, d.MA10, d.MA30]]} height={lineChartHeight} origin={(w, h) => [0, 0]}>
            <axes.XAxis axisAt="bottom" orient="bottom" zoomEnabled={false} showTicks={false} showDomain={false} />
            <axes.YAxis axisAt="right" orient="right" zoomEnabled={false} showTickLabel={false} {...lineYGrid} showDomain={false} />
            <series.CandlestickSeries offset={offset} />
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
                    ])}
                fontSize={12}
                offset={offset}
            />
          </Chart>
          <Chart id={2} yExtents={[d => d.volume]} height={barChartHeight} origin={(w, h) => [0, h - 40]}>
            <axes.YAxis axisAt="left" orient="left" zoomEnabled={false} showTickLabel={false} {...barYGrid} showDomain={false} />
            <series.BarSeries
                yAccessor={d => {
                  return d.volume;
                }} fill={d => {
                  return d.volume ? d.volumeColor : '#393c43';
                }}
                offset={offset}
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
  barChartHeight: PropTypes.number,
  lineTickValues: PropTypes.array,
  barTickValues: PropTypes.array,
  ratio: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  chartMargin: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number
  }),
  showGrid: PropTypes.bool,
  offset: PropTypes.number,
  backgroundColor: PropTypes.string
};

stockChartKline.defaultProps = {
  type: 'hybrid',
  lineChartHeight: 168,
  barChartHeight: 40,
  lineTickValues: [],
  barTickValues: [],
  offset: 3,
  chartMargin: {
    left: 5, right: 5, top: 10, bottom: 0
  },
  showGrid: true
};

export default helper.fitDimensions(stockChartKline);
