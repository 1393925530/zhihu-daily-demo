import getErrorMessage from "./expectionalError"

// host地址
const host = "https://news-at.zhihu.com"

// 合并请求参数: 将默认参数和实际请求的参数进行合并
const mergeRequestParmas = (perDefaults, params) => {
  return Object.assign({}, perDefaults, params)
}

// 请求封装
const wxRequest = async (subUrl, params = {}) => {
  const token = ''
  const defaults = {
    header: {
      "Content-Type": "application/json",
      token: token || ""
    },
    method: "GET",
    data: {}
  }

  // 合并参数
  const options = mergeRequestParmas(defaults, params)
  let res = await new Promise((resolve, reject) => {
    let url = host + subUrl
    const { header, method, data } = options
    wx.request({
      url,
      header,
      method,
      data,
      success: res => {
        const { data } = res
        if (res) {
          resolve(data)
        } else {
          let err = {
            request: res.request,
            response: {
              data: { status: res.data.code, description: res.data.message }
            }
          }
          const handlerErr = responseErrorHandler(err)
          res.err = handlerErr
          reject(res)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: e => {}
    })
  })
  return res
}

/**
 * 统一处理响应错误
 * @param {object} error
 */
const responseErrorHandler = error => {
  // 自定义错误
  let err = {
    title: "未知错误",
    description: "系统发生未知的错误"
  }
  if (error.response) {
    // 发送请求后，服务端有返回
    // 1. HTTP返回的响应码不是 2xx
    // 2. 服务端自定义错误,服务端响应码不是 2xx
    // 3. 客户端自定义错误,返回的数据被定义为错误状态
    err = getErrorMessage(error)
    if (err.code === 406) {
    }
  } else if (error.request) {
    // 发送请求但是没有响应返回
    err.title = "服务器忙"
    err.description = "服务器繁忙,请稍后重试"
  }
  return err
}

module.exports = {
  wxRequest
}