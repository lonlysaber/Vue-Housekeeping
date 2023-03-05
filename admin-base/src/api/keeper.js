import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/keeper/login',
    method: 'post',
    data
  })
}
export function queryCondition(data) {
  return request({
    url: '/keeper/queryCondition',
    method: 'post',
    data
  })
}
export function getAllKeeper(data) {
  return request({
    url: '/keeper/getAllKeeper',
    method: 'post',
    data
  })
}
export function getOrder(data) {
  return request({
    url: '/keeper/getOrder',
    method: 'post',
    data
  })
}
export function getAppointment(data) {
  return request({
    url: '/keeper/getAppointment',
    method: 'post',
    data
  })
}
export function updateKeeper(data) {
  return request({
    url: '/keeper/updateKeeper',
    method: 'post',
    data
  })
}

export function deleteKeeper(data) {
  return request({
    url: `/keeper/deleteKeeper/${data}`,
    method: 'post',
  })
}

export function getInfo(token) {
  return request({
    url: `/keeper/queryId/${token}`,
    method: 'get',
    
  })
}

export function logout() {
  return request({
    url: '/keeper/logout',
    method: 'post'
  })
}
