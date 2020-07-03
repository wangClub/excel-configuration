

- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn
- 国内镜像：http://ant-design-pro.gitee.io

## 模板

```
|- config 
  |- config.js                      // 脚手架配置，配置代理在这
  |- router.config.js               // 配置页面路由
|- dist                             // 打包文件
|- mock                             // 模拟数据
|- public                           // 公共资源
|- src
  |- common                         // 全局公共方法
    |- DownloadZip.js               // 下载流文件组件
    |- globalDefault.js             // 自定义的一些默认设置
    |- options.js                   // 公用options
    |- pattern.js                   // 正则
  |- components                     // 组件库
  |- data                           // 数据层，对接口数据转义
  |- layouts                        // 页面盒子
  |- locales                        // 语言
  |- models                         // redux-saga
  |- pages                          // 页面
  |- services                       // 接口定义
  |- utils                          // 工具
```

## 使用

### 使用命令行
```bash
$ npm install
$ npm start         # 访问 http://localhost:PORT  端口按自定义
```


## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

