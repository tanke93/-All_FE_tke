//
import Layout from '@/layout'

export default {
  path: '/settings',
  name: 'settings', // 权限
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
