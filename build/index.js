'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cefcStockcharts = require('cefc-stockcharts');

var _index = require('./style/index.css');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @description 将纯数字转换为包含中文单位万或者亿的数量
 * @author CarltonXiang
 * @config config
 *  @param num  待格式化的数字
 *  @param isInteger  是否显示整数
 *  @param precision 小数点精度 3代表显示3位小数，2代表显示2位小数
 *  @param defaultValue 默认显示
 */
var unitFormat = function unitFormat(config) {
  var value = '';
  var precision = 2; // 小数点精度，默认显示2位小数
  var isInteger = false; //是否是整数，不显示小数点
  var defaultValue = '--'; //默认显示
  var minUnitNum = 100000;
  var ONE_MILLION = 1000000;

  if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
    value = config.value;
    precision = config.precision || precision;
    isInteger = config.isInteger || isInteger;
    defaultValue = config.defaultValue || defaultValue;
    minUnitNum = config.minUnitNum || minUnitNum;
  } else {
    value = config;
  }

  var retNum = parseFloat(value);

  //若不是数字，返回默认数字
  if (isNaN(retNum)) {

    return defaultValue;
  }

  var YI = ONE_MILLION * 100;
  var WAN = ONE_MILLION / 100;

  var baseRate = retNum >= YI ? YI : retNum >= minUnitNum ? WAN : 1;
  var integerName = retNum >= YI ? '亿' : retNum >= minUnitNum ? '万' : '';

  retNum = retNum / baseRate;

  //数字1亿显示亿，大于百万显示万
  if (isInteger) {
    return '' + Math.round(retNum) + integerName;
  }

  var scale = Math.pow(10, parseInt(precision));
  retNum = isInteger ? Math.round(retNum) : parseFloat((Math.round(retNum * scale) / scale).toFixed(precision));

  return integerName ? '' + retNum + integerName : parseFloat(retNum);
};

/**
 * @description 格式化数字，根据数据精度，显示小数点的位数
 * @author CarltonXiang
 * @config
 *  @param value  待格式化的数字
 *  @param precision 小数点精度 3代表显示3位小数，2代表显示2位小数
 *  @param defaultValue 默认显示
 * @returns {string}
 */
var decimalFormat = function decimalFormat(config) {
  var value = '';
  var precision = 2; // 小数点精度，默认显示2位小数
  var defaultValue = '--'; //默认显示

  if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
    value = config.value;
    precision = config.precision || precision;
    defaultValue = config.defaultValue || defaultValue;
  } else {
    value = config;
    precision = preci ? preci : precision;
  }

  var returnNum = parseFloat(value);

  //不是数字，返回默认显示
  if (isNaN(returnNum)) {

    return defaultValue;
  }

  var val = returnNum * Math.pow(10, precision);

  return (Math.round(val) / Math.pow(10, precision)).toFixed(precision);
};

function tooltipContent(ys, precision) {
  return function (_ref) {
    var currentItem = _ref.currentItem,
        xAccessor = _ref.xAccessor;

    var xTime = currentItem.date;
    var year = xTime.getFullYear();
    var month = xTime.getMonth() + 1;
    var day = xTime.getDate();

    if (String(day).length < 2) {
      //说明是121这样的日期，转为1201
      day = '0' + String(day);
    }
    var currentDate = '日期:' + year + '/' + month + '/' + day;
    var MA5 = currentItem.MA5,
        MA10 = currentItem.MA10,
        MA30 = currentItem.MA30,
        close = currentItem.close,
        volume = currentItem.volume;

    var kLineJudge = !MA5 && !MA10 && !MA30 && !close && !volume;

    if (kLineJudge) {
      return null;
    }

    // 下面两个if是为了实现开盘价和收盘价同行，最高价和最低价同行
    var openCloseLabel = {};
    var lowHighLabel = {};

    if (currentItem.open || currentItem.close) {
      // 判断openCloseLabel.label等于什么
      currentItem.open && (openCloseLabel.label = '开盘价');
      !currentItem.open && currentItem.close && (openCloseLabel.label = '收盘价');
      // 判断openCloseLabel.value等于什么
      var openValue = currentItem.open && decimalFormat({ value: Number(currentItem.open), precision: precision });
      var closeLabel = currentItem.close && '收盘价';
      var closeValue = currentItem.close && decimalFormat({ value: Number(currentItem.close), precision: precision });
      openCloseLabel.value = openValue + '  ' + closeLabel + ': ' + closeValue;
    }

    if (currentItem.high || currentItem.low) {
      // 判断lowHighLabel.label等于什么
      currentItem.high && (lowHighLabel.label = '最高价');
      !currentItem.high && currentItem.low && (lowHighLabel.label = '最低价');
      // 判断lowHighLabel.value等于什么
      var highValue = currentItem.high && decimalFormat({ value: Number(currentItem.high), precision: precision });
      var lowLabel = currentItem.low && '最低价';
      var lowValue = currentItem.low && decimalFormat({ value: Number(currentItem.low), precision: precision });
      lowHighLabel.value = highValue + '  ' + lowLabel + ': ' + lowValue;
    }

    return {
      x: currentDate,
      y: [openCloseLabel, lowHighLabel, {
        label: '成交量',
        value: currentItem.volume && unitFormat({ value: currentItem.volume, precision: precision }) + '手'
      }].concat(ys.map(function (each) {
        return {
          label: each.label,
          value: decimalFormat({ value: Number(each.value(currentItem)), precision: precision }),
          stroke: each.stroke
        };
      })).filter(function (line) {
        return line.value;
      })
    };
  };
}

