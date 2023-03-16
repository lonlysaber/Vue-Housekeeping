import { get } from '../utils/request'

export function list () {
  const url = '/promotion/list'
  return get(url)
}
