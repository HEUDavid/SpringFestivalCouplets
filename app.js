/**
 * 新年春联小程序
 * author: David
 * github地址: https://github.com/HEUDavid/SpringFestivalCouplets
 * 
 * 注意：
 * 在globalData里的qrcodeMaskBoo是控制是否显示图片上的二维码和下方用户是否可以输入，
 * 狗日的腾讯审核实在太恶心，
 * 你需要能够自己在服务器上控制这个值，给腾讯审核的时候是true，正式发布之后改成false，具体实现自己解决吧。
 */
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    qrcodeMaskBoo: false//这里的true和false要由服务器控制，审核之前是true，正式上线之后改为false，可以自己改改看效果。
  }
})