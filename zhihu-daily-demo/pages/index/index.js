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
        src: 'https://pic3.zhimg.com/v2-9d2c56565ccc2ea219fcc14379ba97ff.jpg?source=8673f162',
        author: '某某1'
      },
      {
        id: 2,
        title: 'demo-text-2',
        src: 'https://pic1.zhimg.com/v2-08a554be129bbb95a51250e3f63a68a0.jpg?source=8673f162',
        author: '某某2'
      },
      {
        id: 3,
        title: 'demo-text-3',
        src: 'https://pic2.zhimg.com/v2-e8cce10b0d2984ccd8138b6bbe116fe7.jpg?source=8673f162',
        author: '某某3'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 800
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
