/**
 * @type {import('vuex').StoreOptions<typeof state>}
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken // 设置token为共享状态
}
const mutations = {
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  removeToken (state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  }
}
const actions = {
  async login (context, data) {
    // 调用api接口
    const result = await login(data)
    // axios默认会加一层data
    if (result.data.success) {
      context.commit('setToken', result.data.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
