//
import Layout from '@/layout'

export default {
  path: '/approvals',
  name: 'approvals', // 权限
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
