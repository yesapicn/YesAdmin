<!--
 * @Description: 
 * @Author: He Jiecong
 * @Date: 2019-12-12 18:07:55
 * @LastEditTime : 2019-12-30 19:54:46
 * @LastEditors  : He Jiecong
 -->
# YesAdmin 小后台


YesAdmin 小后台，基于iview-admin和小白接口，无须后端、免服务器，快速开发你的业务管理后台！  

特点： 
 + 本地开发调试：可以在本地使用iview-admin进行业务功能开发和调试  
 + 果创云托管运行：构建打包后上传到果创云，即可访问使用  

## 技术栈
 + [iview-admin开源框架](https://github.com/iview/iview-admin)
 + [小白开放接口（可免费注册和使用）](http://api.yesapi.cn/docs.php)

## 本地开发
```bush
# 克隆项目
git clone git@github.com:yesapicn/YesAdmin.git

# 安装依赖
npm install

# 开发
npm run dev
```

如果需要使用国内的淘宝镜像，可以使用以下命令：  
```bash
# 使用阿里定制的cnpm命令行工具代替默认的npm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

# 检测是否安装成功
$ cnpm -v

# 安装依赖
cnpm install

# 开发
cnpm run dev

```

## 配置

使用前，可先在[果创云](http://open.yesapi.cn/index.php?r=user/registration)免费注册你的账号，方便存放你自己的数据。注册激活成功后换成你的接口域名，```app_key```和密钥。  

注册后，可进入果创云查看你的应用配置。链接：[http://open.yesapi.cn/?r=App/Mine](http://open.yesapi.cn/?r=App/Mine)  

![](http://cd8.yesapi.net/yesyesapi_20201101115924_3e4826550b3de93ffbf72aeb7cde93c0.png)  

> 体验账号：api_demo，密码：123456 。使用前，请[注册](http://open.yesapi.cn/index.php?r=user/registration)你自已的果创云账号。 

### 小后台根目录配置
在本地，修改配置文件：./vue.config.js  
```
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/admin-api_demo/'  // 线上的托管环境的根目录，最终正式的访问链接是 http://open.yesapi.cn/admin-你的果创云登录账号/
  : '/' // 本地根目录
```

> 温馨提示：把上面的```/admin-api_demo/```换成```/admin-你的果创云登录账号/```。  

### 接口配置  

在本地，修改配置文件：./src/config/index.js;
```javascript
  {
   /**
   * @description 小后台接用户的APP_KEY和密钥
   *              用于在请求中生成动态签名
   */
  OKAYAPI_APP_KEY: 'F9B**************************6A2', // TODO: 你的app_key
  OKAYAPI_APP_SECRECT: 'iFESz*********************************************************qW3nIPET', // TODO: 仅本地开发调试需要，构建时可置空
  }

  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://api.yesapi.cn/yesapi/', // TODO：你的小白接口域名
    pro: '/yesapi/'// 正式域名，不需要修改
  },
  proxyTable: {
    '/api': {
      target: 'http://hn216.api.yesapi.cn/yesapi/',  // TODO：你的小白接口域名
      changeOrigin: true, // 开启代理
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
```

分别修改：  
 + OKAYAPI_APP_KEY 和 OKAYAPI_APP_SECRECT  
 + baseUrl.dev  
 + proxyTable.target  

### 路由配置
在本地，修改路由配置文件：./src/ruoter/index.js  
```
const baseUrl = process.env.NODE_ENV === 'production' ? '/admin-api_demo/' : '/' // 注意区分本地和线上的环境
```

> 温馨提示：把上面的```/admin-api_demo/```换成```/admin-你的果创云登录账号/```。  

### 本地运行  
修改上面配置后，运行命令：  
```bash
# 开发
npm run dev

# 或

# 开发
cnpm run dev
```

![](http://cd8.yesapi.net/yesyesapi_20201101122517_8d8bcdec427098d21f18bd321c14c4e4.png)  

### 运行效果

登录页：  
![](http://cdn7.okayapi.com/yesyesapi_20191230183821_318cf4fd4396d7119faf3ad8cc91aa0f.png)  

> 温馨提示：这里的登录账号是你的应用会员，不是果创云登录账号！推荐使用应用管理员账号登录。[点击查看你的应用会员](http://open.yesapi.cn/?r=Member/userManager)。  

添加文章：  
![](http://cdn7.okayapi.com/yesyesapi_20191230183840_cae4dcff24a31ad420b72082806faeed.png)  
> 提示：这是一个数据模型的例子，可根据需要修改，实现数据的后台管理，包括增删改查。  

素材库：  
![](http://cd8.yesapi.net/yesyesapi_20201101163207_7f1fb039c39fe85fbdd6a6516f4b041c.png)  

上传图片：
![](http://cdn7.okayapi.com/yesyesapi_20191230183921_7a8d12ede52d158799d0dd977a0002ac.png)  
> 提示：此部分对应[素材库](http://open.yesapi.cn/?r=Data/DocsRecord)。  

### 功能列表

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
  
更多后台功能，可自行根据业务需要开发。  

## 构建和发布 
在本地运行：  

```bush
# 构建 
npm run build

# 或
# 构建 
cnpm run build
```

![](http://cd8.yesapi.net/yesyesapi_20201101122638_8790eafe586cd6aae669b6b2455c1ed3.png)  

构建后，把dist目录打包：  
![](http://cd8.yesapi.net/yesyesapi_20201101121506_466df0921ede2c84de89253b9d0db25c.png)  

登录果创云平台，上传发布：  
![](http://cd8.yesapi.net/yesyesapi_20201101154254_424a4a8794fcc1f5c88e3434ff842ae7.png)  

> 发布页面：[http://open.yesapi.cn/?r=App/Admin](http://open.yesapi.cn/?r=App/Admin)  

发布后，正式环境访问效果：  
![](http://cd8.yesapi.net/yesyesapi_20201101122116_294baadabc26b5d0af49b6f8b88b4f4a.png)  

发布后，就可以给你的团队使用啦~！  

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, 广州果创网络科技有限公司
