import request from '@/utils/request'

export function getHotTags() {
  return request({
    url: '/release/hotTag',
    method: 'get'
  })
}

export function getAllTags() {
  return request({
    url: '/release/allTag',
    method: 'get'
  })
}