//
import Layout from '@/layout'

export default {
  path: '/social_securitys',
  name: 'social_securitys', // 权限
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
