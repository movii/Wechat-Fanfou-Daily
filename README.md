<div align="center" markdown="1">
  <h1>「饭否每日精选·日历」微信小程序</h1>
  <br>
  <div align="center">
    <img src="https://github.com/movii/Wechat-Fanfou-Daily/raw/v1/screenshots/wechat_fanfou_daily_screenshot.png">
    <br/><br/><br/>
    <h2>扫码访问</h2>
    <br/>
    <img src="https://github.com/movii/Wechat-Fanfou-Daily/raw/v1/screenshots/qrcode.jpg" width="40%">
   </div>
</div>
<br/>

## ❗️ 重要的前言
作者 Profile 中的两个项目：[Vue-Fanfou-Daily](https://github.com/movii/Vue-Fanfou-Daily) 和 [Wechat-Fanfou-Daily](https://github.com/movii/Wechat-Fanfou-Daily)，
作者自己把这两个项目作为学习 Vue.js 和微信小程序的练手项目，最早的时候只是拿一些假数据在本地学习两者。后来，作为一个多年的饭否用户，无意间发现「饭否每日精选」提供 JSON 数据供稿作为 Public API 给第三方使用，于是就鼓捣想试试看，后来就有了这两个项目。

这两个项目除了长得差不多外，**同时使用的也是同一个数据源**：写了一个简单的爬虫抓取「饭否每日精选」官方数据，然后存到 LeanCloud 上，供两个项目使用。

发布项目到 Github 的时候，考虑到小程序这部分，不想参杂 `package.json`、 `./node_modules` 等在目录中，**所以爬虫部分的代码都在 Vue-fanfou-daily 项目中，具体的使用也写在了该项目的 README 中，请参考《[首次抓取所有存量数据并存储至 LeanCloud](https://github.com/movii/Vue-Fanfou-Daily#%E9%A6%96%E6%AC%A1%E6%8A%93%E5%8F%96%E6%89%80%E6%9C%89%E5%AD%98%E9%87%8F%E6%95%B0%E6%8D%AE%E5%B9%B6%E5%AD%98%E5%82%A8%E8%87%B3-leancloud)》和《[☁️ 部署至 LeanCloud](https://github.com/movii/Vue-Fanfou-Daily#%EF%B8%8F-%E9%83%A8%E7%BD%B2%E8%87%B3-leancloud)》**。

如果在设置爬虫、以及抓取数据存储至 LeanCloud 的过程中有问题，欢迎提 issue。

#### ❓ 为什么会有爬虫抓取数据，然后存到 LeanCloud？
微信小程序中所有发出的请求必须是 HTTPS 的，开始制作的时候（2017 年 5 月）「饭否每日精选」官方数据源是没有 HTTPS 支持的，所以当时首要的问题就是搞定数据源 HTTPS，做了点简单的 research 之后决定放在 LeanCloud 上（看了 LeanCloud 官方写的一个使用 [LeanCloud 做为数据存储的 TODOs demo](https://github.com/leancloud/leantodo-weapp)）。

## 相关 blog 文章
1. [笔记：「饭否精选」微信小程序（一）制作记录](http://movii.github.io/blog/2017/06/01/没能上线的小程序-饭否精选日历/)
2. [笔记：「饭否精选」微信小程序（二）爬虫部分](http://movii.github.io/blog/2017/06/15/fanfou-daily-wechat-log-scrapy/)
3. [笔记：「饭否精选」微信小程序（三）小程序开发中遇到的问题](http://movii.github.io/blog/2017/07/15/fanfou-daily-wechat-min-program/)
</aside>
