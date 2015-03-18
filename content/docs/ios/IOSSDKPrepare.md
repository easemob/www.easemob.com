---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# 集成前准备工作 {#iOS}
	
## 注册环信开发者账号 {#registerDeveloper}
请前往 [环信官方网站](http://www.easemob.com/ "环信官方网站") 注册开发者帐号。注册时，您需要提供真实的邮箱和手机号，以方便我们向您发送重要通知并在紧急时刻能够联系到您。如果您没有提供正确可用的邮箱和手机号，我们随时可能关闭您的应用。



## 创建应用 {#createApp}
创建应用，请登录[环信开发者中心](https://console.easemob.com/index.html "环信开发者中心"),如果还没有账号，请先注册环信开发者账号。

![ios_CreateApp icon](/iOS_CreateApp.png)

- **开放注册**:允许在该应用下自由注册新用户（如果是客户端执行注册，需要选择开放模式）
- **授权注册**:只有企业管理员或者应用管理员才能注册用户

![iOS_AppInfo icon](/iOS_AppInfo.png)

- **应用名称(appKey)**:由org_name和app_name组成 (org_name#app_name)。各app之间appKey隔离，不同appkey下账号，消息不能互通。
- **注册模式**:用于切换注册模式。(开放注册或授权注册,如果使用客户端注册，需要使用开发注册模式，否则将提示405错误)
- **client_id**: 提供给后台获取[token](http://www.easemob.com/docs/rest/userapi/#getadmintoken "获取token")使用。
- **client_secret**: 提供给后台获取[token](http://www.easemob.com/docs/rest/userapi/#getadmintoken "获取token")使用。
)
- **缩略图大小**:聊天时，发送图片时生成缩略图的分辨率，该值设置越大，服务器生成的缩略图越清晰。

	
> 注：在环信中，不同应用之间通过appKey隔离，不同appKey下的用户不能互通。所以登录用户前，请先确定appkey下是否存在这个用户。



##制作并上传推送证书 {#apnsCertificate}
    如果不需要实现离线推送功能，请忽略这步

###制作推送证书

* step1. 打开[苹果开发者网站](http://developer.apple.com/)

![developer.apple.com](/iOS_Apns_1.png "developer.apple.com")

* step2. 从Member Center进入*Certificates, Identifiers & Profiles*

![developer.apple.com](/iOS_Apns_2.png "developer.apple.com")

* step3. 选择要制作的推送证书

![developer.apple.com](/iOS_Apns_3.png "developer.apple.com")

对于开发环境(sandbox)的推送证书, 请选择 *Apple Push Notification service SSL (Sandbox)*  

对于生产环境(production)的推送证书, 请选择 *Apple Push Notification service SSL (Production)*

* step4. 选择对应的APP ID (环信示例使用ChatDemoUI， 所以此处选择*com.easemob.enterprise.demo.ui*)

![developer.apple.com](/iOS_Apns_4.png "developer.apple.com")

* step5. 根据Certificate Assistant的提示, 创建Certificate Request

![developer.apple.com](/iOS_Apns_5.png "developer.apple.com")

* step6. 上传上一步中创建的Certificate Request文件

![developer.apple.com](/iOS_Apns_6.png "developer.apple.com")

* step7. 上传完毕后, 推送证书就被正确生成了, 之后我们下载下来这个证书, 并双击导入系统

![developer.apple.com](/iOS_Apns_7.png "developer.apple.com")


### 上传推送证书

* step1. 打开Application --> Utilities --> Keychain Access应用, 我们会看到有刚刚我们制作好的推送证书

![developer.apple.com](/iOS_Apns_8.jpg "developer.apple.com")

* step2. 选中证书对应的私钥(或者展开后选中证书), 点右键, 选择导出, 并设定密码

![developer.apple.com](/iOS_Apns_9.png "developer.apple.com")

* step3. 登陆[环信管理后台](http://console.easemob.com/)

![developer.apple.com](/iOS_Apns_10.png "developer.apple.com")

* step4. 输入了正确的账号后, 选择对应的APP（环信示例为ChatDemoUI, 点击ChatDemoUI)

![developer.apple.com](/iOS_Apns_11.png "developer.apple.com")

* step5. 填写的证书名称

这个名称是个有意义的名字, 对推送直接相关, 稍后会在源码的修改里继续用到这个名字. 上传之前导出的P12文件, 密码则为此P12文件的密码, 证书类型请根据具体情况选择

(创建的是Apple Push Notification service SSL Sandbox请选择*开发环境*; Apple Push Notification service SSL Production请选择*生产环境*), 

* step6. 上传

![developer.apple.com](/iOS_Apns_12.png "developer.apple.com")

请注意正确选择是**生产环境**还是**测试环境**的证书
