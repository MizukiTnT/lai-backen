import Mock from 'mockjs'
let token = Mock.mock({
  token: '121231231321'
})

let userInfo = Mock.mock({
  name: '@cname',
  avatar: Mock.Random.image('40x40', '#50B347', '#FFF', Mock.Random.word(5))
})


export default {
  login: config => {
    return token
  },
  userInfo: config => {
    let req_token = JSON.parse(config.body)
    if (req_token.token === token.token) {
      return userInfo
    } else {
      return {
        error: '登录超时 请重新登录'
      }
    }
  },
  logout: () => {
    return {msg: '注销成功'}
  }
}
