import { post } from '../utils/request'

export function updateAddress (openid, address) {
  const url = '/wechat/update'
  const data = {
    openid,
    address
  }
  return post(url, data)
}

export function updateProfile (openid, name, contact) {
  const url = '/wechat/update'
  const data = {
    openid,
    name,
    contact
  }
  return post(url, data)
}

export function query (openid) {
  const url = '/wechat/query'
  const data = {
    openid
  }
  return post(url, data)
}
