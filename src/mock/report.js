import Mock from 'mockjs'

let verifyArticle = []
let count = 100

for (let i = 0; i < count; i++) {
  verifyArticle.push(
    Mock.mock({
      time: '@date("yyyy-MM-dd")',
      report_name: '@cname',
      reported_name: '@cname',
      report_id: '@integer(5000)',
      reported_id: '@integer(10000)',
      comment_id: '@integer(3500)',
      article_id: '@integer(5000)',
      type: '@integer(1, 4)',
      content: '@cparagraph'
    })
  )
}

let report = {
  getList(config) {
    let {page = 1, pagesize = 10} = JSON.parse(config.body)
    let res = {}
    res.list = verifyArticle.slice(page * pagesize, (page + 1) * pagesize)
    res.count = count
    return res
  },
  sort () {}
}


export default report