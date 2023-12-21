// pages/set-line/set-line.js
import lbs from '../../config/lbs';
import { weeks } from '../../config/opt';

const chooseLocationPlugin = requirePlugin('chooseLocation');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseType: null,
        homePosition: null,
        workPosition: null,
        pathwayPositionList: [],
        pathwayPositionText: "",
        homeTime: null,
        workTime: null,
        repeatValue: ['1', '2'],
        repeatText: null,
        price: 0,
        remark: "",

        chooseRepeat: false,
        repeatOpt: weeks,
        repeatOptMap: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let repeats = new Set(this.data.repeatValue);
        let repeatOptMap = new Map();
        let opts = [];
        for (let item of this.data.repeatOpt) {
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
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const location = chooseLocationPlugin.getLocation();
        if (!location) {
            return;
        }
        let type = this.data.chooseType;
        if (type == 'pathwayPosition') {
            let list = this.data.pathwayPositionList || [];
            list.push(location);
            this.setData({ pathwayPositionList: list });
            this.setPathwayPositionText();
        } else {
            let data = {};
            data[type] = location;
            this.setData(data);
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        chooseLocationPlugin.setLocation(null);
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
        let data = {};
        data[type] = time;
        this.setData(data);
    },
    openChooseRepeat() {
        this.setData({
            chooseRepeat: true
        })
    },
    repeatChange(e) {
        this.setData({
            repeatValue: e.detail.sort()
        })
        this.setRepeatText();
    },
    setRepeatText() {
        let text = this.data.repeatValue.map(item => this.data.repeatOptMap.get(item).name).join();
        this.setData({
            repeatText: text
        })
    },
    setPathwayPositionText() {
        let text = this.data.pathwayPositionList.map(item => item.name).join();
        this.setData({ pathwayPositionText: text })
    },
    closeChooseRepeat() {
        this.setData({
            chooseRepeat: false
        })
    },
    clearTime(e) {
        let type = e.currentTarget.dataset.type;
        let data = {};
        data[type] = null;
        this.setData(data);
    },
    clearPathwayPosition() {
        this.setData({ pathwayPositionList: [] });
        this.setPathwayPositionText();
    },
    onResetData(e) {
        let type = e.currentTarget.dataset.type;
        let data = {};
        data[type] = null;
        this.setData(data);
    }
})