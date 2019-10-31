import request from "../../utils/request.js"

// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:"",
    list:[],
    pagenum: 1,
    hasMore:true,
    loading:false
  },


  getList(){
    if(this.data.loading === true){
      return
    }
    this.setData({
      loading: true
    })

    request({
      url: "/api/public/v1/goods/search",
      data: {
        query: this.data.query,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      let { goods } = res.data.message;

      if(goods.length < 10){
        this.setData({
          hasMore:false
        })
      }

      //通过遍历将价格保留后两位数
      let newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v;
      })

      // 合并数组
      this.setData({
        list: [...this.data.list, ...newGoods],

        pagenum : this.data.pagenum +1,

        loading:false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let { query } = options

    this.setData({
      query
    })
    this.getList()
  },

  //触发到底数据
  onReachBottom(){
    //有更多数据的时候才请求下一页数据
    if(this.data.hasMore){
        this.getList()
    }
  }
})