import lbs from '../../config/lbs'
import api from '../../utils/api'

// pages/line/line.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        api.get({
            url: `/line/detail?openid=${options.openid}&type=${options.type}`
        }).then(data => {
            this.setData({
                detail: data
            })
        })



    },
    callUp() {
        wx.makePhoneCall({
            phoneNumber: this.data.detail.driver.phone
        })
    },
    renderMap() {
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
        for (let p of this.data.detail.line.pathwayList) {
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
        for (let p of this.data.detail.line.pathwayList) {
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
                const mapCtx = wx.createMapContext('map');
                // 获取路径的边界框
                const path = pl;
                const boundingBox = _this.calculateBoundingBox(path);
                // 设置地图中心和缩放级别，确保整个路径可见
                mapCtx.includePoints({
                    padding: [50], // 可根据需要调整
                    points: boundingBox,
                });
            }
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