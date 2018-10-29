import request from '@/utils/request'

export function GetReportList (data) {
  return request({
    url: '/report/getList',
    method: 'post',
    data: data
  })
}

export function SortList (data) {
  return request({
    url: '/report/sort',
    method: 'post',
    data: data
  })
}