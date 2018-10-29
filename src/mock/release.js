import Mock from 'mockjs'
let count = 4
let tag = []
for(let i = 0; i < count; i++) {
  tag.push(Mock.mock('@cword'))
}
let allCount = Math.ceil((Math.random() * 50))
let allTags = []
for(let i = 0; i < allCount; i++) {
  allTags.push(Mock.mock('@cword'))
}
export default {
  getHotTags: () => {
    return tag
  },
  getAllTags: () => {
    return allTags
  }
}