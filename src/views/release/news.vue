<template>
  <div class="app-container">
    <rcontent :dynamicTags="tags" @sendTag="recieveTag" :from="true"></rcontent>
  </div>
</template>

<script>
import rcontent from '@/components/EditRelease'
import {getHotTags} from '@/api/release'

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

