// pages/vehicle-registry/vehicle-registry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registry: {
      realname: "曹建涛",
      idNumber: "420117199408064713",
      phone: "13437104137",
      driverLicense: "https://caojiantao.site/logo.jpg",
      licenseNumber: "鄂A888888",
      vehiclePermit: "https://caojiantao.site/logo.jpg",
    }
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
  uploadSuccess(e) {
    console.log(e.detail);
  }
})