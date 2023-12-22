import auth from './auth'

const apiUrlPrefix = "http://127.0.0.1:8080/carpool"

const request = (param) => {
  return new Promise((reslove) => {
    let authHeader = { "header": auth.getAuthHeader() };
    Object.assign(param, authHeader);
    param.success = (res) => {
      console.log(res);
      let result = res.data;
      if (result.code != 0) {
        wx.showToast({
          title: result.msg,
          icon: 'error',
        })
      } else {
        reslove(result.data);
      }
    }
    param.url = apiUrlPrefix + param.url;
    console.log(param)
    wx.request(param);
  })
}

const get = (param) => {
  param.method = 'GET';
  return request(param);
}

const post = (param) => {
  param.method = 'POST';
  return request(param);
}

const uploadImage = (filePath) => {
  return new Promise((reslove) => {
    wx.uploadFile({
      url: `${apiUrlPrefix}/uploadImage`,
      filePath: filePath,
      name: 'file',
      header: auth.getAuthHeader(),
      success: res => {
        console.log('上传图片成功', res);
        const data = JSON.parse(res.data).data;
        reslove(data);
      }
    })
  })
}

export default {
  get,
  post,
  uploadImage,
}