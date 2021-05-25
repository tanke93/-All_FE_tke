/**
 * @type {import('vuex').StoreOptions<typeof state>}
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(), // 设置token为共享状态
  userInfo: {} // 定义个空对象 不是null nul会致使后续开发userInfo报错
}
const mutations = {
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  removeToken (state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  },
  setUserInfo (state, result) {
    state.userInfo = result // 方法一 响应式更新对象
    // state.userInfo = { ...result } // 方法二
  }
}
const actions = {
  async login (context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    // axios默认会加一层data
    context.commit('setToken', result) // 设置token
  },
  async getUserInfo (context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
