import { post, get} from '../utils/request'

export function create (data) {
  const url = '/evaluate/add'

  return post(url, data)
}

export function list (userId) {
  const url = '/evaluate/queryCondition'
  const data = {
    userId
  }
  return post(url, data)
}

export function query (orderId) {
  const url = `/evaluate/queryById/${orderId}`
  
  return get(url)
}