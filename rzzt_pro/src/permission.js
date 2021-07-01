import router from '@/router'
import store from '@/store'
// 引入进度条插件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['login', '404'] // 定义白名单
router.beforeEach(async (to, from, next) => {
  // 存在token 跳转至主页
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    if (to.name === 'login') {
      next(false)
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // 筛选用户的可选路由
        const routes = await store.dispatch('permission/filterRoutes', roles.menus) // 筛选得到当前用户可用的动态路由
        // 此处routes是筛选得到的动态路由
        // console.log(routes)
        // 动态路由添加到路由表中默认的路由表 只有静态路由 没有动态路由
        // addRoutes
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由到路由表
        // router.addRoutes(routes) // 添加动态路由到路由表
        // addRoutes之后必须使用next(to.path) 否则会使刷新页面之后权限消失 此处是vue-router的已知缺陷
        next(to.path)
      } else {
        next()
      }
    }
  } else { // 没有token
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
  nprogress.done()
})
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
