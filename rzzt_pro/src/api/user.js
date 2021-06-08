import request from '@/utils/request'

export function login (data) {
  // 返回请求的promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 根据id获取用户的详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// export function logout() {

// }