var stockChartKline = function (_Component) {
  _inherits(stockChartKline, _Component);

  function stockChartKline() {
    _classCallCheck(this, stockChartKline);

    return _possibleConstructorReturn(this, (stockChartKline.__proto__ || Object.getPrototypeOf(stockChartKline)).apply(this, arguments));
  }

  _createClass(stockChartKline, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          chartData = _props.chartData,
          width = _props.width,
          ratio = _props.ratio,
          height = _props.height,
          style = _props.style,
          lineChartHeight = _props.lineChartHeight,
          barChartHeight = _props.barChartHeight,
          chartMargin = _props.chartMargin,
          showGrid = _props.showGrid,
          offset = _props.offset,
          backgroundColor = _props.backgroundColor,
          lineTickValues = _props.lineTickValues,
          barTickValues = _props.barTickValues,
          eventCoordinateReverse = _props.eventCoordinateReverse,
          gridLabel = _props.gridLabel,
          precision = _props.precision;
      var startDay = gridLabel.startDay,
          endDay = gridLabel.endDay,
          yAxisLeft = gridLabel.yAxisLeft,
          volumeMax = gridLabel.volumeMax;

      var xScaleProvider = _cefcStockcharts.scale.discontinuousTimeScaleProvider.inputDateAccessor(function (d) {
        return d.date;
      });

      var _xScaleProvider = xScaleProvider(chartData),
          data = _xScaleProvider.data,
          xScale = _xScaleProvider.xScale,
          xAccessor = _xScaleProvider.xAccessor,
          displayXAccessor = _xScaleProvider.displayXAccessor;

      var start = xAccessor(_cefcStockcharts.utils.last(data));
      var end = xAccessor(data[Math.max(0, data.length - 150)]);
      var xExtents = [start, end];
      var gridWidth = width - chartMargin.left - chartMargin.right;
      var lineYGrid = {};
      var lineYDashGrid = {};

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

      var barYGrid = showGrid ? {
        innerTickSize: -1 * gridWidth,
        tickStrokeDasharray: 'Solid',
        tickStrokeOpacity: 1,
        tickStrokeWidth: 1,
        tickSize: 100,
        tickValues: barTickValues
      } : {};
      style.backgroundColor = backgroundColor;

      return _react2.default.createElement(
        'div',
        { className: 'container_bg_ChatBkg', style: style },
        _react2.default.createElement(
          'div',
          { className: 'realTimeOpenCloseTimeKLine' },
          _react2.default.createElement(
            'span',
            { className: 'fl_left' },
            startDay
          ),
          _react2.default.createElement(
            'span',
            { className: 'fl_right' },
            endDay
          ),
          _react2.default.createElement(
            'span',
            { className: 'yAxisLeft_top' },
            yAxisLeft[2]
          ),
          _react2.default.createElement(
            'span',
            { className: 'yAxisLeft_middle' },
            yAxisLeft[1]
          ),
          _react2.default.createElement(
            'span',
            { className: 'yAxisLeft_bottom' },
            yAxisLeft[0]
          ),
          _react2.default.createElement(
            'span',
            { className: 'show_vol' },
            volumeMax
          )
        ),
        _react2.default.createElement(
          _cefcStockcharts.ChartCanvas,
          { height: height, width: width, ratio: ratio, margin: chartMargin, type: type, displayXAccessor: displayXAccessor, seriesName: 'MSFT', data: data, xScale: xScale, xAccessor: xAccessor, xExtents: xExtents, zIndex: 0, eventCoordinateReverse: eventCoordinateReverse, panEvent: true, mouseMoveEvent: true, zoomEvent: false, clamp: false },
          _react2.default.createElement(
            _cefcStockcharts.Chart,
            { id: 1, yExtents: [function (d) {
                return [d.high, d.low, d.MA5, d.MA10, d.MA30];
              }], height: lineChartHeight, origin: function origin(w, h) {
                return [0, 0];
              } },
            _react2.default.createElement(_cefcStockcharts.axes.XAxis, { axisAt: 'bottom', orient: 'bottom', zoomEnabled: false, showTicks: false, showDomain: false }),
            _react2.default.createElement(_cefcStockcharts.axes.YAxis, _extends({ axisAt: 'right', orient: 'right', zoomEnabled: false, showTickLabel: false }, lineYGrid, { showDomain: false })),
            _react2.default.createElement(_cefcStockcharts.axes.YAxis, _extends({ axisAt: 'right', orient: 'right', zoomEnabled: false, showTickLabel: false }, lineYDashGrid, { showDomain: false })),
            _react2.default.createElement(_cefcStockcharts.series.CandlestickSeries, { offset: offset }),
            _react2.default.createElement(_cefcStockcharts.series.LineSeries, { yAccessor: function yAccessor(d) {
                return d.MA5;
              }, stroke: 'white' }),
            _react2.default.createElement(_cefcStockcharts.series.LineSeries, { yAccessor: function yAccessor(d) {
                return d.MA10;
              }, stroke: 'yellow' }),
            _react2.default.createElement(_cefcStockcharts.series.LineSeries, { yAccessor: function yAccessor(d) {
                return d.MA30;
              }, stroke: 'magenta' }),
            _react2.default.createElement(_cefcStockcharts.tooltip.HoverTooltip, {
              tooltipContent: tooltipContent([{
                label: 'MA5',
                value: function value(d) {
                  return d.MA5;
                },
                stroke: 'white'
              }, {
                label: 'MA10',
                value: function value(d) {
                  return d.MA10;
                },
                stroke: 'yellow'
              }, {
                label: 'MA30',
                value: function value(d) {
                  return d.MA30;
                },
                stroke: 'magenta'
              }], precision),
              fontSize: 12,
              offset: offset
            })
          ),
          _react2.default.createElement(
            _cefcStockcharts.Chart,
            { id: 2, yExtents: [function (d) {
                return d.volume;
              }], height: barChartHeight, origin: function origin(w, h) {
                return [0, h - barChartHeight];
              } },
            _react2.default.createElement(_cefcStockcharts.axes.YAxis, _extends({ axisAt: 'left', orient: 'left', zoomEnabled: false, showTickLabel: false }, barYGrid, { showDomain: false })),
            _react2.default.createElement(_cefcStockcharts.series.BarSeries, {
              yAccessor: function yAccessor(d) {
                return d.volume;
              }, fill: function fill(d) {
                return d.volume ? d.volumeColor : '#393c43';
              },
              offset: offset
            })
          )
        )
      );
    }
  }]);

  return stockChartKline;
}(_react.Component);

