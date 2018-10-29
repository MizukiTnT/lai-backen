<template>
  <div class="vote">
    <!-- 投票开关 _S -->
    <el-switch
      v-model="showVote"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <!-- 投票开关 _E -->
    <!-- 投票模板 _S -->
    <transition name="el-fade-in-linear">
      <ul class="vote_content" v-show="showVote && allow_vote">
        <i class="el-icon-close vote_temp_close" @click="closeTemplate"></i>
        <div class="content_tool">
          <span>{{ vote_title }}</span>
        </div>
        <!-- 投票选项 _S -->
        <li v-for="(item, index) in voteList" :class="{active: voteForm.indexOf(index) !== -1 }" @click="handleChoose(index)">
          <el-row type="flex" align="middle">
            <el-col :span="3" class="vote_text">{{ item.select }}</el-col>
            <el-col :span="18">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="80" :color="item.color" class="vote_body"></el-progress>
            </el-col>
            <el-col :span="3" style="text-align: center">
              34
            </el-col>
          </el-row>
        </li>
        <!-- 投票选项 _E -->
      </ul>
    </transition>
    <!-- 投票模板 _E -->

    <!-- 编辑投票弹窗 _S -->
    <el-dialog
      title="编辑投票内容"
      :show-close="false"
      :visible.sync="vote"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%"
      class="vote_wrapper">
      <el-row type="flex" :gutter="15" class="vote_title">
        <el-col class="hidden-md-and-down" :span="4">投票标题</el-col>
        <el-col :span="20">
          <el-input v-model="vote_title" placeholder="请输入投票标题"></el-input>
        </el-col>
      </el-row>
      <div class="allow_checkbox">
        <span>是否允许多选</span>
        <el-switch
          v-model="allow_checkbox"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
      <div class="item_title">投票内容</div>
      <ul  class="editor_vote">
        <li v-for="(item, index) in voteList" @click="">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="item.select" placeholder="输入选项内容"></el-input>
            </el-col>
            <el-col :span="4">
              <span>
                <el-color-picker v-model="item.color" size="mini"></el-color-picker>
              </span>
            </el-col>
            <el-col :span="4">
              <span><i @click="deleteItem(index)" class="el-icon-circle-close-outline icon"></i></span>
            </el-col>
          </el-row>
        </li>
      </ul>
      <div class="add_item" >
        <i @click="addItem" class="el-icon-circle-plus-outline add"></i>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleVoteClose">取 消</el-button>
        <el-button type="primary" @click="renderVote">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑投票弹窗 _E -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      allow_vote: false, // 是否投票flag
      vote: false, // 投票弹框开启
      showVote: false, // switch状态
      vote_title: '', // 投票标题
      allow_checkbox: false, // 是否允许多选
      voteList: [ // 投票选项
        {
          select: '', // 选项内容
          color: '' // 选项颜色
        },
        {
          select: '',
          color: ''
        }
      ],
      voteForm: [] // 记录信息
    }
  },
  watch: {
    showVote(v) {
      this.vote = v
      if (!v) this.allow_vote = false
    },
    allow_checkbox(v) { // 每次选择模式都重新更新状态
      this.voteForm = []
    }
  },
  methods: {
    renderVote() { // 显示投票模板
      this.vote = false
      this.allow_vote = true,
      this.$emit('sendList', {
        allow_checkbox: this.allow_checkbox,
        voteList: this.voteList
      })
    },
    addItem() { // 添加投票选项
      this.voteList.push({
        select: '',
        color: ''
      })
    },
    handleVoteClose() { // 处理关闭编辑栏方法
      this.showVote = false
      this.allow_vote = false
    },
    deleteItem(index) { //  删除投票选项
      this.voteList.splice(index, 1)
    },
    closeTemplate () { // 关闭投票模板
      this.showVote = false
      this.allow_vote = false
    },
    handleChoose(index) { // 处理内容
      if (this.allow_checkbox) { // 如果可以多选
        let pos = this.voteForm.indexOf(index)
        if (pos != -1) {
          this.voteForm.splice(pos, 1)
        } else {
          this.voteForm.push(index)
        }
      } else { // 如果不能多选
        if (this.voteForm.length === 0) {
          this.voteForm.push(index)
        } else {
          this.voteForm.splice(0, 1)
          this.voteForm.push(index)
        }
      }
      console.log(this.voteForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.vote {
  .vote_content {
    position: relative;
    padding: 20px;
    border: 1px solid #EBEEF5;
    list-style: none;
    .content_tool {
      font-size: 18px;
      margin: 15px 0;
      border-bottom: 1px solid #EBEEF5;
    }
    .vote_temp_close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 22px;
      cursor: pointer;
    }
    li {
      margin-bottom: 15px;
      padding: 0 10px;
      border: 1px solid #E4E7ED;
      border-radius: 5px;
      color: #909399;
      cursor: pointer;
      transition: all .15s;
      &:hover {
        border: 1px solid #409EFF;
      }
      &.active {
        color: #303133;
        border: 1px solid #409EFF;
      }
      .vote_text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .vote_wrapper {
    .vote_title {
      align-items: center;
    }
    .item_title {
      margin-top: 30px;
      padding-bottom: 15px;
      border-bottom: 1px solid #EBEEF5;
    }
    .add_item {
      margin-top: 25px;
      text-align: center;
      .add {
        font-size: 22px;
        transition: all .35s;
        cursor: pointer;
        &:hover {
          color: #67C23A;
        }
      }
    }
    .allow_checkbox {
      margin-top: 25px;
      span {
        margin-right: 15px
      }
    }

    .editor_vote {
      margin-top: 28px;
      padding: 0;
      list-style: none;
      li {
        .el-row {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .icon {
          font-size: 22px;
          cursor: pointer;
          transition: all .3s;
          &:hover {
            color: #fd5353;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
