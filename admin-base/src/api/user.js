import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function queryCondition(data) {
  return request({
    url: '/user/queryCondition',
    method: 'post',
    data
  })
}
export function getAllUser(data) {
  return request({
    url: '/user/getAllUser',
    method: 'post',
    data
  })
}
export function getOrder(data) {
  return request({
    url: `/user/getOrder/${data}`,
    method: 'get',
  })
}
export function getAppointment(data) {
  return request({
    url: '/user/getAppointment',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: `/user/deleteUser/${data}`,
    method: 'post',
  })
}

export function getInfo(token) {
  return request({
    url: `/user/queryId/${token}`,
    method: 'get',
    
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
