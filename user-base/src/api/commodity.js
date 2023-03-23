import { post } from '../utils/request'

export function classList () {
  const url = '/service/getAllService'
  return post(url)
}

export function search (data) {
  const url = '/service/queryCondition'
  return post(url, data)
}

export function queryCommodity (id) {
  const url = `/service/queryById/${id}`
  return post(url)
}
export function sortCommodity (className) {
  const url = '/commodity/sort'
  return post(url, {className})
}
