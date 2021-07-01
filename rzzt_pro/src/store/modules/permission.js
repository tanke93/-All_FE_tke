// 专门处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  // 用户起初一定拥有静态路由权限
  routes: constantRoutes // 路由表 当前用户所拥有所有路由的数组
}
const mutations = {
  // 定义修改routes的mutations
  // payload 载核是登录成功需要添加的新路由
  setRoutes (state, newRoutes) {
    // state.routes = [...state.routes, ...newRoutes] // 业务逻辑错误
    state.routes = [...constantRoutes, ...newRoutes] // 每次都在静态路由的基础上去加新的路由
  }
}
const actions = {
  // 筛选权限路由
  // menus 为当前用户所拥有的的菜单权限
  filterRoutes (context, menus) {
    const routes = []
    // 筛选出动态路由中的menus中能对应上的路由
    menus.forEach(e => {
      // e是标识
      // asyncRoutes中找对象中的name属性等于e的 若存在就筛选出来返回一个新的数组 否则就没找到权限
      routes.push(...asyncRoutes.filter(item => item.name === e)) // 得到的数组可能有元素、也可能为空
    })
    // 这个的routes是所有模块中，满足权限要求的路由数组
    // routes就是当前用户所拥有的动态路由的权限
    context.commit('setRoutes', routes) // 将动态路由提交给mutations
    return routes // state数据是用来显示左侧菜单   此处return的routes是给路由addRoutes的
  }
}
export default {
  namespaced: true, // 命名空间
  state,
  mutations,
  actions
}