stockChartKline.propTypes = {
  chartData: _propTypes2.default.array.isRequired,
  type: _propTypes2.default.oneOf(['svg', 'hybrid']),
  lineChartHeight: _propTypes2.default.number,
  barChartHeight: _propTypes2.default.number,
  lineTickValues: _propTypes2.default.array,
  barTickValues: _propTypes2.default.array,
  ratio: _propTypes2.default.number,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  chartMargin: _propTypes2.default.shape({
    left: _propTypes2.default.number,
    right: _propTypes2.default.number,
    top: _propTypes2.default.number,
    bottom: _propTypes2.default.number
  }),
  showGrid: _propTypes2.default.bool,
  offset: _propTypes2.default.number,
  style: _propTypes2.default.object,
  eventCoordinateReverse: _propTypes2.default.bool,
  backgroundColor: _propTypes2.default.string,
  isIndex: _propTypes2.default.bool,
  gridLabel: _propTypes2.default.object,
  precision: _propTypes2.default.number
};

stockChartKline.defaultProps = {
  type: 'hybrid',
  lineChartHeight: 168,
  barChartHeight: 50,
  lineTickValues: [],
  barTickValues: [],
  offset: 3,
  eventCoordinateReverse: false,
  chartMargin: {
    left: 5, right: 5, top: 10, bottom: 0
  },
  showGrid: true,
  style: {},
  isIndex: false,
  precision: 2
};

exports.default = _cefcStockcharts.helper.fitDimensions(stockChartKline);