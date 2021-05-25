import router from '@/router'
import store from '@/store'
// 引入进度条插件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['login', '404'] // 定义白名单
router.beforeEach((to, from, next) => {
  // 存在token 跳转至主页
  nprogress.start() // 开启进度条
  // if (store.state.user.token) {
  //   if (to.name === 'login') {
  //     nprogress.done()
  //     next(false)
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (whiteList.includes(to.name)) {
  //     next()
  //   } else {
  //     if (router.currentRoute.name === 'login') {
  //       nprogress.done()
  //     }
  //     next({ name: 'login' })
  //   }
  // }
  if (store.getters.token) {
    if (to.name === 'login') {
      next(false)
    } else {
      next()
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
