import request from '@/utils/request'


export function queryCondition(data) {
  return request({
    url: '/order/queryCondition',
    method: 'post',
    data
  })
}
export function getAllOrder(data) {
  return request({
    url: '/order/getAllOrder',
    method: 'post',
    data
  })
}


export function updateOrder(data) {
  return request({
    url: '/order/updateOrder',
    method: 'post',
    data
  })
}

export function deleteOrder(data) {
  return request({
    url: `/order/deleteOrder/${data}`,
    method: 'post',
  })
}

