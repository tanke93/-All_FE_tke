import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
const timer = 7200 // 定义超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超时时间
})
service.interceptors.request.use(config => {
  // 注入我们的token
  if (store.getters.token) {
    // 如果存在token，才检查时间戳是否超时
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      // 跳至登录页
      router.push('/login')
      return Promise.reject(new Error('登录时间过长，请重新登录！'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  // 处理后台接口返回token超时处理（被动处理）
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
// 处理超时
function IsCheckTimeOut () {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > timer
}
export default service
