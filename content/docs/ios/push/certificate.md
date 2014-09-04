---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 制作iOS推送证书

![EaseMob icon](http://www.easemob.com/img/e_logo.png)

## 让您的APP支持推送消息,您需要对推送证书做些简单设置,步骤如下:

### 制作推送证书

#### 打开[苹果开发者网站](http://developer.apple.com/)

![developer.apple.com](/certificatePic/1.png "developer.apple.com")

#### 从Member Center进入*Certificates, Identifiers & Profiles*

![developer.apple.com](/certificatePic/2.png "developer.apple.com")

#### 选择要制作的推送证书

![developer.apple.com](/certificatePic/3.png "developer.apple.com")

对于开发环境(sandbox)的推送证书, 请选择 *Apple Push Notification service SSL (Sandbox)*  

对于生产环境(production)的推送证书, 请选择 *Apple Push Notification service SSL (Production)*

#### 选择对应的APP ID, 以ChatDemoUI为例, 此处我们选择*com.easemob.enterprise.demo.ui*

![developer.apple.com](/certificatePic/4.png "developer.apple.com")

#### 根据Certificate Assistant的提示, 创建Certificate Request

![developer.apple.com](/certificatePic/5.png "developer.apple.com")

#### 上传上一步中创建的Certificate Request文件

![developer.apple.com](/certificatePic/6.png "developer.apple.com")

#### 上传完毕后, 推送证书就被正确生成了, 之后我们下载下来这个证书, 并双击导入系统

![developer.apple.com](/certificatePic/7.png "developer.apple.com")

### 导出证书文件, 并上传到环信管理后台

#### 打开Application --> Utilities --> Keychain Access应用, 我们会看到有刚刚我们制作好的推送证书

![developer.apple.com](/certificatePic/8.jpg "developer.apple.com")

#### 选中证书对应的私钥(或者展开后选中证书), 点右键, 选择导出, 并设定密码

![developer.apple.com](/certificatePic/9.png "developer.apple.com")

### 在环信管理后台进行设置

#### 登陆[环信管理后台](http://console.easemob.com/)

![developer.apple.com](/certificatePic/10.png "developer.apple.com")

#### 输入了正确的账号后, 选择对应的APP, 仍以ChatDemoUI为例, 点击ChatDemoUI

![developer.apple.com](/certificatePic/11.png "developer.apple.com")

#### 填写的证书名称

这个名称是个有意义的名字, 对推送直接相关, 稍后会在源码的修改里继续用到这个名字. 上传之前导出的P12文件, 密码则为此P12文件的密码, 证书类型请根据具体情况选择

(创建的是Apple Push Notification service SSL Sandbox请选择*开发环境*; Apple Push Notification service SSL Production请选择*生产环境*), 

上传证书

![developer.apple.com](/certificatePic/12.png "developer.apple.com")

请注意正确选择是**生产环境**还是**测试环境**的证书

### 在APP源代码中进行最后的设置

#### 在调用`[[EaseMob sharedInstance] registerSDKWithAppKey:@"easemob-demo#chatdemoui" apnsCertName:apnsCertName];`的这句里, 把上面设置的证书名称传进来

#### 4.2. 编译, 运行