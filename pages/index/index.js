/**
 * 新年春联小程序
 * author: David
 * github地址: https://github.com/HEUDavid/SpringFestivalCouplets
 * 
 * 当时的一些思路：
 * 对联可以随机几幅
 * 背景也可以随机
 * 最终分享图片：对联内容+小程序二维码+用户头像或者用户名：谁谁谁给您拜年啦~
 * 文化人少，那么就应该有一篇文章专门写了各种对联给用户做参考
 * 可以有选择框，挑选主题，在新年祝福卡片小程序实现了
 */

const app = getApp()

Page({
  data: {
    qrcodeMask: '/images/fu.jpg',
    userInfo: {},
    path: "/images/moban.jpg",//模板背景图片路径
    imagePath: "",//生成图片路径
    i: 0,//对联数组元素索引
    DuiLian: [
      ['喜迎新春', '喜滋滋迎新年', '笑盈盈辞旧岁'],
      ['狗年大吉', '鸡报三多留竹叶', '犬至五福踏梅花'],//第一幅
      ['大有作为', '小犬有知嫌路窄', '大鹏展翅恨天地'],//第二幅
      ['安居乐业', '丰年富足人欢笑', '盛世平安犬不惊'],
      ['家业兴旺', '龙翔华夏迎新岁', '气搏云天奋犬年'],
      ['万事如意', '鸡岁呈祥', '犬年纳福'],
      ['喜迎新春', '金鸡报晓去', '神犬引春来'],
      ['辞旧迎新', '旧岁又添几个喜', '新年更上一层楼'],
      ['欢度春节', '和顺门第增百福', '合家欢乐纳千祥'],
      ['太平盛世', '月异日新鸡报晓', '年祥岁吉犬开门'],
      ['莺歌燕舞', '黄莺鸣翠柳', '紫燕剪春风']
    ],
    HengPi: "天随人愿",
    ShangLian: "瑶池西望千家雨",
    XiaLian: "紫气东来万里风",
    HengPiSize: 44,
    DuiLianSize: 52,
    DuiLianHeight: 60,//每个字的高度
    maskHidden: "none",
    fuckTencent: "none"
  },

  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success: res => {
            var addr = res.tempFilePath;  //获取头像路径
            this.setData({
              userslogo: res.tempFilePath
            });
          }
        });
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    });
  },

  onReady: function () {
    // 页面渲染完成
    this.createNewImg();//创建初始化图片
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
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

  //跳转到另一个小程序：具体文章页面
  gotoMiniProgram: function () {
    wx.navigateToMiniProgram({
      appId: 'wx700ae9dcc0d24c66',
      path: 'pages/detail/detail?id=315',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },

  //换一幅对联
  selectDuiLian: function (e) {
    //实质对联数组索引增1
    var j = this.data.i;
    j++;
    if (j >= this.data.DuiLian.length) {
      j = 0;
    }
    this.setData({
      i: j
    });
  },

  //将用户信息绘制到canvas
  setUserInfo: function (context) {
    var that = this;
    var username = that.data.userInfo.nickName ? "© " + that.data.userInfo.nickName : "© 新年春联";
    console.log(username);

    context.setFontSize(23);
    context.setTextAlign('center');
    context.setFillStyle("#ffffff");
    context.fillText(username, 343, 665);
    context.stroke();
  },

  //将横批绘制到canvas
  setHengPi: function (context) {
    var HengPi = this.data.HengPi;

    context.setFontSize(this.data.HengPiSize);
    context.setFillStyle("#000000");
    context.setTextAlign('center');
    context.fillText(HengPi, 343, 103);
    context.stroke();
  },

  //将上联绘制到canvas
  setShangLian: function (context) {
    var ShangLian = this.data.ShangLian;

    context.setFontSize(this.data.DuiLianSize);
    context.setFillStyle("#000000");
    context.save();

    for (var i = 0; i <= ShangLian.length; i++) {
      context.fillText(ShangLian.substring(i, i + 1), 588, 186 + i * this.data.DuiLianHeight);
    }

    context.restore();
    context.stroke();
  },

  //将下联绘制到canvas
  setXiaLian: function (context) {
    var XiaLian = this.data.XiaLian;

    context.setFontSize(this.data.DuiLianSize);
    context.setFillStyle("#000000");
    context.save();

    for (var i = 0; i <= XiaLian.length; i++) {
      context.fillText(XiaLian.substring(i, i + 1), 98, 186 + i * this.data.DuiLianHeight);
    }

    context.restore();
    context.stroke();
  },


  //将canvas转换为图片保存到本地，然后将路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');

    context.drawImage(that.data.path, 0, 0, 686, 686);//画背景

    if (app.globalData.qrcodeMaskBoo) {
      context.drawImage(this.data.qrcodeMask, 211, 212, 264, 264);//遮住二维码
      this.setData({
        fuckTencent: "block"
      })
    }

    this.setUserInfo(context);
    this.setHengPi(context);
    this.setShangLian(context);
    this.setXiaLian(context);
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          // console.log("临时图片：" + tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            // maskHidden: "none"
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },

  //点击图片进行预览，长按保存分享图片
  //这里有个bug，二次预览的时候黑屏，狗日的腾讯几个月都没解决，具体可以区开发者社区搜一下
  previewImg: function (e) {
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

  formSubmit: function (e) {
    var that = this;

    var HengPi = e.detail.value.HengPi;
    var ShangLian = e.detail.value.ShangLian;
    var XiaLian = e.detail.value.XiaLian;

    //判断横批是否填写
    if (HengPi.length <= 0) {
      HengPi = this.data.HengPi;
    }
    //用户未填写对联
    if (ShangLian.length <= 0) {
      ShangLian = this.data.ShangLian;
    }
    if (XiaLian.length <= 0) {
      XiaLian = this.data.XiaLian;
    }

    switch (HengPi.length) {
      //根据横批的字数(1~5)设置字号
      case 1:
        this.setData({
          HengPiSize: 58
        })
        break;
      case 2:
        this.setData({
          HengPiSize: 54
        })
        break;
      case 3:
        this.setData({
          HengPiSize: 50
        })
        break;
      case 4:
        this.setData({
          HengPiSize: 44
        })
        break;
      case 5:
        this.setData({
          HengPiSize: 40
        })
        break;
      default:
        this.setData({
          HengPiSize: 44
        })
    }

    //根据对联字数调整对联字号
    switch (ShangLian.length) {
      //根据对联的字数(3~7)设置字号
      case 3:
        this.setData({
          DuiLianSize: 64,
          DuiLianHeight: 180
        })
        break;
      case 4:
        this.setData({
          DuiLianSize: 64,
          DuiLianHeight: 121
        })
        break;
      case 5:
        this.setData({
          DuiLianSize: 62,
          DuiLianHeight: 92
        })
        break;
      case 6:
        this.setData({
          DuiLianSize: 55,
          DuiLianHeight: 72
        })
        break;
      case 7:
        this.setData({
          DuiLianSize: 52,
          DuiLianHeight: 61
        })
        break;
      default:
        this.setData({
          DuiLianSize: 52
        })
    }

    //判断上下联的字数是否一样
    if (ShangLian.length != XiaLian.length) {
      wx.showModal({
        title: '提示',
        content: '上下联字数不一致',
        showCancel: false,
      });
    }
    else {
      this.setData({
        HengPi: HengPi,
        ShangLian: ShangLian,
        XiaLian: XiaLian,
        maskHidden: "block"
      });

      wx.showToast({
        title: '生成中',
        icon: 'loading',
        duration: 800
      });

      that.createNewImg();

      setTimeout(function () {
        wx.hideToast();
        that.setData({
          maskHidden: "none"
        });
      }, 1200)
    }

  }

})