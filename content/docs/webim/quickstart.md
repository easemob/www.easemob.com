---
title: WebIM 开发指南
sidebar: webimsidebar
secondnavwebim: true
---

# 快速入门  


## 下载环信demo (webIM) 

### 什么是环信WEB-IM demo 

环信WEB-IM demo展示了怎样使用环信WEB-IM-SDK快速创建一个完整的类微信网页聊天示例。展示的功能包括：登录，登出，操作好友、收发个人消息，群组消息。

环信WEB-IM源代码已在github上开源供开发者下载(https://github.com/easemob/web-im)，以帮助开发者更好的学习了解环信SDK。

### 下载环信WEB-IM-DEMO 

1. 下载环信WEB-IM及SDK： [下载](http://www.easemob.com/sdk/)

2. 解压缩WEB-IM.zip后会得到以下目录结构：
 
 ![alt text](/webIM_zip.png "Title")


## 运行环信WEB-IM 

运行之前，需要调整appkey，打开easymob-webim1.0目录中的index.html，找到

	appKey : 'easemob-demo#chatdemoui'

将这里的值做相应调整。

运行方式有两种：

1、直接使用浏览器打开index.html文件。

2、将easymob-webim1.0目录部署到web服务器通过url访问index.html。

## WEB-IM功能演示

功能操作页面如下：

登录：

登录可以使用app用户的账号和密码。 

![alt text](/webIM_zm.png "Title")

发送文本及表情消息：

![alt text](/webIM_emotion.png "Title")

发送图片消息页面：

![alt text](/webIM_mess.png "Title")

个人聊天页面：

![alt text](/webIM_page.png "Title")

群组聊天：

![alt text](/webIM_group.png "Title")

操作菜单：

![alt text](/webIM_bar.png "Title")

申请添加好友通知：

收到添加为好友请求通知，可以进行“同意”、“拒绝”处理，默认为双向添加互为好友。

![alt text](/webIM_notice.png "Title")

删除好友操作：

输入要删除的好友账号。

![alt text](/webIM_del.png "Title")

## WEB-IM功能说明

easemob webim sdk已支持如下功能：

1.sdk本身已支持IE10+、FireFox10+、Chrome15+、Safari6+之间文本、表情、图片、音频消息相互发送；低版本的浏览器只能收发文本消息。

2.sdk支持web端之间，web端与android端/IOS端相互添加、删除好友功能。

3.sdk支持与ios、android sdk之间相互发送文本、图片、音频、地址消息。

4.sdk提供的公共方法参见解压后sdk目录中的quickstart.md。

5.sdk对于消息的处理方式如下：

   1）文本消息，直接发送，接收方接收到为文本消息。

   2）表情消息，sdk得到表情对应的编码后，发送的文本消息，接收方接收到后处理根据编码还原表情。

   3）图片消息，sdk上传图片到聊天服务器，然后发送图片基本信息消息，消息中带有发送方上传的图片url等，接收方根据图片url、secret和自身的登录信息，以流的形式从服务器上下载图片到本地显示。

   4）音频消息，sdk上传音频到聊天服务器，然后发送音频基本消息消息，消息中含有发送方上传的音频url等，接收房根据音频url、secret和自身的登录信息，以流的形式从服务器上下载音频到本地播放。

6.提供demo，方便大家参考，已实现聊天添加/删除好友/群组功能。

7.目前各浏览器均已支持直接播放mp3，而amr格式则需要安装插件才能播放。另外，有的浏览器能够提供base64的下载，有的则不能。因此demo中音频这块的处理比较复杂：FF、Chrome收到后音频提供下载功能，IE浏览器只做提示。
