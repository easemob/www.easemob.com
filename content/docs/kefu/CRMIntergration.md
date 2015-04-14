---
title: REST API 集成指南
secondnavkefu: true
sidebar: kefusidebar
---
#集成指南
## 集成环信即时通讯系统 ##

集成环信移动客服系统之前首先要集成环信即时通讯系统（IM系统），集成的过程是注册开发者账号，下载环信的SDK，然后在app中集成该SDK，并添加一个客服的入口，实现客户可以通过对这个入口的访问和这个固定的环信ID进行会话。

集成环信的SDK等操作可以参照环信官网的文档进行，网址如下：

[环信即时通讯集成入门](http://www.easemob.com/docs/gettingstart/)

### 注册环信移动客服账号 ###
注册环信移动客服账号，注册地址[http://kefu.easemob.com/register](http://kefu.easemob.com/register)，进入该地址以后，输入公司名称、联系方式、账号和密码之后即可注册成功。

![注册界面](/img/kefu/1.bmp)
<center>注册环信移动客服账号</center>


输入以后，点击注册按钮，直接注册并登录系统。

注册后系统会进入操作指导页面，指导页面中有商城Demo的下载二维码，可以参照页面的提示下载商城Demo进行测试。

注：集成时也可以参照商城demo的模式进行集成，商城demo的源码地址如下：

安卓：[https://github.com/easemob/kefu-app-android](https://github.com/easemob/kefu-app-android)

IOS：[https://github.com/easemob/kefu-app-android](https://github.com/easemob/kefu-app-android)

## 设置关联 ##

  设置关联是在环信移动客服系统中设置该账号的客服系统和移动即时通讯系统之间的连接匹配，设置关联以后，通过已经集成在APP中的入口，客户就可以和客服代表进行会话交互。

  设置关联过程如下：

获得IM信息
配置关联之前需要先集成环信IM系统，设置时请进入环信开者中心（网址：[http://console.easemob.com](http://console.easemob.com)）如下图，点击需要集成到客服系统中的app应用名称。

![环信开发者中心](/img/kefu/5.png)
<center>环信管理后台</center>

 打开应用的详细信息，如下图：

![环信开发者中心](/img/kefu/6.jpg)
<center>App注册信息</center>


### 设置移动客服关联信息 ###

同时打开环信客服系统（网址：[http://kefu.easemob.com/](http://kefu.easemob.com/)），用管理员权限登录，登录以后点击左侧菜单，进入“设置——关联”界面，点击“新增关联”

![关联](/img/kefu/7.jpg)
<center>设置关联</center>

在弹出的新增关联窗口中填写关联信息，具体填写方法如下：

**关联名称**：填写公司或者建立关联的自定义名称

**AppKey：**填写详细信息图中AppKey的内容。

**ClientID：**填写详细信息图中client_id的内容。

**ClientSecret：**填写详细信息图中client_secret的内容。

**IM服务号码：**填写App中联系客服时访问的环信ID号码。

**IM Password：**填写IM服务号码对应的密码。

填写完毕以后，点击保存按钮，保存新增的关联，如果保存完毕以后显示为通过和启动状态，说明关联设置成功，否则就是存在问题，需要做修改，此处如果有问题请和环信联系。

![正确配置](/img/kefu/8.png)
<center>正确配置</center>

![正确配置](/img/kefu/9.png)
<center>错误配置</center>
 
关联配置完成以后，客户就可以通过app中的移动客服系统的入口和客服代表会话了，客服系统集成完成。