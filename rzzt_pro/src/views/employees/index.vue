<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template v-slot:before>
          <span slot="before">共{{ page.total }}条数据</span>
        </template>
        <template v-slot:after>
          <el-button
            size="small"
            type="success"
          >excel导入</el-button>
          <el-button
            size="small"
            type="danger"
          >excel导入</el-button>
          <el-button
            size="small"
            type="primary"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </PageTools>
      <el-table
        v-loading="loading"
        :data="list"
      >
        <el-table-column
          label="序号"
          sortable=""
          type="index"
        />
        <el-table-column
          label="姓名"
          sortable=""
          prop="username"
        />
        <el-table-column
          label="工号"
          sortable=""
          prop="workNumber"
        />
        <el-table-column
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
          :formatter="formatEmployment"
        />
        <el-table-column
          label="部门"
          sortable=""
          prop="departmentName"
        />
        <el-table-column
          label="入职时间"
          sortable=""
          prop="timeOfEntry"
        >
          <template v-slot="{row}">{{ row.timeOfEntry |formatDate }}</template>
        </el-table-column>
        <el-table-column
          label="账户状态"
          sortable=""
          prop="enableState"
        >
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState === 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          sortable=""
          fixed="right"
          width="280"
        >
          <template slot-scope="{row}">
            <el-button
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
            >转正</el-button>
            <el-button
              type="text"
              size="small"
            >调岗</el-button>
            <el-button
              type="text"
              size="small"
            >离职</el-button>
            <el-button
              type="text"
              size="small"
            >角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteEmployee(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row
        type="flex"
        justify="center"
        align="middle"
        style="height:60px"
      >
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <AddEmployee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees' // 引入枚举对象
import AddEmployee from './components/add-employee'
export default {
  components: {
    AddEmployee
  },
  data () {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0 // 总数
      },
      loading: false,
      showDialog: false
    }
  },
  created () {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList () {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    formatEmployment (row, column, cellValue, index) {
      // 去匹配1所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteEmployee (id) {
      try {
        await this.$confirm('确定要删除该员工信息吗?')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
