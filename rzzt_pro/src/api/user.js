import request from '@/utils/request'

export function login (data) {
  // 返回请求的promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
