import API from '../../utils/api.js'
import { wxRequest } from '../../utils/wx-request.js'

Page({
  options: {
  },

  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    detail: {
      title: '',
      image: '',
      body: ''
    },
    hint: ''
  },

  onShow() {
    this.initData()
  },

  /**
   * 组件的方法列表
   */
  initData() {
    // 详情路由参数
    const that = this
    // 获取请求api
    const url = API.ARTICLE_DETAIL
    wxRequest(`${url}${this.options.id}`).then(rs => {
      if (rs) {
        that.setData({
          detail: rs,
          hint: this.options.hint
        })
      }
    }).catch(res => {
    })
  },
  return() {
    wx.navigateBack()
  }
})