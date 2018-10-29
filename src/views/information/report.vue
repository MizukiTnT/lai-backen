<template>
  <div class="report">
    <div class="filter">

      <el-select class="select filter-item" v-model="timeSort" placeholder="时间" fit highlight-current-row>
        <el-option
          v-for="item in timeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select class="select filter-item" v-model="reportSort" placeholder="举报类型" fit highlight-current-row>
        <el-option
          v-for="item in reportOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input class="search filter-item" v-model="username" placeholder="用户"></el-input>
      <el-button class="button filter-item" type="primary" icon="el-icon-search">搜索</el-button>

    </div>
    <el-table
      :data="reportList"
      border
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column
        label="被举报用户"
        min-width="120px"
        >
        <template slot-scope="scope">
          <router-link to="" >{{ scope.row.reported_name }}</router-link>
        </template>
      </el-table-column>

      <el-table-column
        label="举报用户"
        min-width="120px"
        >
        <template slot-scope="scope">
          <router-link to="" >{{ scope.row.report_name }}</router-link>
        </template>
      </el-table-column>

      <el-table-column
        label="举报类型"
        min-width="120px"
        >
        <template slot-scope="scope">
          <p>{{ scope.row.type | parseType }}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="被举报内容"
        min-width="120px"
        >
        <template slot-scope="scope">
          <p @click="openMsg(scope.row.content)" class="report_content">{{ scope.row.content }}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="举报时间"
        prop="time">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">处理</el-button>
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
import {GetReportList, SortList} from '@/api/report'
export default {
  data () {
    return {
      timeSort: '',
      page: 1,
      username: '',
      reportList: [],
      pagesize: 10,
      total: 0,
      reportSort: '',
      reportOption: [
        {
          value: '1',
          label: '不雅内容'
        },
        {
          value: '2',
          label: '违反法律法规'
        },
        {
          value: '3',
          label: '人身攻击'
        },
        {
          value: '4',
          label: '垃圾信息'
        }
      ],
      timeOption: [ // 时间排序选项
        {
          value: 'a',
          label: '时间 ↑'
        },
        {
          value: 'd',
          label: '时间 ↓'
        }
      ]
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      GetReportList({page: this.page, pagesize: this.pagesize}).then(res => {
        this.total = res.data.count
        this.reportList = res.data.list
      })
    },
    handleEdit () {},
    openMsg(content) {
      this.$alert(content, '举报内容')
    }
  },
  filters: {
    parseType(type) {
      let parse
      switch (type) {
        case 1:
          parse = '不雅内容'
          break
        case 2:
          parse = '违反法律法规'
          break
        case 3:
          parse = '人身攻击'
          break
        case 4:
          parse = '垃圾信息'
          break
        default:
          parse = '未知类型'
          break
      }
      return parse
    }
  },
  async mounted () {
    let res = await GetReportList({page: this.page, pagesize: this.pagesize})
    console.log(res.data.list)
    this.total = res.data.count
    this.reportList = res.data.list
  }
}
</script>

<style lang="scss" scoped>
  .report {
    padding: 20px;
    .el-table .cell {
      line-height: inherit;
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
    .pagination {
      margin-top: 10px;
      text-align: right;
    }
    .report_content {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: #409eff;
      &:hover {
        color: #66b1ff;
      }
    }
  }
</style>
