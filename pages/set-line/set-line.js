// pages/set-line/set-line.js
import lbs from '../../config/lbs';

const chooseLocationPlugin = requirePlugin('chooseLocation');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseType: null,
    homePostion: null,
    workPostion: null,
    homeTime: null,
    workTime: null,
    repeatValue: ['1', '2'],
    repeatText: null,

    chooseRepeat: false,
    repeatOpt: [
      { name: '每周一', value: '1', chose: false},
      { name: '每周二', value: '2', chose: false},
      { name: '每周三', value: '3', chose: false},
      { name: '每周四', value: '4', chose: false},
      { name: '每周五', value: '5', chose: false},
      { name: '每周六', value: '6', chose: false},
      { name: '每周日', value: '7', chose: false},
    ],
    repeatOptMap: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let repeats = new Set(this.data.repeatValue);
    let repeatOptMap = new Map();
    let opts = [];
    for(let item of this.data.repeatOpt) {
      repeatOptMap.set(item.value, item);
      if (repeats.has(item.value)) {
        item.chose = true;
      }
      opts.push(item);
    }
    this.setData({
      repeatOpt: opts,
      repeatOptMap: repeatOptMap
    })
    this.setRepeatText();
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
    const location = chooseLocationPlugin.getLocation();
    if (!location) {
      return;
    }
    let type = this.data.chooseType;
    console.log(type, location)
    if (type == 'home') {
      this.setData({
        homePostion: location
      });
    } else if (type == 'work') {
      this.setData({
        workPostion: location
      });
    }
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
    chooseLocationPlugin.setLocation(null);
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

  chooseLocation(e) {
    this.setData({
      chooseType: e.currentTarget.dataset.type
    });
    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${lbs.key}&referer=${lbs.refer}`
    });
  },

  chooseTime(e) {
    let type = e.currentTarget.dataset.type;
    let time = e.detail.value;
    if (type == "home") {
      this.setData({
        homeTime: time
      });
    } else if (type == "work") {
      this.setData({
        workTime: time
      });
    }
  },
  openChooseRepeat() {
    this.setData({
      chooseRepeat: true
    })
  },
  repeatChange(e) {
    this.setData({
      repeatValue: e.detail.value
    })
    this.setRepeatText();
  },
  setRepeatText() {
    let text = "";
    for (let opt of this.data.repeatValue) {
      text += this.data.repeatOptMap.get(opt).name;
      text += "、"
    }
    this.setData({
      repeatText: text
    })
  }
})