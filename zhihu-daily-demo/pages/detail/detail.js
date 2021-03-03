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
      title: '为什么星系中心几乎都有一个黑洞？',
      author: '某某1',
      content: '翻出来一个好久之前的挺有意思的问题。虽然已经有一个很好的回答了，但和这个问题相关的新进展还挺多的，而且细想之下，这个问题可以分出不少层次来，非常适合天体物理科研思路的基本训练：'
    }
  },

  onShow() {
    this.initData()
  },

  /**
   * 组件的方法列表
   */
  initData() {
    // 详情路由参数
    console.log(this.options)
  },
  return() {
    wx.navigateBack()
  }
})