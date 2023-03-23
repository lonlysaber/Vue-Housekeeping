import { post,get } from '../utils/request'

export function updateAddress (userId, userAddress) {
  const url = '/user/updateUser'
  const data = {
    userId,
    userAddress
  }
  return post(url, data)
}

export function updateProfile (userId, userName, contact) {
  const url = '/user/updateUser'
  const data = {
    userId,
    userName,
    contact
  }
  return post(url, data)
}

export function query (openid) {
  const url = `/user/queryById/${openid}`
  return get(url)
}
