import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

//获取用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user`
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

//获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/channels`
  })
}