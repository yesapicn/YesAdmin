import md5 from 'js-md5'
// APP_KEY配置
const OKAYAPI_APP_KEY = 'F9B20374B4CBD344913900A437BA56A2'
// 密钥配置
const OKAYAPI_APP_SECRECT = 'iFESzGkU6Pt6ba22gBY1QGoOtrurhqX9rWcnJ5MhgygOswKHNQPWZ8MKzVuwqW3nIPET' // TODO：请勿对外暴露！！

// 小白官方生成动态签名的方法
function enryptData (params) {
  params['app_key'] = OKAYAPI_APP_KEY
  params['sign'] = '' // 屏蔽sign参数

  let sdic = Object.keys(params).sort()
  let paramsStrExceptSign = ''
  for (let ki in sdic) {
    paramsStrExceptSign += params[sdic[ki]]
  }

  let SIGN = md5(paramsStrExceptSign + OKAYAPI_APP_SECRECT).toUpperCase()

  return SIGN
}

export default function validateUrl (apiName, params) {
  let SIGN = enryptData(params)
  let url = '?s=' + apiName + '&app_key=' + OKAYAPI_APP_KEY + '&sign=' + SIGN

  return url
}
