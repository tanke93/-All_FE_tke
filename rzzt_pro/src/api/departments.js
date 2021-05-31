import request from '@/utils/request'
// restful接口规范：地址一样 method的不一样 处理也不一样

// 获取组织架构数据
export function getDepartments () {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

// 删除组织架构的部门
export function delDepartments (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增组织架构的部门
export function addDepartments (data) {
  return request({
    url: '/company/department/',
    method: 'post',
    data
  })
}
// 获取某个部门的详情
export function getDepartDetail (id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 保存编辑的数据
export function updateDepartments (data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

