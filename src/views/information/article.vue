<template>
  <div class="app-container">
    <div class="filter">

      <el-select class="select filter-item" v-model="timeSort" placeholder="时间" fit highlight-current-row>
        <el-option
          v-for="item in timeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select class="select filter-item" v-model="viewSort" placeholder="浏览次数">
        <el-option
          v-for="item in viewOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select class="select filter-item" v-model="typeSort" placeholder="类型">
        <el-option
          v-for="item in typeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input class="search filter-item" v-model="title" placeholder="标题"></el-input>
      <el-input class="search filter-item" v-model="author" placeholder="作者"></el-input>
      <el-button class="button filter-item" type="primary" icon="el-icon-search">搜索</el-button>

    </div>
    <el-table
      :data="tableList"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column
        label="标题"
        min-width="120px"
        prop="title">
      </el-table-column>
      <el-table-column
        label="发布时间"
        min-width="120px"
        prop="time">
      </el-table-column>
      <el-table-column
        label="作者"
        min-width="120px"
        prop="author">
      </el-table-column>
      <el-table-column
        label="浏览次数"
        min-width="120px"
        prop="showCount">
      </el-table-column>
      <el-table-column min-width="250px" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)">已可见</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="openDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {GetVerifyList, SortList} from '@/api/verify'
  export default {
    data() {
      return {
        tableList: [],
        page: 1,
        pagesize: 10,
        total: 0,
        title: '', // 按标题搜索
        author: '', // 按作者搜索
        typeSort: '', // 类型排序值
        timeSort: '', // 时间排序值
        viewSort: '', // 浏览排序值
        timeOption: [ // 时间排序选项
          {
            value: 'a',
            label: '时间 ↑'
          },
          {
            value: 'd',
            label: '时间 ↓'
          }
        ],
        viewOption: [ // 浏览排序选项
          {
            value: 'a',
            label: '次数 ↑'
          },
          {
            value: 'd',
            label: '次数 ↓'
          }
        ],
        typeOption: [
          {
            value: '1',
            label: '1'
          },
          {
            value: '2',
            label: '2'
          },
          {
            value: '3',
            label: '3'
          },
          {
            value: '4',
            label: '4'
          }
        ]
      }
    },
    watch: {
      typeSort (n) {

      },
      timeSort (n) {
        SortList({
          sortType: 'time',
          order: n
        }).then(res => {
          this.tableList = res.data.list
        })
      },
      viewSort (n) {},

    },
    methods: {
      handleEdit (index, row) {

      },
      openDelete (index, row) {
        this.$confirm('确定删除该帖?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableList.splice(index, 1)
          this.$notify({
            title: '提示',
            message: '已删除',
            duration: 1000
          })
        }).catch(() => {
          this.$notify({
            title: '提示',
            message: '已取消',
            duration: 1000
          })
        })
      },
      handleShow (index, row) {

      },
      handleCurrentChange (val) {
        this.page = val
        GetVerifyList({page:this.page, pagesize: this.pagesize}).then((res) => {
          this.tableList = res.data.list
          this.total = res.data.count
        })
      }
    },

    mounted () {
      GetVerifyList({page:this.page, pagesize: this.pagesize}).then((res) => {
        this.tableList = res.data.list
        console.log(this.tableList)
        this.total = res.data.count
      })
    }
  }
</script>

<style scoped lang="scss">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .pagination {
    margin-top: 15px;
    text-align: right;
  }
  .filter {
    margin-bottom: 15px;
    .search {
      width: 140px;
    }
    .select {
      width: 130px;
    }
    .button {
      margin-left: 15px;
    }
    .filter-item {
      margin-bottom: 10px;
    }
  }
</style>

