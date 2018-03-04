/**
 * 新年春联小程序
 * author: David
 * github地址: https://github.com/HEUDavid/SpringFestivalCouplets
 */
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.userInfo.nickName ? this.data.userInfo.nickName + "给您拜年了，并送您一副春联！" : "给您拜年了，并送您一副春联！",//考虑到用户拒绝授权的情况
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //跳转到index
  gotoIndex: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })

  },

  //跳转到大卫哥：反馈建议
  gotoMiniProgram: function () {
    wx.navigateToMiniProgram({
      appId: 'wx700ae9dcc0d24c66',
      path: 'pages/detail/detail?id=321',
      // extraData: {
      //   foo: 'bar'
      // },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  //test
  test: function () {
    wx.navigateToMiniProgram({
      appId: 'wxf97a401eea1205c0',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })

  }
})