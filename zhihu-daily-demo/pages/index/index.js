// index.js
// 获取应用实例
const app = getApp()
var utils = require('../../utils/util.js')
import API from '../../utils/api.js'
import { wxRequest } from '../../utils/wx-request.js'

Page({
  data: {
    day: '',
    month: '',
    title: '',
    src: 'https://pic3.zhimg.com/v2-b266a722d8428e1042e785a61ce3f4a9_xl.jpg',
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 800,
    listArr: []
  },
  onLoad() {
    this.getTitle()
    this.getSwiper()
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getTitle() {
    const now = new Date()
    this.setData({
      day: now.getDate(),
      month: utils.translateNumber(now.getMonth() + 1) + '月',
      title: now.getHours() + 1 > 23 ? '早点休息' : '知乎日报'
    })
  },
  getSwiper() {
    const that = this
    // 获取请求api
    const url = API.LATEST_ARTICLE
    wxRequest(url).then(rs => {
      if (rs) {
        that.setData({
          background: rs.top_stories,
          listArr: rs.stories
        })
      }
    }).catch(res => {
    })
  },
  clickSwiper(event) {
    if (event.currentTarget.dataset.item) {
      let item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/detail/detail?id=${item.id}&&hint=${item.hint}`
      })
    }
  },
  clickList(event) {
    if (event.currentTarget.dataset.item) {
      let item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/detail/detail?id=${item.id}&&hint=作者 / ${item.hint}`
      })
    }
  },
  lower(e) {
    console.log(e)
  }
})
