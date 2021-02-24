const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 阿拉伯数字转中文
function translateNumber(num) {
  var numStr = Math.round(num).toString().split('')
  if (numStr.length > 12) {
    throw '数字超过最大范围：千亿'
  }
  var digitChar = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  var posChar = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
  var zeroChar = '零'
  var lastChar
  var result = numStr.map((char, index) => {
    var pos = numStr.length - 1 - index
    var res = digitChar[char]
    if (char === '0') {
      if (lastChar && lastChar !== zeroChar) { // 避免重复的零
        if (pos === 4 || pos === 8) { // 处理万和亿
          res += posChar[pos]
        } else {
          res += zeroChar
        }
      }
    } else {
      res += posChar[pos]
    }
    lastChar = digitChar[char]
    return res
  })
  result = result.filter(i => i) // 去除空白数组项
  if (result.lastIndexOf(zeroChar) === result.length - 1) { // 删除最后的零
    result.pop()
  }
  return result.join('')
}

module.exports = {
  formatTime,
  translateNumber
}
