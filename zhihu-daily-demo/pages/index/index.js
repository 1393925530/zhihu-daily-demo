// index.js
// 获取应用实例
const app = getApp()
var utils = require('../../utils/util.js')

Page({
  data: {
    day: '',
    month: '',
    src: 'https://pic3.zhimg.com/v2-b266a722d8428e1042e785a61ce3f4a9_xl.jpg',
    background: [
      {
        id: 1,
        title: 'demo-text-1',
        author: '某某1'
      },
      {
        id: 2,
        title: 'demo-text-2',
        author: '某某2'
      },
      {
        id: 3,
        title: 'demo-text-3',
        author: '某某3'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.getDate()
  },
  getDate() {
    const now = new Date()
    this.setData({
      day: now.getDate(),
      month: utils.translateNumber(now.getMonth() + 1) + '月'
    })
  },
  clickSwiper(event) {
    if (event.currentTarget.dataset.item) {
      console.log(event.currentTarget.dataset.item)
    }
  }
})
