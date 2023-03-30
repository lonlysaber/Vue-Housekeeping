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

export function userLogin (userInfo) {
  const url = '/user/login'
  return post(url,userInfo)
  
}
export function keeperLogin (userInfo) {
  const url = '/keeper/login'
  return post(url,userInfo)
  
}
export function getUserOrder (userId) {
  const url = `/user/getOrder/${userId}`
  return get(url)
}
export function getKeeperOrder (keeperId) {
  const url = `/keeper/getOrder/${keeperId}`
  return get(url)
}
export function queryKeeperById (keeperId) {
  const url = `/keeper/queryById/${keeperId}`
  return get(url)
}
