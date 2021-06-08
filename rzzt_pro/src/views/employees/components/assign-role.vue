<template>
  <el-dialog
    title="分配角色"
    :visible="showRoleDialog"
    @close="btnCancel"
  >
    <!-- 多选框组 v-model双向绑定 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox
        v-for="item in list"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button
          size="small"
          type="primary"
          @click="btnOk"
        >确定</el-button>
        <el-button
          size="small"
          @click="btnCancel"
        >取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/settings'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      list: [], // 定义角色列表
      roleIds: [] // 定义负责存储当前用户所拥有的角色id
    }
  },
  created () {
    this.getRoleList() // 获取所有的角色
  },
  methods: {
    async getRoleList () {
      // const { rows } = await getRoleList({ page: 1, pagesize: 20 }) // 角色不会特别多
      const { rows } = await getRoleList()
      this.list = rows
    },
    // 因为页面渲染是异步 故不能使用this.userId
    async getUserDetailById (id) {
      // 将用户所拥有的角色赋值给当前用户的对象
      const { roleIds } = await getUserDetailById(id)
      console.log(roleIds)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async btnOk () {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      // 关闭窗体
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel () {
      this.roleIds = [] // 清空原来的数组
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>
</style>
