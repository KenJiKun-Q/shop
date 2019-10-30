// pages/classify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0
  },

  hanldClick(event){
    let {index} = event.target.dataset
    
    this.setData({
      current: index
    })
  }
})