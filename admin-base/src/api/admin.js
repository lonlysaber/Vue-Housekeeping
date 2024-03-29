import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data
  })
}


export function getInfo(token) {
  return request({
    url: `/admin/queryById/${token}`,
    method: 'get',
    
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

