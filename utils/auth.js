import api from './api'

const getAuthHeader = () => {
    return {
        openid: wx.getStorageSync('openid'),
        token: wx.getStorageSync('token'),
    }
}
const getLoginCode = () => {
    return new Promise((reslove) => {
        wx.login({
            success(res) {
                reslove(res.code);
            }
        })
    })
}

/**
 * 静默登录，同步方式
 */
const silentLogin = () => {
    let { openid } = getAuthHeader();
    if (openid) {
        getUserByOpenid()
            .then(data => {
                wx.setStorageSync('user', JSON.stringify(data));
            });
        return;
    }
    getLoginCode()
        .then(code => {
            return api.post({ url: `/user/login?code=${code}` });
        })
        .then(data => {
            console.log("登录结果", data);
            if (!data) {
                return;
            }
            wx.setStorageSync('openid', data.openid);
            wx.setStorageSync('token', data.token);
            return getUserByOpenid();
        })
        .then(data => {
            wx.setStorageSync('user', JSON.stringify(data));
        })
}

const getUserByOpenid = () => {
    let openid = wx.getStorageSync('openid');
    return api.get({ url: `/getUserByOpenid?openid=${openid}` })
}

const getUserFromStorage = () => {
    let userJson = wx.getStorageSync('user');
    if (!userJson) {
        return null;
    }
    return JSON.parse(userJson);
}

const register = (request) => {
    getLoginCode()
        .then(code => {
            request.code = code;
            return api.post({
                url: `/register`,
                data: request
            })
        })
        .then((data) => {
            console.log("注册成功", data);
            wx.setStorageSync('openid', data.openid);
            wx.setStorageSync('token', data.token);
            return getUserByOpenid();
        })
        .then(data => {
            wx.setStorageSync('user', JSON.stringify(data));
        })
}

export default {
    getAuthHeader,
    register,
    silentLogin,
    getUserFromStorage,
    getUserByOpenid,
}