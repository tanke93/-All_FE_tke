//
import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees', // 权限
  component: Layout,
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, {
    path: 'detail/:id', // 动态路由参数 ？的含义可传可不传
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  }]
}
