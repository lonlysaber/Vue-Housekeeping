import { post, get} from '../utils/request'

export function createAppointment (data) {
  const url = '/appointment/add'

  return post(url, data)
}

export function list (data) {
  const url = '/appointment/queryCondition'
  return post(url, data)
}

export function query (evaluateId) {
  const url = `/appointment/queryById/${evaluateId}`
  return get(url)
}

