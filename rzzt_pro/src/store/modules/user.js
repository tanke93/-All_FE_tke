/**
 * @type {import('vuex').StoreOptions<typeof state>}
 */
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
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
  },
  removeUserInfo () {
    state.userInfo = {}
  }
}
const actions = {
  async login (context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    // axios默认会加一层data
    context.commit('setToken', result) // 设置token

    setTimeStamp() // 设置时间戳
  },
  async getUserInfo (context) {
    const result = await getUserInfo()
    // 用户详细信息
    const baseInfo = await getUserDetailById(result.userId)
    // const baseResult = { ...result, ...baseInfo } // 两个接口结果进行合并
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result
  },
  // 登出操作
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
