import request from '@/utils/request'


export function queryCondition(data) {
  return request({
    url: '/leaveWord/queryCondition',
    method: 'post',
    data
  })
}
export function getAllLeaveWord(data) {
  return request({
    url: '/leaveWord/getAllLeaveWord',
    method: 'post',
    data
  })
}


export function updateLeaveWord(data) {
  return request({
    url: '/leaveWord/updateLeaveWord',
    method: 'post',
    data
  })
}

export function deleteLeaveWord(data) {
  return request({
    url: `/leaveWord/deleteLeaveWord/${data}`,
    method: 'post',
  })
}

