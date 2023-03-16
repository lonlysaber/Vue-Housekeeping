import { get, post } from '../utils/request'

export function index () {
  const url = '/wechat/index'
  return get(url)
}

export function search () {
  const url = '/wechat/index'
  return post(url, {})
}
