import { post } from '../utils/request'

export function query (id) {
  const url = '/order/query'
  return post(url, {id})
}

export function create (data) {
  const url = '/order/create'
  return post(url, data)
}

export function order (commodityID, openid) {
  const url = '/order/order'
  return post(url, { commodityID, openid })
}

export function update (id, status) {
  const url = '/order/update'
  const data = {
    id,
    status
  }
  return post(url, data)
}
