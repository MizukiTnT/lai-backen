import Mock from 'mockjs'
import loginAPI from './login'
import releaseAPI from './release'
import verify from './verify'
import report from './report'

/*
  审核信息接
*/

Mock.mock('/user/login', 'post', loginAPI.login) // 登录接口
Mock.mock('/user/info', 'get', loginAPI.userInfo) // 获取用户信息
Mock.mock('/user/logout', 'post', loginAPI.logout) // 前端登出（清除缓存）
/*
  获取专栏接口
*/
Mock.mock('/release/hotTag', 'get', releaseAPI.getHotTags) // 获取最热专栏
Mock.mock('/release/allTag', 'get', releaseAPI.getAllTags) // 获取所有专栏

/*
  审核文章接口
*/
Mock.mock('/verify/getList', 'post', verify.getList) // 获取审核信息
Mock.mock('/verify/sort', 'post', verify.sort)

/*
  审核举报接口
*/
Mock.mock('/report/getList', 'post', report.getList) // 获取审核信息
Mock.mock('/report/sort', 'post', report.sort)

export default Mock
