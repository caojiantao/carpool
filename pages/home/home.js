import api from '../../utils/api'

// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lineList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        api.get({
            "url": "/line/list"
        }).then(data => {
            this.setData({
                lineList: data
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    toLineDetail(e) {
        let openid = e.currentTarget.dataset.openid;
        let type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: `/pages/line/line?openid=${openid}&type=${type}`,
        })
    }
})