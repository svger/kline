
import React from "react";
import PropTypes from "prop-types";
import { format } from "cefc-reactstockcharts/node_modules/d3-format";
import { timeFormat } from "cefc-reactstockcharts/node_modules/d3-time-format";
import { ChartCanvas, Chart } from "cefc-reactstockcharts";
import {
	BarSeries,
	CandlestickSeries,
	LineSeries,
} from "cefc-reactstockcharts/lib/series";
import { XAxis, YAxis } from "cefc-reactstockcharts/lib/axes";
import {
	EdgeIndicator,
} from "cefc-reactstockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "cefc-reactstockcharts/lib/scale";
import {
	HoverTooltip,
} from "cefc-reactstockcharts/lib/tooltip";
import { ema, kma, sma, macd } from "cefc-reactstockcharts/lib/indicator";
import { fitWidth, fitDimensions} from "cefc-reactstockcharts/lib/helper";
import { last } from "cefc-reactstockcharts/lib/utils";
import { scalePoint, scaleLinear, scaleIdentity } from  "cefc-reactstockcharts/node_modules/d3-scale";

const dateFormat = timeFormat("%Y-%m-%d");
const numberFormat = format(".2f");

function tooltipContent(ys) {
	return ({ currentItem, xAccessor }) => {

    let xTime = currentItem.date;
    let year  = xTime.getFullYear();
    let month  = xTime.getMonth()+1;
    let day   = xTime.getDate();
    let currentDate = '日期:' + year + '/' + month  + '/' +  day;
    let { MA5, MA10, MA30, close, volume } = currentItem;
    let kLineJudge = !MA5 && !MA10 && !MA30 && !close && !volume;

    if (kLineJudge) {
      return null;
    }

		return {
			x: currentDate,
			y: [
				{ label: "开盘价", value: currentItem.open && numberFormat(currentItem.open) },
        { label: "收盘价", value: currentItem.close && numberFormat(currentItem.close) },
        { label: "最高价", value: currentItem.high && numberFormat(currentItem.high) },
				{ label: "最低价", value: currentItem.low && numberFormat(currentItem.low) },
        { label: "成交量", value: currentItem.volume && numberFormat(currentItem.volume) },
      ]
			.concat(ys.map(each => ({
				label: each.label,
				value: each.value(currentItem),
				stroke: each.stroke,
			})))
			.filter(line => line.value)
		};
	};
}

const keyValues = ["high", "low"];

class CandleStickChartWithHoverTooltip extends React.Component {

	removeRandomValues(data) {
		return data.map(item => {
			const newItem = { ...item };
			const numberOfDeletion = Math.floor(Math.random() * keyValues.length) + 1;
			for (let i = 0; i < numberOfDeletion; i += 1) {
				const randomKey = keyValues[Math.floor(Math.random() * keyValues.length)];
				newItem[randomKey] = undefined;
			}
			return newItem;
		});
	}

	render() {
		let { type, data: initialData, width, ratio, height } = this.props;
    const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => {d.ema20 = c;})
			.accessor(d => d.ema20);
    const ema30 = ema()
      .id(0)
      .options({ windowSize: 30 })
      .merge((d, c) => {d.ema30 = c;})
      .accessor(d => d.ema30);

		const ema50 = ema()
			.id(2)
			.options({ windowSize: 50 })
			.merge((d, c) => {d.ema50 = c;})
			.accessor(d => {return d.ema50});

    const margin = { left: 0, right: 25, top: 10, bottom: 20 };
    const calculatedData = initialData;
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData);
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];
    var gridHeight = height - margin.top - margin.bottom;
    var gridWidth = width - margin.left - margin.right;

    var showGrid = true;
    var yGrid = showGrid ? {
        innerTickSize: -1 * gridWidth,
        tickStrokeDasharray: 'Solid',
        tickStrokeOpacity: 1,
        tickStrokeWidth: 1
      } : {};
    var xGrid = showGrid ? {
        innerTickSize: -1 * gridHeight,
        tickStrokeDasharray: 'Solid',
        tickStrokeOpacity: 1,
        tickStrokeWidth: 1
      } : {};

    return (
      <div >
        <ChartCanvas height={height}
                     width={width}
                     ratio={ratio}
                     margin={margin}
                     type={type}
                     seriesName="MSFT"
                     data={data}
                     xScale={xScale}
                     xAccessor={xAccessor}
                     xExtents={xExtents}
                     panEvent={true}
                     zoomEvent={false}
                     mouseMoveEvent={true}
                     zIndex={0}
                     clamp={false}>
          <Chart id={1}
                 yExtents={[d => [d.high, d.low, d.MA5, d.MA10, d.MA30]]}
                 height={168} origin={(w, h) => [0, 0]}>

            <XAxis axisAt="bottom" orient="bottom" ticks={1} zoomEnabled={false} showTicks={false} showDomain={false}/>
            <YAxis axisAt="right" orient="right" ticks={2} zoomEnabled={false} showTicks={false} showDomain={false}/>

            <CandlestickSeries/>
            <LineSeries yAccessor={d => d.MA5} stroke='white'/>
            <LineSeries yAccessor={d => d.MA10} stroke='yellow'/>
            <LineSeries yAccessor={d => d.MA30} stroke='magenta'/>

            <HoverTooltip
              yAccessor={ema50.accessor()}
              tooltipContent={tooltipContent([
							{
								label: `MA5`,
								value: d => d.MA5,
								stroke:'white'
							},
							{
								label: `MA10`,
								value: d => d.MA10,
								stroke:'yellow'
							},
							{
								label: `MA30`,
								value: d => d.MA30,
								stroke:'magenta'
							}
						])}
              fontSize={15} />
          </Chart>
          <Chart id={2}
                 yExtents={[d => d.volume]}
                 height={40} origin={(w, h) => [0, h - 40]}>
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")} showTicks={false} showDomain={false}/>

            <BarSeries yAccessor={d => { return d.volume;}} fill={d =>  {return d.volume ? d.volumeColor : '#393c43';}}/>
          </Chart>
        </ChartCanvas>
      </div>
		);
	}
}

CandleStickChartWithHoverTooltip.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithHoverTooltip.defaultProps = {
	type: "svg",
};

CandleStickChartWithHoverTooltip = fitDimensions(CandleStickChartWithHoverTooltip);

export default CandleStickChartWithHoverTooltip;
