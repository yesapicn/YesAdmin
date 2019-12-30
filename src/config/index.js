/*
 * @Description:
 * @Author: He Jiecong
 * @Date: 2019-12-30 17:00:32
 * @LastEditTime : 2019-12-30 18:43:10
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
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '/',
    pro: 'http://pro.api.phalapi.net/'
  },
  proxyTable: {
    '/api': {
      target: 'http://pro.api.phalapi.net/',
      changeOrigin: true, // 开启代理
      pathRewrite: {
        '^/api': '/api'
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
