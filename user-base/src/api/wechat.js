import { get, post } from '../utils/request'
import { setToken } from '../utils/token'

export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail('userInfo不存在')
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function login (userInfo, onSuccess, onFail) {
  const url = '/user/login'
  return post(url,userInfo)
  
}
function userLogin(data){
  const url = '/user/login'
  return post(url,data)
}

function getToken (data) {
  const url = '/user/login'
  return post(url, data)
}

function getOpenid (code) {
  return get('/sns/jscode2session', {
    appid: 'wx0a65fb15fae061c2',
    secret: '8340a88507b7e24a7eec12550b51b7ea',
    js_code: code,
    grant_type: 'authorization_code'
  }, 'https://api.weixin.qq.com')
}
