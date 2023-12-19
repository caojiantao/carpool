import lbs from '../../config/lbs'

// pages/line/line.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {
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
                from: {
                    address: "北京市海淀区西三旗花园二里",
                    city: "北京市",
                    district: "海淀区",
                    latitude: 40.048438,
                    longitude: 116.336645,
                    name: "雪梨澳乡(D区)",
                    province: "北京市",
                },
                to: {
                    address: "北京市海淀区后屯东路与后屯中街交叉口正北方向30米",
                    city: "北京市",
                    district: "海淀区",
                    latitude: 40.046728,
                    longitude: 116.355259,
                    name: "中关村东升科技园北领地-西北门",
                    province: "北京市",
                },
                time: "05:00",
                pathways: [{
                    address: "北京市海淀区",
                    city: "北京市",
                    district: "海淀区",
                    latitude: 40.047291,
                    longitude: 116.351019,
                    name: "西小口[地铁站]-A西北口",
                    province: "北京市",
                }]
            },
            seat: {
                idle: 2,
                price: 10
            },
            remark: "时间可商量，提前沟通座位。🤝🤝"
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let markers = [];
        let id = 1;
        markers.push({
            id: id++,
            latitude: this.data.detail.line.from.latitude,
            longitude: this.data.detail.line.from.longitude,
            callout: {
                // 点击marker展示title
                content: this.data.detail.line.from.name
            }
        });
        markers.push({
            id: id++,
            latitude: this.data.detail.line.to.latitude,
            longitude: this.data.detail.line.to.longitude,
        });
        for (let p of this.data.detail.line.pathways) {
            markers.push({
                id: id++,
                latitude: p.latitude,
                longitude: p.longitude,
            });
        }
        this.setData({
            markers: markers
        })


        var _this = this;
        //通过wx.request发起HTTPS接口请求
        let lat1 = this.data.detail.line.from.latitude;
        let lon1 = this.data.detail.line.from.longitude;
        let lat2 = this.data.detail.line.to.latitude;
        let lon2 = this.data.detail.line.to.longitude;
        let waypoints = [];
        for (let p of this.data.detail.line.pathways) {
            waypoints.push(`${p.latitude},${p.longitude}`);
        }
        waypoints = waypoints.join(";");
        wx.request({
            //地图WebserviceAPI驾车路线规划接口 请求路径及参数（具体使用方法请参考开发文档）
            url: `https://apis.map.qq.com/ws/direction/v1/driving/?key=${lbs.key}&from=${lat1},${lon1}&to=${lat2},${lon2}&waypoints=${waypoints}`,
            success(res) {
                var result = res.data.result
                var route = result.routes[0]

                var coors = route.polyline, pl = [];
                //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                var kr = 1000000;
                for (var i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                }
                //将解压后的坐标放入点串数组pl中
                for (var i = 0; i < coors.length; i += 2) {
                    pl.push({ latitude: coors[i], longitude: coors[i + 1] })
                }
                _this.setData({
                    // 绘制路线
                    polyline: [{
                        points: pl,
                        color: '#58c16c',
                        width: 6,
                        borderColor: '#2f693c',
                        borderWidth: 1
                    }]
                })
                 // 获取地图实例
                const mapCtx = wx.createMapContext('map');
                // 获取路径的边界框
                const path = pl;
                const boundingBox = _this.calculateBoundingBox(path);
                // 设置地图中心和缩放级别，确保整个路径可见
                mapCtx.includePoints({
                    padding: [50], // 可根据需要调整
                    points: boundingBox,
                });
            }
        })
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
    callUp() {
        wx.makePhoneCall({
            phoneNumber: this.data.detail.driver.phone
        })
    },
    // 计算路径的边界框
    calculateBoundingBox: function (path) {
        let maxLatitude = -90;
        let minLatitude = 90;
        let maxLongitude = -180;
        let minLongitude = 180;
        for (const point of path) {
            maxLatitude = Math.max(maxLatitude, point.latitude);
            minLatitude = Math.min(minLatitude, point.latitude);
            maxLongitude = Math.max(maxLongitude, point.longitude);
            minLongitude = Math.min(minLongitude, point.longitude);
        }
        return [
            { latitude: maxLatitude, longitude: maxLongitude },
            { latitude: minLatitude, longitude: minLongitude },
        ];
    },
})