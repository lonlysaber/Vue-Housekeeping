import { get, post } from '../utils/request'

export function classList () {
  const url = '/class/list'
  return get(url)
}

export function search (key) {
  const url = '/commodity/search'
  return post(url, { key })
}

export function queryCommodity (id) {
  const url = '/commodity/query'
  return post(url, {id})
}
export function sortCommodity (className) {
  const url = '/commodity/sort'
  return post(url, {className})
}
