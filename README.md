<!--
 * @Description: 
 * @Author: He Jiecong
 * @Date: 2019-12-12 18:07:55
 * @LastEditTime : 2019-12-30 19:54:46
 * @LastEditors  : He Jiecong
 -->
# YesAdmin 小白后台

YesAdmin 小白后台，基于iview-admin和小白接口，无须后端、免服务器，让前端快速开发管理后台。让项目开发更有趣！

## 技术栈
 + [iview-admin开源框架](https://github.com/iview/iview-admin)
 + [小白开放接口（可免费注册和使用）](http://api.yesapi.cn/docs.php)

## 本地开发
```bush
# 克隆项目
git clone git@github.com:yesapicn/YesAdmin.git

// 安装依赖
npm install

// 开发
npm run dev
```

使用前，可先在[小白开放平台](http://open.yesapi.cn/index.php?r=user/registration)免费注册你的账号，方便存放你自己的数据。注册激活成功后换成你的接口域名，```app_key```和密钥。
配置文件地址：./src/config/index.js;
```javascript
  {
   /**
   * @description 小白后台接用户的APP_KEY和密钥
   *              用于在请求中生成动态签名
   */
  OKAYAPI_APP_KEY: 'F9B**************************6A2',
  OKAYAPI_APP_SECRECT: 'iFESz*********************************************************qW3nIPET',
  }


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
```


## 构建
```bush
npm run build
```

## 功能列表

- 登录 / 注册
- 素材库
    - 素材管理
    - 上传文件、图片
- 数据统计
    - 登录统计
    - 注册统计
- 文章管理
    - 文章列表管理
    - 添加文章
    - 查看文章
    - 上传CSV/Excel文件

## 运行效果

登录页：  
![](http://cdn7.okayapi.com/yesyesapi_20191230183821_318cf4fd4396d7119faf3ad8cc91aa0f.png)

添加文章：  
![](http://cdn7.okayapi.com/yesyesapi_20191230183840_cae4dcff24a31ad420b72082806faeed.png)

素材库：  
![](http://cdn7.okayapi.com/yesyesapi_20191230183903_23dfa459cccac9f77abfe949026cf5fd.png)

上传图片：
![](http://cdn7.okayapi.com/yesyesapi_20191230183921_7a8d12ede52d158799d0dd977a0002ac.png)


## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, 广州果创网络科技有限公司
