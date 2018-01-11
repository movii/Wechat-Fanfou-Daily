<div align="center" markdown="1">
  <h1>「饭否每日精选·日历」微信小程序</h1>
  <br>
  <div align="center">
    <img src="https://github.com/movii/Wechat-Fanfou-Daily/raw/v2/screenshots/wechat_fanfou_daily_screenshot_v2.png">
    <br/><br/><br/>
    <h2>扫码访问</h2>
<i align="left">上面提供的 QRCode 扫描到达的对应的是分支中 v1（线上版本），v2 的版本提交之后没有通过审核，因为个人开发者牵扯到类目问题，在开发者论坛上做过一次<a href="https://developers.weixin.qq.com/blogdetail?action=get_post_info&docid=df4c02809daf820931dad4ef8a11e7af&token=511912409&lang=zh_CN">反馈</a>，最终还是没啥用。</i>
    <br/>
    <br/>
    <br/>
    <img src="https://github.com/movii/Wechat-Fanfou-Daily/raw/v1/screenshots/qrcode.jpg" width="40%">
   </div>
</div>
<br/>

## 重要的前言
Profile 中的：[Vue-Fanfou-Daily](https://github.com/movii/Vue-Fanfou-Daily) 和 [Wechat-Fanfou-Daily](https://github.com/movii/Wechat-Fanfou-Daily)，
作者自己把它们两个作为学习 Vue.js 和微信小程序的练手项目，最早的时候只是拿一些假数据在本地学习两者。后来，作为一个多年的饭否用户，无意间发现「饭否每日精选」提供 JSON 数据供稿作为 Public API 给第三方使用，于是就鼓捣想试试看，后来就有了这两个项目。

这两个项目除了长得差不多外，**同时使用的也是同一个数据源**：写了一个简单的爬虫抓取「饭否每日精选」官方数据，然后存到 LeanCloud 上，供两个项目使用。

发布项目到 Github 的时候，考虑到小程序这部分，不想参杂 `package.json`、 `./node_modules` 等在目录中，**所以爬虫部分的代码都在 Vue-fanfou-daily 项目中，具体的使用也写在了该项目的 README 中**，请参考《[首次抓取所有存量数据并存储至 LeanCloud](https://github.com/movii/Vue-Fanfou-Daily#%E9%A6%96%E6%AC%A1%E6%8A%93%E5%8F%96%E6%89%80%E6%9C%89%E5%AD%98%E9%87%8F%E6%95%B0%E6%8D%AE%E5%B9%B6%E5%AD%98%E5%82%A8%E8%87%B3-leancloud)》和《[☁️ 部署至 LeanCloud](https://github.com/movii/Vue-Fanfou-Daily#%EF%B8%8F-%E9%83%A8%E7%BD%B2%E8%87%B3-leancloud)》。

如果在设置爬虫、以及抓取数据存储至 LeanCloud 的过程中有问题，欢迎提 issue。

#### 为什么会有爬虫抓取数据，然后存到 LeanCloud？
微信小程序中所有发出的请求必须是 HTTPS 的，开始制作的时候（2017 年 5 月）「饭否每日精选」官方数据源是没有 HTTPS 支持的，所以当时首要的问题就是搞定数据源 HTTPS，做了点简单的 research 之后决定放在 LeanCloud 上（看了 LeanCloud 官方写的一个使用 [LeanCloud 做为数据存储的 TODOs demo](https://github.com/leancloud/leantodo-weapp)）。

## 升级到 v2
仓库中有两个分支，主要的**区别在于爬虫抓取数据存储的姿势不同**，所以导致前端获取数据的方式不同：

- **v1.x.x**：一条记录 = 一天的数据，包含二十条状态；
- **v2.x.x**：一条记录 = 一条状态的数据。

#### 改写爬虫的缘由
有这样一个场景，用户分享出去一条状态（一条精选的详情页），被分享的用户打开页面，这个时候需要首先去请求一整天的状态才能获得其中的目标数据。因为写 爬虫 v1 的时候没有考虑到这个情况，所以实际处理这个「先请求一天的数据，再从中取出一条数据」的代码当时写得很变扭。

所以，年底（2017年）想做点更新的时候，索性从爬虫开始全部做了修改，以至于前台的代码也做了很多更新，于是有了现在 2.0 版本。

## 感谢
- 鸣谢 Z 姐（[@小脸儿](https://github.com/zchan0)）制作的网站 logo（favicon）；
- 断断续续向 rex 大（[@.rex](https://fanfou.com/zhasm)）请教了不少问题，都耐心一一解答，👍；
- 之前在开发小程序过程中帮助测试反馈的各位小伙伴（奶瓶 @小小小奶瓶 同学发现了很多 bug，尤其感谢）。

## 相关 blog 文章
1. [笔记：「饭否精选」微信小程序（一）制作记录](http://movii.github.io/blog/2017/06/01/没能上线的小程序-饭否精选日历/)
2. [笔记：「饭否精选」微信小程序（二）爬虫部分](http://movii.github.io/blog/2017/06/15/fanfou-daily-wechat-log-scrapy/)
3. [笔记：「饭否精选」微信小程序（三）小程序开发中遇到的问题](http://movii.github.io/blog/2017/07/15/fanfou-daily-wechat-min-program/)

## License
MIT License
Copyright (c) 2018 Lien
