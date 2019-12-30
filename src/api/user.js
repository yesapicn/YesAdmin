/*
 * @Description:
 * @Author: He Jiecong
 * @Date: 2019-12-30 17:00:32
 * @LastEditTime : 2019-12-30 18:24:41
 * @LastEditors  : He Jiecong
 */
import axios from '@/libs/api.request'

// import validateUrl from './okayapi_config.js'// 添加请求合法性校验的查询参数

export const login = (data) => {
  // let url = validateUrl('App.User.Login', data)
  return axios.request({
    method: 'post',
    url: 'api/app.php?service=App.Auth.UserLogin',
    data
  })
}

export const register = (params = { username, password }) => {
  let url = validateUrl('App.User.Register', params)
  return axios.request({
    method: 'post',
    url,
    params
  })
}

// export const getUserInfo = (token) => {
//   return axios.request({
//     url: 'get_info',
//     params: {
//       token
//     },
//     method: 'get'
//   })
// }

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
