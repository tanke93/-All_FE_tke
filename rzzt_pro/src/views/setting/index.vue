<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table
              border=""
              :data="list"
            >
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="120"
              />
              <el-table-column
                prop="name"
                align="center"
                label="角色名称"
                width="240"
              />
              <el-table-column
                align="center"
                prop="description"
                label="描述"
              />
              <el-table-column
                align="center"
                label="操作"
              >
                <!-- 作用于插槽解构 -->
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPerm(row.id)"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form
              label-width="120px"
              style="margin-top:50px"
            >
              <el-form-item label="企业名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input
                  v-model="formData.companyPhone"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层组件 -->
    <el-dialog
      title="编辑部门"
      :visible="showDialog"
      @close="btnCancel"
    >
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          prop="name"
          label="角色名称"
        >
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="8">
          <el-button
            size="small"
            @click="btnCancel"
          >取消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="btnOk"
          >确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 权限分配弹层 -->
    <el-dialog
      title="分配权限"
      :visible="showPermDialog"
      @close="btnPermCancel"
    >
      <!-- 权限树 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <el-row
        slot="footer"
        type="flex"
        justify="center"
      >
        <el-col :span="8">
          <el-button
            type="primary"
            size="small"
            @click="btnPermOk"
          >确定</el-button>
          <el-button
            size="small"
            @click="btnPermCancel"
          >取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole, assignPerm } from '@/api/settings'
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {}, // 公司信息承载体
      showDialog: false,
      showPermDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      permData: [], // 权限数据 树形数据
      defaultProps: {
        label: 'name'
      }, // 定义显示字段的名称、子属性的字段名称
      roleId: null, // 记录当前分配权限的id
      selectCheck: [] // 记录当前的权限点的标识
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created () {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList () {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo () {
      this.formData = await getCompanyInfo(this.companyId)
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async deleteRole (id) {
      try {
        await this.$confirm('确认删除角色吗')
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole (id) {
      this.roleForm = await getRoleDetail(id) // 回写数据
      this.showDialog = true
    },
    async btnOk () {
      try {
        await this.$refs.roleForm.validate()
        // roleForm这个对象有id是编辑 否则就是新增
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false // 此处会触发el-dialog弹层的close事件
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel () {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields() // 移除校验
      this.showDialog = false
    },
    // 权限分配弹层
    async assignPerm (id) {
      // 获取权限点全部数据
      this.permData = tranListToTreeData(await getPermissionList(), '0') // 转化list成树形数据
      // const result = await getPermissionList() // 所有权限点
      this.roleId = id // 记录点击时获取到的id 去获取这id的权限点
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds // 当前角色所拥有得权限点数据
      this.showPermDialog = true
    },
    async btnPermOk () {
      // getCheckedKeys() 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel () {
      this.selectCheck = [] // 重置数据
      this.showPermDialog = false
    }
  }
}
</script>
