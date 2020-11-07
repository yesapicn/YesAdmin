import axios from '@/libs/api.request'

import validateUrl from './okayapi_config.js'// 添加请求合法性校验的查询参数

export const GetDailyRegister = (data = { start_date, end_date }) => {
  let url = validateUrl('App.Statistics.GetDailyRegister', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

export const GetDailyLoginReport = (data = { start_date, end_date }) => {
  let url = validateUrl('App.Statistics.GetDailyLoginReport', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}
