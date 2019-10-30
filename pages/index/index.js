import request from "../../utils/request.js"

Page({

  data: {
    lunbo: [],
    navlist: [],
    floor: [],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicator: true
  },


  onLoad() {
    // 轮播图
    request({
      url: "/api/public/v1/home/swiperdata"
    }).then(res => {
      let {
        message
      } = res.data;

      this.setData({
        lunbo: message
      })
    })
    // 导航栏
    request({
      url: "/api/public/v1/home/catitems"
    }).then(res => {
      let {
        message
      } = res.data;

      this.setData({
        navlist: message
      })
    })

    // 楼层数据
    request({
      url:"/api/public/v1/home/floordata"
    }).then(res => {
      let {message} = res.data
      console.log(message)
      this.setData({
        floor: message
      })
    })
  }
})