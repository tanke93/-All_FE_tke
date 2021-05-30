//
import Layout from '@/layout'

export default {
  path: '/attendances',
  name: 'attendances', // 权限
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}
