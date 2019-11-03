// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    goods:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    //每次打开页面的时候都在本地获取购物车的数据
    let goods = wx.getStorageSync("goods") || null;

    this.setData({
      goods
    })
  },

  hanldeAddress(){
    wx.chooseAddress({
      success:(res) => {
        //设置收货地址
        this.setData({
          address:{
            userName:res.userName,
            telNumber:res.telNumber,
            detail:res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  }
})