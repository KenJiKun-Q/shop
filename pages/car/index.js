// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    goods:null,
    //总价格
    allPrice:0,
    allSelected:true
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
      goods,
    })

    this.handlePrice();

    this.handleAllSelected()
  },


  //渲染数据
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
  },


  // 增加数量1
  handleAdd(event){
    let { id } = event.currentTarget.dataset;

    let {goods} = this.data;
    // 数量增加1
    goods[id].number += 1;
    
    this.setData({
      goods
    });

    //保存到本地
    wx.setStorageSync("goods", goods)

    this.handlePrice()

    this.handleAllSelected()
  },


  // 数量减1
  handleReduce(event){
    let { id } = event.currentTarget.dataset;

    let { goods } = this.data;

    // 判断数量小于1的时候
    if(goods[id].number <= 1){
      wx.showModal({
        title: '提示',
        content: '请问确认删除商品?',
        success:(res) => {
          if (res.confirm) {
            //删除商品
            delete goods[id];
            // 由于showModal是异步执行，所以需要把修改data值的方式放到success中
            this.setData({
              goods
            })

            //保存到本地
            wx.setStorageSync("goods", goods);

            this.handlePrice();

            this.handleAllSelected()
          }
        }
      })
    }else{
      //数量减1
      goods[id].number -= 1;

      this.setData({
        goods
      })

       wx.setStorageSync("goods", goods);

      this.handlePrice()

      this.handleAllSelected()
    }
  },


  // 检测是否有小数点
  bindInput(event){
    //获取输入的值
    let value = +event.detail.value;
    let {id} = event.target.dataset;
    let {goods} = this.data;

    //判断是否有小数点,如果有就向下取整
    goods[id].number = Math.floor(value);
    
    // 修改data的值
    this.setData({
      goods
    });
  },

  // 输入的数量
  bindChange(event){
    //获取输入框的值
    // console.log(event)
    let value = +event.detail.value
    let { id } = event.target.dataset;
    let { goods } = this.data;

    //如果是空的或者是0
    if(value === 0){
      goods[id].number = 1;
    }else{
      goods[id].number = value
    }

    // 修改data的值
    this.setData({
      goods
    });


    wx.setStorageSync("goods", goods);

    this.handlePrice()

    this.handleAllSelected()

  },

  // 选中状态取反
  hanldeSelected(event){
    let {id} = event.target.dataset;
    let {goods} = this.data;

    //把选中的状态取反
    goods[id].selected = !goods[id].selected;

    this.setData({
      goods
    });

    // 保存到本地
    wx.setStorageSync("goods", goods);

    this.handlePrice()
    
    this.handleAllSelected()
  },



  // 小程序没有computed属性,所以需要封装计算总价格的函数
  handlePrice(){
    let {goods} = this.data;
    let price = 0;

   //开始计算,v就是key 也就是商品的id
   Object.keys(goods).map(v => {
     //当前商品必须是选中的
     if(goods[v].selected){
       //单价乘以数量
       price += (goods[v].goods_price * goods[v].number)
     }
   })

   this.setData({
     allPrice:price
   })
  },

  //全选功能
  handleAllSelected(){
    let { goods } = this.data;

    let isSelect = true;

    // 判断是否有一个没有选中
    Object.keys(goods).forEach(v => {
      if(!goods[v].selected){
        isSelect = false;
      }
    })

    this.setData({
      allSelected : isSelect
    })
  },



  handleAllSelectedEvent(){
    let {goods, allSelected} = this.data

    // 循环取反选中状态，取反是根据allSelected
    Object.keys(goods).forEach(v => {
      goods[v].selected = !allSelected
    })

    this.setData({
      goods,
      // 判断全选状态
      allSelected: !allSelected
    })

    // 保存到本地
    wx.setStorageSync("goods", goods);

    this.handlePrice()
  }
})


