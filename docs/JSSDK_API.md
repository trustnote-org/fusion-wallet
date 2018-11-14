在 TrustNote 应用内打开 H5 网页，可以使用 JSApi 和钱包实现通信，JSApi 方便开发者的小应用在 TrustNote 环境内调用钱包已开放功能

**开发者需要在项目内引入 trustnote.js 文件**

调用接口如果需要传入回调函数，在钱包处理完请求后，会执行用户回调函数并传回参数，参数 resp 格式为：

```
{
    eventName: "",
    message: {},
    error: {}
}
```

**eventName:** 处理事件名称

**message:** 返回内容，错误的时候为 null

**error:** 错误信息，正常情况为 null

<hr/>

> ### getAddress

```javascript
function getAddress(callback)
```

**getAddress 参数格式：**

| 参数           | 类型     | 描述                       |
| -------------- | -------- | -------------------------- |
| callback(resp) | function | 必须是函数，且接受一个参数 |

**示例：**

```
trustnote.getAddress(function(resp){})
```

**返回值：**

```
{
    eventName: "address",
    message: {
        address: "IHYT6TOLUDWNX2IV4PLMINTAM5UGVPXW"
    },
    error: null
}
```

<hr/>

> ### callPay

```javascript
function callPay(data, callback)
```

**callPay 参数格式：**

| 参数           | 类型     | 描述                       |
| -------------- | -------- | -------------------------- |
| data           | object   | 支付参数                   |
| callback(resp) | function | 必须是函数，且接受一个参数 |

**data 类型格式：**

| 键      | 类型   | 描述             |
| ------- | ------ | ---------------- |
| payer   | string | 支付参数         |
| outputs | array  | 收款方地址和金额 |
| message | string | 附加消息         |

**outputs 类型格式：**

| 键      | 类型   | 描述     |
| ------- | ------ | -------- |
| address | string | 收款地址 |
| amount  | number | 收款金额 |

**示例：**

```
var data = {
    payer: "IHYT6TOLUDWNX2IV4PLMINTAM5UGVPXW",
    outputs: [{
        address: "EKZ2YRGH5GYIGAJ2SOTAVLIBQWSGTYYQ",
        amount: 10
    }],
    message: "hello world"
}

trustnote.callPay(data, function(resp){})
```

**返回值：**

```
{
    eventName: "payment",
    message: {
        unit: "MulUMgOU4e2ApF0Egq8R4vPt0alrz98y2JCk+gSQYiM="
    },
    error: null
}
```

<hr/>
