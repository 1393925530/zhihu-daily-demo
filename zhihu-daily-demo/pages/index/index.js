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
    const now = new Date()
    // 获取请求api
    const url = API.LATEST_ARTICLE
    wxRequest(url).then(rs => {
      if (rs) {
        let firstArr = []
        let dateProp = (now.getMonth() + 1) + '月' + now.getDate() + '日'
        let firstObj = {
          date: dateProp,
          list: rs.stories,
          formatData: now
        }
        firstArr.push(firstObj)
        that.setData({
          background: rs.top_stories,
          listArr: firstArr
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
    let currentList = Object.assign(this.data.listArr)
    let today = currentList[currentList.length - 1].formatData
    let yerstoday = new Date(today).getTime() - 24 * 60 * 60 * 1000
    const yerstodayDate = new Date(yerstoday)
    const dateParam = yerstodayDate.getFullYear() + (yerstodayDate.getMonth() + 1 > 10 ? yerstodayDate.getMonth() + 1 : '0' + (yerstodayDate.getMonth() + 1)) + (yerstodayDate.getDate() + 1 > 10 ? yerstodayDate.getDate() : '0' + yerstodayDate.getDate()) + ''
    const that = this
    // 获取请求api
    const url = API.PAST_ARTICLE + dateParam
    wxRequest(url).then(rs => {
      if (rs) {
        let firstArr = Object.assign(that.data.listArr)
        let dateProp = (yerstodayDate.getMonth() + 1) + '月' + yerstodayDate.getDate() + '日'
        let firstObj = {
          date: dateProp,
          list: rs.stories,
          formatData: new Date(yerstoday)
        }
        firstArr.push(firstObj)
        that.setData({
          listArr: firstArr
        })
      }
    }).catch(res => {
    })
  }
})
