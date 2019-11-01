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

  
})