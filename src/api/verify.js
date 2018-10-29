import request from '@/utils/request'

export function GetVerifyList (data) {
  return request({
    url: '/verify/getList',
    method: 'post',
    data: data
  })
}

export function SortList (data) {
  return request({
    url: '/verify/sort',
    method: 'post',
    data: data
  })
}