<template>
  <div class="release_content">
    <el-form :model="form" label-position="left"  label-width="80px">
      <el-form-item label="标题">
        <el-input
          placeholder="请输入标题"
          v-model="form.title"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-radio v-model="radio" label="1">直接发布</el-radio>
        <el-radio v-model="radio" label="2">定时发布</el-radio>
        <el-date-picker
          v-model="form.time"
          :disabled="radio != 2"
          :picker-options="pickerOptions"
          type="datetime"
          placeholder="选择发布日期"
          align="right"
          class="timeout"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键词">
        <el-tag
          :key="index"
          v-for="(tag, index) in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">新建标签</el-button>
      </el-form-item>
      <el-form-item label="是否投票">
        <vote @sendList="getVoteInfo"></vote>
      </el-form-item>
      <el-form-item label="文章出处" v-if="from">
        <el-row >
          <el-col :span="12">
            <el-row :gutter="10">
              <el-col :span="8" style="text-align:center">出处：</el-col>
              <el-col :span="16">
                <el-input v-model="from_text" placeholder="输入转载出处"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="10">
              <el-col :span="8" style="text-align:center">链接：</el-col>
              <el-col :span="16">
                <el-input v-model="from_link" placeholder="输入转载链接" class="input-with-select">
                  <el-select v-model="rheader" slot="prepend" placeholder="请选择">
                    <el-option label="http" value="http://"></el-option>
                    <el-option label="https" value="https://"></el-option>
                  </el-select>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="编辑内容">
        <editor @handleBlur="getContent"></editor>
      </el-form-item>
    </el-form>
    <div class="submit">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor'
import 'element-ui/lib/theme-chalk/display.css';
import vote from '@/components/vote'

export default {
  components: {
    editor, vote
  },
  props: {
    dynamicTags: {
      type: Array,
      default: () => {
        return []
      }
    },
    from: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      pickerOptions: {
        // 便捷选项
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      voteInfo: null,
      content: '', // 富文本编辑器内容
      form: { // 信息内容和标题
        time: '',
        title: ''
      },
      radio: '1', // radio选项框默认选项
      isLoading: false, // 是否在提交内容
      inputVisible: false, // 控制新增tag输入框的显隐
      inputValue: '', // 新增tag的内容
      from_text: '',
      from_link: '',
      rheader: 'http' // 链接的头
    }
  },
  methods: {
    getContent(content) { // 获取eidor内容
      this.content = content
    },
    getVoteInfo(info) {
      this.voteInfo = info
    },
    handleSubmit() {
      if(!this.form.title) {
        this.$message('不能没有标题')
        return
      }
      if(!this.content) {
        this.$message('请编辑文本内容')
        return
      }
      let obj = {}
      if (this.form.time) obj.time = this.form.time
      if (this.voteInfo) obj.voteInfo = this.voteInfo
      if (this.from) {
        obj.link = this.rheader + this.from_link
        obj.from_text = this.from_text
      }
      obj.content = this.content
      obj.title = this.form.title
      this.$emit('getEditData', obj)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.$emit('sendTag', this.dynamicTags)
    }
  }
}
</script>

<style lang="scss" scoped>
  .release_content {
    padding: 30px;
    .timeout {
      margin-left: 15px;
    }
    .submit {
      text-align: right;
      padding-right: 20px;
    }

    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
</style>
