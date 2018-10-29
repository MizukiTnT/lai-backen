import Mock from 'mockjs'

let verifyArticle = []
let count = 100

for (let i = 0; i < count; i++) {
  verifyArticle.push(
    Mock.mock({
      time: '@date("yyyy-MM-dd")',
      title: '@ctitle',
      author: '@cname',
      id: '@integer(3500)',
      authorid: '@integer(152030)',
      'show|1': false,
      type: '@integer(1, 4)',
      showCount: '@integer(60, 1000)'
    })
  )
}

let verify = {
  getList(config) {
    let {page = 1, pagesize = 10} = JSON.parse(config.body)
    let res = {}
    res.list = verifyArticle.slice(page * pagesize, (page + 1) * pagesize)
    res.count = count
    return res
  },
  sort (config) {
    let { sortType,  order} = JSON.parse(config.body)
    let res = {}
    if (sortType === 'time') {
      verifyArticle.forEach(v => {
        v.time = Date.parse(new Date(v.time))
      })
      selectionSort(verifyArticle)
     if (order === 'd') {
        verifyArticle.reverse()
      }
      verifyArticle.forEach(v => {
        v.time = getLocalTime(v.time)
      })
      res.list = verifyArticle.slice(0, 10)
      res.count = count
      return res
    }
  }
}

function getLocalTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}


function selectionSort(arr) {
　　var len = arr.length
　　var minIndex, temp
　　for (var i = 0; i < len - 1; i++) {
　　　　minIndex = i
　　　　for (var j = i + 1; j < len; j++) {
　　　　　　if (arr[j].time < arr[minIndex].time) {
　　　　　　　　minIndex = j
　　　　　　}
　　　　}
　　　　temp = arr[i].time
　　　　arr[i].time = arr[minIndex].time
　　　　arr[minIndex].time = temp
　　}
　　return arr;
}


export default verify


