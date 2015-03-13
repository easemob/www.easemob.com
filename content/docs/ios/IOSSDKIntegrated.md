---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# 集成SDK {#iOS}
	在您阅读此文档时，我们假定您已经具备了基础的 iOS 应用开发经验，并能够理解相关基础概念。

## 下载SDK {#downloadSdk}

### 通过Cocoapods下载地址

	https://github.com/easemob/sdk-ios-cocoapods

### 直接下载
您可以到 [环信官方网站](http://www.easemob.com/sdk/ "环信iOSSDK下载链接")  下载环信 SDK。

SDK 下载包中分为如下四部分：

* 环信 iOS SDK 开发使用这部分
* 环信 iOS SDK release note 更新说明
* 环信 iOS UIDemo 工程源码
* 环信 iOS UIDemo.ipa 打包的ipa

到此您已经下载好了SDK，下面开始学习SDK的集成使用吧！

	注: 由于iOS编译的特殊性，为了方便开发者使用，我们将i386 x86_64 armv7 armv7s arm64几个平台都合并到了一起，所以SDK的静态库(.a文件)比较大。
	实际集成编译出ipa后，根据调用功能的多少，实际只会增加2MB左右。	
	

##配置工程 {#projectSetting}

### 1.导入SDK {#importSdk}

将下载好的SDK文件夹(EaseMobSDK)拖入到项目中，并勾选上Destination

![iOS_ImportSDK icon](/iOS_ImportSDK.png)

### 2.设置工程属性 {#project}

2.1、向Build Phases -> Link Binary With Libraries 中添加依赖库
	
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

	

2.2、向Build Settings -> Linking -> Other Linker Flags 中 添加-ObjC`(注意大小写)`

![iOS_OtherLinker icon](/iOS_OtherLinker.png)


2.3、如果项目中使用-ObjC有冲突,可以添加-force_load来解决。

格式为: **-force_load[空格]EaseMobSDK/lib/libEaseMobClientSDKLite.a(静态库的路径)**

step1.先添加一个-force_load

![iOS_Force_load icon](/iOS_Force_load1.png)

step2.将静态库拖动到上一步添加的-force_load下面

![iOS_Force_load icon](/iOS_Force_load2.png)

step3.最终效果

![iOS_Force_load icon](/iOS_Force_load3.png)


##编译工程 {#projectBuild}
以上步骤进行完后，编译工程，如果没有报错，恭喜你，集成sdk成功，可以进行下一步了。