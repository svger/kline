'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require('d3-format');

var _cefcReactstockcharts = require('cefc-reactstockcharts');

var _index = require('./style/index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numberFormat = (0, _d3Format.format)('.2f');

function tooltipContent(ys) {
  return function (_ref) {
    var currentItem = _ref.currentItem,
        xAccessor = _ref.xAccessor;

    var xTime = currentItem.date;
    var year = xTime.getFullYear();
    var month = xTime.getMonth() + 1;
    var day = xTime.getDate();
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

    return {
      x: currentDate,
      y: [{
        label: '开盘价',
        value: currentItem.open && numberFormat(currentItem.open)
      }, {
        label: '收盘价',
        value: currentItem.close && numberFormat(currentItem.close)
      }, {
        label: '最高价',
        value: currentItem.high && numberFormat(currentItem.high)
      }, {
        label: '最低价',
        value: currentItem.low && numberFormat(currentItem.low)
      }, {
        label: '成交量',
        value: currentItem.volume && numberFormat(currentItem.volume)
      }].concat(ys.map(function (each) {
        return {
          label: each.label,
          value: each.value(currentItem),
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
          lineChartHeight = _props.lineChartHeight,
          barChartHeight = _props.barChartHeight;

      var margin = { left: 0, right: 25, top: 10, bottom: 20 };
      var xScaleProvider = _cefcReactstockcharts.scale.discontinuousTimeScaleProvider.inputDateAccessor(function (d) {
        return d.date;
      });

      var _xScaleProvider = xScaleProvider(chartData),
          data = _xScaleProvider.data,
          xScale = _xScaleProvider.xScale,
          xAccessor = _xScaleProvider.xAccessor,
          displayXAccessor = _xScaleProvider.displayXAccessor;

      var start = xAccessor(_cefcReactstockcharts.utils.last(data));
      var end = xAccessor(data[Math.max(0, data.length - 150)]);
      var xExtents = [start, end];

      return _react2.default.createElement(
        'div',
        { className: 'container_bg_ChatBkg' },
        _react2.default.createElement(
          _cefcReactstockcharts.ChartCanvas,
          { height: height, width: width, ratio: ratio, margin: margin, type: type, displayXAccessor: displayXAccessor, seriesName: 'MSFT', data: data, xScale: xScale, xAccessor: xAccessor, xExtents: xExtents, zIndex: 0, panEvent: true, mouseMoveEvent: true, zoomEvent: false, clamp: false },
          _react2.default.createElement(
            _cefcReactstockcharts.Chart,
            { id: 1, yExtents: [function (d) {
                return [d.high, d.low, d.MA5, d.MA10, d.MA30];
              }], height: lineChartHeight, origin: function origin(w, h) {
                return [0, 0];
              } },
            _react2.default.createElement(_cefcReactstockcharts.axes.XAxis, { axisAt: 'bottom', orient: 'bottom', ticks: 1, zoomEnabled: false, showTicks: false, showDomain: false }),
            _react2.default.createElement(_cefcReactstockcharts.axes.YAxis, { axisAt: 'right', orient: 'right', ticks: 2, zoomEnabled: false, showTicks: false, showDomain: false }),
            _react2.default.createElement(_cefcReactstockcharts.series.CandlestickSeries, null),
            _react2.default.createElement(_cefcReactstockcharts.series.LineSeries, { yAccessor: function yAccessor(d) {
                return d.MA5;
              }, stroke: 'white' }),
            _react2.default.createElement(_cefcReactstockcharts.series.LineSeries, { yAccessor: function yAccessor(d) {
                return d.MA10;
              }, stroke: 'yellow' }),
            _react2.default.createElement(_cefcReactstockcharts.series.LineSeries, { yAccessor: function yAccessor(d) {
                return d.MA30;
              }, stroke: 'magenta' }),
            _react2.default.createElement(_cefcReactstockcharts.tooltip.HoverTooltip, {
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
              }]), fontSize: 15
            })
          ),
          _react2.default.createElement(
            _cefcReactstockcharts.Chart,
            { id: 2, yExtents: [function (d) {
                return d.volume;
              }], height: barChartHeight, origin: function origin(w, h) {
                return [0, h - 40];
              } },
            _react2.default.createElement(_cefcReactstockcharts.axes.YAxis, { axisAt: 'left', orient: 'left', ticks: 5, tickFormat: (0, _d3Format.format)('.0s'), showTicks: false, showDomain: false }),
            _react2.default.createElement(_cefcReactstockcharts.series.BarSeries, {
              yAccessor: function yAccessor(d) {
                return d.volume;
              }, fill: function fill(d) {
                return d.volume ? d.volumeColor : '#393c43';
              }
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
  width: _propTypes2.default.number,
  barChartHeight: _propTypes2.default.number,
  ratio: _propTypes2.default.number,
  height: _propTypes2.default.number
};

stockChartKline.defaultProps = {
  type: 'hybrid',
  lineChartHeight: 168,
  barChartHeight: 40
};

exports.default = _cefcReactstockcharts.helper.fitDimensions(stockChartKline);