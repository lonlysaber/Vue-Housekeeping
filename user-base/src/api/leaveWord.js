import { post, get} from '../utils/request'

export function createWord (data) {
  const url = '/leaveWord/add'
  return post(url, data)
}

export function listWord (data) {
  const url = '/leaveWord/queryCondition'
  return post(url, data)
}

export function queryWord (evaluateId) {
  const url = `/leaveWord/queryById/${evaluateId}`
  return get(url)
}
export function deleteWord (evaluateId) {
    const url = `/leaveWord/deleteOrder/${evaluateId}`
    return post(url)
  }

