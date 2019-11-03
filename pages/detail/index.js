import request from "../../utils/request.js"
// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    goods_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goods_id } = options

    request({
      url:"/api/public/v1/goods/detail",
      data:{
        goods_id
      }
    }).then(res => {
      let {message} = res.data
      // console.log(message)

      message.goods_price = Number(message.goods_price).toFixed(2)

      this.setData({
        detail: message
      })
    })
  },

  hanldeAddCart(){
    let goods = wx.getStorageSync("goods") || {}
    // 将detail解析数据
    let{
      goods_id, 
      goods_price, 
      goods_name, 
      goods_small_logo
      } = this.data.detail

    // number 和 selected是自定义的数据
    goods[goods_id] = {
      goods_id,
      goods_price,
      goods_name,
      goods_small_logo,

      number:1,
      selected:true
    }

    // 保存数据到本地
    wx.setStorageSync("goods",goods)
  }  
})

