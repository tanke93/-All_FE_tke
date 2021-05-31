<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width: 100%"
  >
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row
        type="flex"
        justify="end"
      >
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      dafualt: false
    }
  },
  methods: {
    operateDepts (type) {
      if (type === 'add') { // 添加子部门
        // 将当前点击的部门作为参数传给父组件
        this.$emit('addDepts', this.treeNode) // 触发自定义事件 告知父组件 显示弹层
      } else if (type === 'edit') { // 编辑部门
        this.$emit('editDepts', this.treeNode)
      } else { // 删除部门
        this.$confirm('你确定要删除该组织部门吗', '确认信息', {
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 删除成功后，进入
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>
<style></style>
