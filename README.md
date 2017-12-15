# KLine
K线图组件


| 属性        | 说明                          | 类型            | 默认值         |
| --------- | --------------------------- | ------------- | ----------- |
| data | data是K线图的数据来源，数据结构必须为{"x":1510531200000,"open":27.45,"high":27.49,"low":26.8,"close":27.06,"fixed":"","color":"green","y":347146,"MA5":27.55,"MA10":28.09,"MA30":27.22} | array        |  null |
| lineChartHeight | 设置上面折线图的高度 | number        |  168 |
| barChartHeight | 设置下面面柱状的高度 | number        |  40 |
| type |  绘图类型可以选: svg 或 hybrid。hybrid 将使用 canvas 创建 DataSeries 的内容,但轴和其他元素是 svg | oneOf(["svg", "hybrid"])        |  "hybrid" |
| chartMargin |  chartMargin用来设置图表的margin，传入形式为chartMargin={{left: 0, right: 0, top: 10, bottom: 50}} | object       |  left: 0, right: 0, top: 10, bottom: 50 |

 


