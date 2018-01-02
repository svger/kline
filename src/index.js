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
} from 'cefc-stockcharts';
import styles from './style/index.less';

/**
 * @description 将纯数字转换为包含中文单位万或者亿的数量
 * @author CarltonXiang
 * @config config
 *  @param num  待格式化的数字
 *  @param isInteger  是否显示整数
 *  @param precision 小数点精度 3代表显示3位小数，2代表显示2位小数
 *  @param defaultValue 默认显示
 */
const unitFormat = (config) => {
  let value = '';
  let precision = 2; // 小数点精度，默认显示2位小数
  let isInteger = false; //是否是整数，不显示小数点
  let defaultValue = '--'; //默认显示
  let minUnitNum = 1000000;
  const ONE_MILLION = 1000000;

  if (typeof config === 'object') {
    value = config.value;
    precision = config.precision || precision;
    isInteger = config.isInteger || isInteger;
    defaultValue = config.defaultValue || defaultValue;
    minUnitNum = config.minUnitNum || minUnitNum;
  } else {
    value = config;
  }

  let retNum = parseFloat(value);

  //若不是数字，返回默认数字
  if (isNaN(retNum)) {

    return defaultValue;
  }

  const YI = ONE_MILLION * 100;
  const WAN = ONE_MILLION / 100;

  const baseRate = retNum >= YI ? YI : (retNum >= minUnitNum ? WAN : 1);
  const integerName = retNum >= YI ? '亿' : (retNum >= minUnitNum ? '万' : '');

  retNum = retNum / baseRate;

  //数字1亿显示亿，大于百万显示万
  if (isInteger) {
    return `${Math.round(retNum)}${integerName}`;
  }

  const scale = Math.pow(10, parseInt(precision));
  retNum = isInteger ? Math.round(retNum) : parseFloat((Math.round(retNum * scale) / scale).toFixed(precision));

  return integerName ? `${retNum}${integerName}` : parseFloat(retNum);
}

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
          value: currentItem.volume && unitFormat({ value: currentItem.volume })
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
    let { type, chartData, width, ratio, height, style, lineChartHeight, barChartHeight, chartMargin, showGrid, offset, backgroundColor, lineTickValues, barTickValues  } = this.props;
    const xScaleProvider = scale.discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(chartData);
    const start = xAccessor(utils.last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];
    let gridWidth = width - chartMargin.left - chartMargin.right;
    let lineYGrid = {};
    let lineYDashGrid = {};

    if (lineTickValues.length >= 4) {
      lineYGrid = showGrid ? {
        innerTickSize: -1 * gridWidth,
        tickStrokeDasharray: 'Solid',
        tickStrokeOpacity: 1,
        tickStrokeWidth: 1,
        tickSize: 100,
        tickValues: [lineTickValues[0], lineTickValues[2]]
      } : {};

      lineYDashGrid = showGrid ? {
        innerTickSize: -1 * gridWidth,
        tickStrokeDasharray: 'ShortDash',
        tickStrokeOpacity: 1,
        tickStrokeWidth: 1,
        tickSize: 100,
        tickValues: [lineTickValues[1], lineTickValues[3]]
      } : {};
    }

    let barYGrid = showGrid ? {
      innerTickSize: -1 * gridWidth,
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 1,
      tickStrokeWidth: 1,
      tickSize: 100,
      tickValues: barTickValues
    } : {};
    style.backgroundColor = backgroundColor;

    return (
      <div className="container_bg_ChatBkg" style={style} >
        <ChartCanvas height={height} width={width} ratio={ratio} margin={chartMargin} type={type} displayXAccessor={displayXAccessor} seriesName="MSFT" data={data} xScale={xScale} xAccessor={xAccessor} xExtents={xExtents} zIndex={0} panEvent mouseMoveEvent zoomEvent={false} clamp={false}>
          <Chart id={1} yExtents={[d => [d.high, d.low, d.MA5, d.MA10, d.MA30]]} height={lineChartHeight} origin={(w, h) => [0, 0]}>
            <axes.XAxis axisAt="bottom" orient="bottom" zoomEnabled={false} showTicks={false} showDomain={false} />
            <axes.YAxis axisAt="right" orient="right" zoomEnabled={false} showTickLabel={false} {...lineYGrid} showDomain={false} />
            <axes.YAxis axisAt="right" orient="right" zoomEnabled={false} showTickLabel={false} {...lineYDashGrid} showDomain={false} />

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
          <Chart id={2} yExtents={[d => d.volume]} height={barChartHeight} origin={(w, h) => [0, h - barChartHeight]}>
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
  style: PropTypes.object,
  backgroundColor: PropTypes.string
};

stockChartKline.defaultProps = {
  type: 'hybrid',
  lineChartHeight: 168,
  barChartHeight: 50,
  lineTickValues: [],
  barTickValues: [],
  offset: 3,
  chartMargin: {
    left: 5, right: 5, top: 10, bottom: 0
  },
  showGrid: true,
  style: {}
};

export default helper.fitDimensions(stockChartKline);
