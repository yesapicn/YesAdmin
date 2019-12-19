import axios from '@/libs/api.request'

import validateUrl from './okayapi_config.js'// 添加请求合法性校验的查询参数


//上传图片
export const uploadImg = (data = { flie, file_name, file_type }) => {
  let url = validateUrl('App.CDN.UploadImgByBase64', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}
//获取图片库
export const getAssetsList = (data = { file_name, file_type, order_type, page, perpage }) => {
  let url = validateUrl('App.CDN.RecordList', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

//获取文章模型数据  model_name= 'okayapi_article'
export const getArticleList = (data = { model_name: 'okayapi_article', where, page, perpage  }) => {
  let url = validateUrl('App.Table.FreeQuery', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}


export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}



export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
