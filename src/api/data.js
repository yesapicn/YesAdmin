import axios from '@/libs/api.request'

import validateUrl from './okayapi_config.js'// 添加请求合法性校验的查询参数


//向CDN上传图片
export const uploadImg = (data = { flie, file_name, file_type }) => {
  let url = validateUrl('App.CDN.UploadImgByBase64', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

//向CDN上传文件
export const uploadFile = (data = { flie, file_name, file_type }) => {
  let url = validateUrl('App.CDN.UploadOfficeByBase64', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

//获取CDN素材库
export const getAssetsList = (data = { file_name, file_type, order_type, page, perpage }) => {
  let url = validateUrl('App.CDN.RecordList', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

//根据ID删除CDN中的文件或图片
export const delet_file = (id) => {
  let url = validateUrl('App.CDN.DeleteById', {id})
  return axios.request({
    method: 'post',
    url,
    data: {id}
  })
}

//获取文章模型中的数据  model_name= 'okayapi_article'
export const getArticleList = (data = { model_name: 'okayapi_article', where, page, perpage  }) => {
  let url = validateUrl('App.Table.FreeQuery', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

//删除文章模型中的数据
export const removeArticleData = (data = { model_name: 'okayapi_article', id  }) => {
  let url = validateUrl('App.Table.Delete', data)
  return axios.request({
    method: 'post',
    url,
    data
  })
}

//添加文章模型中的数据
export const createArticleData = (data = { model_name: 'okayapi_article', id  }) => {
  let url = validateUrl('App.Table.Create', data)
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
