import { post, get} from '../utils/request'

export function hotRec (data) {
  const url = '/recommend/hotRec'

  return post(url, data)
}

export function userRec (data) {
    const url = '/recommend/banner'
  
    return post(url, data)
  }

