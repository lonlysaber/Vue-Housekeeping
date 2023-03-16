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
  mpvue.login({
    success (res) {
      getOpenid(res.code).then(loginInfo => {
        const { openid } = loginInfo
        mpvue.setStorage({
          key: 'openid',
          data: openid
        })
        getToken({openid, ...userInfo}).then(result => {
          const { token } = result.data
          setToken(token)
          onSuccess()
        }).catch(err => {
          console.log('登录失败,' + err)
          onFail()
        })
      }).catch(err => {
        console.log('获取openid失败,' + err)
        onFail()
      })
    },
    fail (res) {
      console.log(res)
    }
  })
}

function getToken (data) {
  const url = '/wechat/login'
  return post(url, data)
}

function getOpenid (code) {
  return get('/sns/jscode2session', {
    appid: 'wx7e94cb8f7da2882a',
    secret: '1f12c8125ce7e50d05f39df318ae8fee',
    js_code: code,
    grant_type: 'authorization_code'
  }, 'https://api.weixin.qq.com')
}
