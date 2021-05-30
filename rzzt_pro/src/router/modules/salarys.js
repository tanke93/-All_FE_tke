//
import Layout from '@/layout'

export default {
  path: '/salarys',
  name: 'salarys', // 权限
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
