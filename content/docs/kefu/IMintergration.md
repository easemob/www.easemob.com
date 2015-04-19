---
title: REST API 移动客服环信IM集成指南
secondnavkefu: true
sidebar: kefusidebar
---
## 移动客服环信IM集成指南 {#IMInt}

环信移动客服集成过程分为4步进行：如下图所示：

![集成步骤](/img/kefu/16.png)
<center>集成步骤</center>

具体操作如下：

1、	注册开发者账号：

登录环信开发者后台，注册环信开发者账号，申请Appkey，并且建立一个环信ID作为移动客服接入的服务号，具体的操作步骤参照如下文档：

[开发者入门](http://www.easemob.com/docs/gettingstart/#section-1/)

2、	集成IM并增加App端的客服入口：

下载环信Demo，参照环信Demo的源码集成环信单聊功能。

在app中提供访问客服系统的入口（例：新增一个按钮“联系客服”）

![增加客服入口](/img/kefu/18.png)
<center>增加客服入口</center>


入口中设置和一个已经创建的环信ID（服务号）进行会话，具体的操作步骤参照如下文档：

[集成IM系统](http://www.easemob.com/docs/gettingstart/#section-2)

3、	注册环信移动客服账号：

进入环信移动客服注册界面，注册环信移动客服账号，具体的操作步骤参照如下文档：

[注册环信移动客服账号](http://www.easemob.com/docs/kefu/#1112)

4、	设置关联：

在环信移动客服系统中设置关联信息，让移动客服系统与app中的客服入口信息进行匹配，具体的操作步骤参照如下文档：

[设置关联](http://www.easemob.com/docs/kefu/#1115)

关联设置以后，客户就可以通过app中的入口与客服会话，客服系统中可以创建多个客服代表，实现多个客户与多个客服进行会话，集成操作完成。  
