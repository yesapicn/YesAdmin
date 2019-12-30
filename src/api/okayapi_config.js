/*
 * @Description:
 * @Author: He Jiecong
 * @Date: 2019-12-13 18:40:24
 * @LastEditTime : 2019-12-30 19:36:06
 * @LastEditors  : He Jiecong
 */
import md5 from 'js-md5'
import config from '@/config'

// APP_KEY
const OKAYAPI_APP_KEY = config.OKAYAPI_APP_KEY
// 密钥
const OKAYAPI_APP_SECRECT = config.OKAYAPI_APP_SECRECT

// 小白官方生成动态签名的方法
function enryptData (apiName, params) {
  params['app_key'] = OKAYAPI_APP_KEY
  params['s'] = apiName
  params['sign'] = '' // 屏蔽sign参数

  // 按字典顺序对参数排序
  let sdic = Object.keys(params).sort()
  let paramsStrExceptSign = ''
  for (let ki in sdic) {
    paramsStrExceptSign += params[sdic[ki]]
  }

  let SIGN = md5(paramsStrExceptSign + OKAYAPI_APP_SECRECT).toUpperCase()

  return SIGN
}

// 公共参数与接口的拼接
export default function validateUrl (apiName, params) {
  let SIGN = enryptData(apiName, params)
  let url = '?s=' + apiName + '&app_key=' + OKAYAPI_APP_KEY + '&sign=' + SIGN

  return url
}
