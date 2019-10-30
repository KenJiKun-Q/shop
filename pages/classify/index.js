import request from "../../utils/request.js"

// pages/classify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    list:[]
  },

  hanldClick(event){
    let {index} = event.target.dataset
    
    this.setData({
      current: index
    })
  },

  onLoad:function(options){
    request({
      url:"/api/public/v1/categories"
    }).then(res => {
      let {message} = res.data
      console.log(message)
      this.setData({
        list:message
      })
    })
  }
})