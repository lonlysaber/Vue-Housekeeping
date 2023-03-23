import { post } from '../utils/request'

export function query (data) {
  const url = '/order/queryCondition'
  return post(url, data)
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
