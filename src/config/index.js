/*
 * @Description:
 * @Author: He Jiecong
 * @Date: 2019-12-13 18:40:24
 * @LastEditTime : 2019-12-30 19:33:51
 * @LastEditors  : He Jiecong
 */
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'YesAdmin',
  /**
   * @description token在Cookie中存储的天数，默认保存1天,记住登录状态时保存30天
   */
  cookieExpires_short: 1,
  cookieExpires_long: 30,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description 小白后台接用户的APP_KEY和密钥
   *              用于在请求中生成动态签名
   */
  OKAYAPI_APP_KEY: 'F9B20374B4CBD344913900A437BA56A2',
  OKAYAPI_APP_SECRECT: 'iFESzGkU6Pt6ba22gBY1QGoOtrurhqX9rWcnJ5MhgygOswKHNQPWZ8MKzVuwqW3nIPET',

  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://hn216.api.yesapi.cn/yesapi/',
    pro: 'http://hn216.api.yesapi.cn/yesapi/'
  },
  proxyTable: {
    '/api': {
      target: 'http://hn216.api.yesapi.cn/yesapi/',
      changeOrigin: true, // 开启代理
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
