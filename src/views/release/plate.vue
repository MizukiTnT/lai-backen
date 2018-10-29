<template>
  <div class="plate">
    <rcontent :dynamicTags="tags" @sendTag="recieveTag" @getEditData="transfer"></rcontent>
  </div>
</template>

<script>
// 这里是可以用slot来做的 这样功能页分清了 还能开启具体内容 但是既然用了props 那也 没必要改变了
import rcontent from '@/components/EditRelease'
import {getHotTags} from '@/api/release'

// 这里是可以用接受params然后套用同一component来做的 但是由于上方nav需要在route里面有路径 所以这里还是要用具体文件
export default {
  components: {
    rcontent
  },
  data() {
    return {
      data: null,
      tags: []
    }
  },
  methods: {
    transfer(data) {
      this.data = data
    },
    recieveTag(tags) {
      this.tags = tags
    }
  },
  mounted() {
    getHotTags().then(tags => {
      this.tags = tags.data
    })
  }
}
</script>

<style lang="scss" scoped>
  .plate {
    padding: 30px;
    .timeout {
      margin-left: 15px;
    }
    .submit {
      text-align: right;
      padding-right: 20px;
    }
  }
</style>
