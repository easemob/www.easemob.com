---
title: 入门指南
secondnavgettingstart: true
sidebar: gettingstartsidebar
---

# 新手指引

集成环信非常简单，通常只需要几小时到几天时间。集成环信所需要的步骤如下：

1. 注册环信开发者账号
2. 将环信和现有APP的用户体系集成
3. 将环信和现有APP的好友体系集成（可选）
4. Android或iOS客户端集成


##  注册环信开发者账号

在环信官网上点击[注册](https://console.easemob.com/?comeFrom=easemobHome)，跳转到环信管理后台注册页面，如下图：

![alt text](/registericon.png "Title")


在注册页面中填写详细资料，如下图：

企业ID，只限于数字,字母,横线,且不能以横线开头和结尾。企业ID会存在于生成的APPKEY中，如：测试demo中 APPKEY为*easemob-demo#chatdemo*，则easemob-demo为填写的企业ID）

注：如果是个人应用开发的话，企业ID直接写成自己定义的ID就可以

![alt text](/consoleregister.png "Title")

点击注册，注册成功后，我们会向您填写的邮箱中发送验证信息，请前往邮箱进行账号激活。如下图：

![alt text](/email.png "Title")

账号激活成功后，回到控制台登录页面登录到开发者后台,在我的应用中，点击创建应用按钮，如下图：

![alt text](/consolehome.png "Title")

填写创建应用的名称(内容只限于数字，大小写字母)，如下图：

（应用名称会存在于你生成的APPKEY中，如：测试demo中 APPKEY为*easemob-demo#chatdemo*，则chatdemo为填写的应用名称。注册授权根据需要自行选择）

![alt text](/creatapp.png "Title")

填写好应用名称后，点确定，创建成功，系统会为你生成APPKEY以及相关配置信息，如下图：

![alt text](/appkey.png "Title")

###  2. 将环信和现有APP的用户体系集成

见**[集成用户体系文档](/docs/gettingstart/usersystem)**


###  3. 将环信和现有APP的好友体系集成

见**[集成好友体系文档](/docs/gettingstart/friendsystem)**


###  4. 客户端集成

####  4.1 [5分钟快速入门-android](/docs/android/quickstartUI)

####  4.2 [5分钟快速入门-iOS](/docs/ios/quickstart)
