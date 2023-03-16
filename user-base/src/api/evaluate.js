import { post } from '../utils/request'

export function create (id, openid, score, evaluate) {
  const url = '/evaluate/create'
  const data = {
    id,
    openid,
    score,
    evaluate
  }
  return post(url, data)
}

export function list (commodityID) {
  const url = '/evaluate/queryList'
  const data = {
    commodityID
  }
  return post(url, data)
}
