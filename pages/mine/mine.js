import auth from '../../utils/auth'

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    let user = auth.getUserFromStorage();
    this.setData({
      user: user
    })
  }
})