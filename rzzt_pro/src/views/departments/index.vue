<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
        />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <AddDept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    treeTools,
    AddDept
  },
  data () {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      node: null
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments () {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDepts (node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    editDepts (node) {
      this.showDialog = true
      this.node = node
      // 在修改的时候 父组件调用子组件中的方法，子组件方法中调用获取部门详情的接口
      // console.log(this.$refs.addDept)
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

