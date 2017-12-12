# Toast
弹出全局提示框，可选择手动或者自动关闭

## API

### Toast


### Toast.success

| 属性        | 说明                          | 类型            | 默认值         |
| --------- | --------------------------- | ------------- | ----------- |
| prefixCls | 样式前缀，如：`cefc-toast`，可用于自定义样式 | string        | `cefc-toast` |
| message | 需要的展示内容，支持 React 元素 | React.Element / string        | `必传` |
| duration  | 展示在界面里的时间，传0时右上角出现关闭按钮需要手动关闭Toast                         | number |   `2`         |



### Toast.danger

| 属性        | 说明                          | 类型            | 默认值         |
| --------- | --------------------------- | ------------- | ----------- |
| prefixCls | 样式前缀，如：`cefc-toast`，可用于自定义样式 | string        | `cefc-toast` |
| message | 需要的展示内容，支持 React 元素 | React.Element / string        | `必传` |
| duration  | 展示在界面里的时间，传0时右上角出现关闭按钮需要手动关闭Toast                         | number |   `3`         |




### Toast.close

#### 手动关闭当前展示的Toast


