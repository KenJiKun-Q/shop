// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    searchValue:"",
    keyValue: wx.getStorageSync('search') || []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    this.setData({
      keyValue: wx.getStorageSync('search') || []
    })
  },

  //搜索内容
  hanldeInput(event){
    let {value} = event.detail
    
    let isShow;

    isShow = value.trim()?true:false;
    
    this.setData({
      isShow,
      searchValue: value
    })
  },

  //取消搜索
  hanldeCancel(){
    
    this.setData({
      searchValue: "",
      isShow:false
    })
  },

  //保存历史记录,并跳转搜索内容
  hanldeValue(event){

    let {value} = event.detail

    let arr = wx.getStorageSync('search') || [];

    arr.unshift(this.data.searchValue)

    wx.setStorageSync('search', arr)

    wx.navigateTo({
      url: "/pages/list/index?query=" + this.data.searchValue
    })
  },

  //清除历史记录
  clearHistory(){
    wx.removeStorageSync('search'),
    
    this.setData({
      keyValue:[]
    })
  }
})