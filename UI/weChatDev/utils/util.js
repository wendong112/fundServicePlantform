const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//邮箱以及手机的正则表达式
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}

module.exports = {
  formatTime: formatTime,
  regexConfig: regexConfig,
  getUserOpenid: getUserOpenid
}

/**
 * 获取用户openid
 */
function getUserOpenid() {
  var userOpenid
  return new Promise(function (resolve, reject) {
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: "https://www.fundserviceplatform.cn/fundService/api/my/toLogin",
            method: "GET",
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              code: res.code
            },
            success: function (result) {
              getApp().globalData.userOpenid = result.data.openid
              resolve()
            },
            fail: function () {
              console.log("获取openid失败")
            }
          })
        } else {
          console.log('获取openid失败' + res.errMsg)
        }
      }
    })
  })
}
