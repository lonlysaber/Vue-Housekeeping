import { post, get} from '../utils/request'

export function create (data) {
  const url = '/evaluate/add'

  return post(url, data)
}

export function list (data) {
  const url = '/evaluate/queryCondition'
  return post(url, data)
}

export function query (evaluateId) {
  const url = `/evaluate/queryById/${evaluateId}`
  return get(url)
}

