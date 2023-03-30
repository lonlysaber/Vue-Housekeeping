import { post, get, getWeb } from '../utils/request'

export function query (data) {
  const url = '/order/queryCondition'
  return post(url, data)
}
export function queryById (id) {
  const url = `/order/queryById/${id}`
  return get(url)
}

export function create (data) {
  const url = '/order/add'
  return post(url, data)
}

export function order (commodityID, openid) {
  const url = '/order/order'
  return post(url, { commodityID, openid })
}

export function update (data) {
  const url = '/order/updateOrder'
  return post(url, data)
}

export function getQRcode (text) {
  const url = `https://cli.im/api/qrcode/code?text=${text}`
  return getWeb(url)
}
