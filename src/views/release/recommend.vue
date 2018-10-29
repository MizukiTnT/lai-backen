<template>
  <div class="recommend">
      <div class="tag-list">
        <div class="title"></div>
        <div class="tag-wrapper">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            color="#fff"
            class="tag"
            @close="handleTagClose(index)"
            @click="handleTagRender(index)">
            {{tag}}
          </el-tag>
        </div>
      </div>
  </div>
</template>

<script>
import { getAllTags } from '@/api/release'

export default {
  data() {
    return {
      tags: [] // 所有的tag
    }
  },
  methods: {
    handleTagRender(index) {

    }
  },
  mounted() {
    getAllTags().then(res => {
      this.tags = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
  .filter {
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    margin-bottom: 10px;
    color: rgb(135, 138, 140);
    fill: rgb(135, 138, 140);
    cursor: pointer;
    overflow: hidden;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(204, 204, 204);
    border-image: initial;
    transition: color 0.5s ease 0s, fill 0.5s ease 0s, box-shadow 0.5s ease 0s;
  }
  .recommend {
    padding: 30px;
    .tag-wrapper {
      max-height: 250px;
      margin-bottom: 10px;
      overflow: hidden;

    }
  }
</style>
