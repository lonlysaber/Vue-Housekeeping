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

export function login (userInfo) {
  const url = '/user/login'
  return post(url,userInfo)
  
}
export function getOrder (userId) {
  const url = `/user/getOrder/${userId}`
  return get(url)
  
}
