// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commuteList: [
      {
        id: 20231212,
        driver: {
          avatar: "https://caojiantao.site/logo.jpg",
          nickname: "叫我宫城大人",
          phone: "13437104137"
        },
        car: {
          brand: "本田",
          color: "蓝色",
          no: "鄂A888888"
        },
        line: {
          from: "雪梨澳乡D区",
          to: "东升科技园",
          time: "05:00",
          pathways: ["西小口"]
        },
        seat: {
          idle: 2,
          price: 10
        },
        remark: "时间可商量，提前沟通座位。🤝🤝"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  toLineDetail(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/line/line',
    })
  }
})