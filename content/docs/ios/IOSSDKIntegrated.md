---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# 导入IOS SDK {#iOS}
	在您阅读此文档时，我们假定您已经具备了基础的 iOS 应用开发经验，并能够理解相关基础概念。

## 下载SDK {#downloadSdk}

### 通过Cocoapods下载地址

	https://github.com/easemob/sdk-ios-cocoapods

### 直接下载

您可以到 [环信官方网站](http://www.easemob.com/sdk/ "环信iOSSDK下载链接")  下载环信 SDK。

到此您已经下载好了SDK，下面开始学习SDK的集成使用吧！

> 注: 由于iOS编译的特殊性，为了方便开发者使用，我们将i386 x86_64 armv7 armv7s arm64几个平台都合并到了一起，所以SDK的静态库(.a文件)比较大。实际集成编译出ipa后，根据调用功能的多少，实际只会增加2MB左右。	
	
## SDK目录讲解 {#explainSdk}

从官网上下载下来的包中分为如下四部分：

* 环信 iOS SDK 开发使用
* 环信 iOS release note 更新说明
* 环信 iOS UIDemo 工程源码
* 环信 iOS UIDemo.ipa 打包的ipa

IOS SDK中有三个子文件夹:include、lib、resources，请不要擅自修改这些文件夹的任何东西，下面依次介绍这三个子文件夹。

* **lib** 静态库，包含连个静态库libEaseMobClientSDK.a和libEaseMobClientSDKLite.a。libEaseMobClientSDKLite.a不包含实时语音功能，libEaseMobClientSDK.a包含所有功能。如果你的app中不需要实时语音功能，删掉libEaseMobClientSDK.a只使用libEaseMobClientSDKLite.a即可。
* **resources** sdk的bundle，包含旧版sdk的数据库、消息提示音，sdk配置文件。其中sdk配置文件已加密，旧版sdk数据库几乎没什么实质作用。
* **include** 包含sdk的头文件。

主要介绍下**include**，所有的接口都在这个文件夹中。

###include目录讲解 {#explainInclude}

* **EaseMobClientSDK/EaseMobClientSDKLite** 包含在项目中要引用的总头文件，即在代码中只需#import"EMSDKFull.h"或#import"EaseMob.h"即可调用所有对应的api。
* **CallService** 包含实时语音相关的接口
* **ChatService** 包含聊天相关的接口，比如注册、登录、退出、单聊、群聊、群组等
* **Utility** 包含DeviceManager和ErrorManager。DeviceManager硬件相关接口，ErrorManager错误码定义

具体接口讲解请转到[Apple Docs](http://www.easemob.com/docs/ios/apiDocs/IOSSDKAPIChatManager/)

> 注：
> 
>1. include包含5个子文件夹：CallService、ChatService、EaseMobClientSDK、EaseMobClientSDKLite、Utility。如果无需实时语音功能，将CallService和EaseMobClientSDK删掉即可。
>
>2. 类似EM@Manager命名格式的文件夹的内部结构都是相似的。delegates文件夹包含各种代理接口，internal文件夹包含各种协议的声明，types文件夹包含各种实例的声明。

## 配置工程 {#projectSetting}

### 1. 导入SDK {#importSdk}

将下载好的SDK文件夹(EaseMobSDK)拖入到项目中，并勾选上Destination

![iOS_ImportSDK icon](/iOS_ImportSDK.png)

### 2. 设置工程属性 {#project}

2.1. 向Build Phases -> Link Binary With Libraries 中添加依赖库
	
![iOS_AddFramework icon](/iOS_AddFramework.png)

SDK依赖库有

* MobileCoreServices.framework
* CFNetwork.framework
* libEaseMobClientSDKLite.a
* libsqlite3.dylib
* libstdc++.6.0.9.dylib
* libz.dylib
* libiconv.dylib
* libresolv.dylib
* libxml2.dylib

	

2.2. 向Build Settings -> Linking -> Other Linker Flags 中 添加-ObjC`(注意大小写)`

![iOS_OtherLinker icon](/iOS_OtherLinker.png)


2.3. 如果项目中使用-ObjC有冲突,可以添加-force_load来解决。

格式为: **-force_load[空格]EaseMobSDK/lib/libEaseMobClientSDKLite.a(静态库的路径)**

* step1. 先添加一个-force_load

![iOS_Force_load icon](/iOS_Force_load1.png)

* step2. 将静态库拖动到上一步添加的-force_load下面

![iOS_Force_load icon](/iOS_Force_load2.png)

* step3. 最终效果

![iOS_Force_load icon](/iOS_Force_load3.png)


##编译工程 {#projectBuild}

以上步骤进行完后，编译工程，如果没有报错，恭喜你，集成sdk成功，可以进行下一步了。