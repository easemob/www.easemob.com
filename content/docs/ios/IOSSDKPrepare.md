---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# 集成前准备工作 {#iOS}
	
## 注册环信开发者账号 {#registerDeveloper}

详细操作步骤见[入门指南](/docs/gettingstart/) 之 [注册环信开发者账号](/docs/gettingstart/#section-1)

## 创建应用 {#createApp}

详细操作步骤见[入门指南](/docs/gettingstart/) 之 [注册环信开发者账号](/docs/gettingstart/#section-1)

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
