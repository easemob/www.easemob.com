---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# iOS 开发指南 {#iOS}
	在您阅读此文档时，我们假定您已经具备了基础的 iOS 应用开发经验，并能够理解相关基础概念。
	
## 注册开发者账号
请前往 [环信官方网站](http://www.easemob.com/ "环信官方网站") 注册开发者帐号。注册时，您需要提供真实的邮箱和手机号，以方便我们向您发送重要通知并在紧急时刻能够联系到您。如果您没有提供正确可用的邮箱和手机号，我们随时可能关闭您的应用。

## 下载SDK {#downloadsdk}
您可以到 [环信官方网站](http://www.easemob.com/sdk/ "环信iOSSDK下载链接")  下载环信 SDK。

SDK 下载包中分为如下四部分：

* 环信 iOS SDK 
* 环信 iOS SDK 更新说明
* 环信 iOS UIDemo 工程源码
* 环信 iOS UIDemo 打包的ipa

到此您已经下载好了SDK，下面开始学习SDK的集成使用吧！

	注: 由于iOS编译的特殊性，为了方便开发者使用，我们将i386 x86_64 armv7 armv7s arm64几个平台都合并到了一起，所以SDK的静态库(.a文件)比较大，实际集成编译出ipa后，根据调用功能的多少，实际只会增加2MB左右。	
	
## 创建应用 {#createappkey}
创建应用，请登录[环信开发者中心](https://console.easemob.com/index.html "环信开发者中心"),如果还没有账号，请先注册。

![ios_CreateApp icon](/iOS_CreateApp.png)

* 开放注册:允许在该应用下自由注册新用户（如果是客户端执行注册，需要选择开放模式）
* 授权注册:只有企业管理员或者应用管理员才能注册用户

![iOS_AppInfo icon](/iOS_AppInfo.png)

* 应用名称(appKey):由org_name和app_name组成 (org_name#app_name)。各app之间appKey隔离，不同appkey下账号，消息不能互通。
* 注册模式:用于切换注册模式。(开放注册或授权注册,如果使用客户端注册，需要使用开发注册模式，否则将提示405错误)
* client_id: 提供给后台获取[token](http://www.easemob.com/docs/rest/userapi/#getadmintoken "获取token")使用。
* client_secret: 提供给后台获取[token](http://www.easemob.com/docs/rest/userapi/#getadmintoken "获取token")使用。
)
* 缩略图大小:聊天时，发送图片时生成缩略图的分辨率，该值设置越大，服务器生成的缩略图越清晰。

_注意：在环信中，不同应用之间通过appKey隔离，不同appKey下的用户不能互通。所以登录用户前，请先确定appkey下是否存在这个用户。_


##上传推送证书 {#uploadp12}

[制作与上传推送证书](http://www.easemob.com/docs/ios/push/certificate/ "制作与上传推送证书")

##注意事项 {#attention}
	SDK 最低支持到iOS6.0。
	SDK 支持arm64 
	由于机制问题，SDK 比较大，真正打包后，只会使ipa增加2MB左右。


##集成演示 {#integrate}

### 1.创建项目 {#createapp}

创建一个新工程Test。

![iOS_CreateProject icon](/iOS_CreateProject.png)


将下载好的SDK文件夹(EaseMobSDK)拖入到项目中，并勾选上Destination

![iOS_ImportSDK icon](/iOS_ImportSDK.png)

### 2.集成SDK {#integratesdk}

向Build Phases -> Link Binary With Libraries 中添加依赖库
	
![iOS_AddFramework icon](/iOS_AddFramework.png)

必须添加的依赖库有

* MobileCoreServices.framework
* CFNetwork.framework
* libEaseMobClientSDKLite.a
* libsqlite3.dylib
* libstdc++.6.0.9.dylib
* libz.dylib
* libiconv.dylib
* libresolv.dylib
* libxml2.dylib


_* UIDemo中的依赖库因为还多了一些其他UI上的功能，需要添加的依赖库更多，具体请参考UIDemo。_

	

向Build Settings -> Linking -> Other Linker Flags 中 添加-ObjC`(注意大小写)`

![iOS_OtherLinker icon](/iOS_OtherLinker.png)



**注：如果项目中使用-ObjC有冲突,可以添加-force_load来解决;**

**格式为: -force_load[空格]EaseMobSDK/lib/libEaseMobClientSDKLite.a(静态库的路径)**

1.先添加一个-force_load
![iOS_Force_load icon](/iOS_Force_load1.png)

2.将静态库拖动到上一步添加的-force_load下面
![iOS_Force_load icon](/iOS_Force_load2.png)

3.最终效果
![iOS_Force_load icon](/iOS_Force_load3.png)

### 3.初始化SDK {#initsdk}
<span id="registerEaseMob">初始化环信SDK</span>
需要导入头文件 EaseMob.h

	- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    	[[EaseMob sharedInstance] registerSDKWithAppKey:@"douser#istore" apnsCertName:@"istore_dev"];
    	[[EaseMob sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    	return YES;
	}
	
	- (void)applicationWillResignActive:(UIApplication *)application
	{
    	[[EaseMob sharedInstance] applicationWillResignActive:application];
	}

	- (void)applicationDidEnterBackground:(UIApplication *)application
	{
    	[[EaseMob sharedInstance] applicationDidEnterBackground:application];
	}

	- (void)applicationWillEnterForeground:(UIApplication *)application
	{
	    [[EaseMob sharedInstance] applicationWillEnterForeground:application];
	}

	- (void)applicationDidBecomeActive:(UIApplication *)application
	{
    	[[EaseMob sharedInstance] applicationDidBecomeActive:application];
	}

	- (void)applicationWillTerminate:(UIApplication *)application
	{
    	[[EaseMob sharedInstance] applicationWillTerminate:application];
	}

	
* AppKey:  appKey,区别app的标识，对应上图中的 douser#istore
* APNSCertName:  APNSCertName，iOS中推送证书名称。[制作与上传推送证书](http://www.easemob.com/docs/ios/push/certificate/ "制作与上传推送证书")


环信为im部分提供了apns推送功能，如果您要使用，需要调用以下方法：

	 //iOS8 注册APNS
    if ([application respondsToSelector:@selector(registerForRemoteNotifications)]) {
        [application registerForRemoteNotifications];
        UIUserNotificationType notificationTypes = UIUserNotificationTypeBadge |
        UIUserNotificationTypeSound |
        UIUserNotificationTypeAlert;
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:notificationTypes categories:nil];
        [application registerUserNotificationSettings:settings];
    }else{
        UIRemoteNotificationType notificationTypes = UIRemoteNotificationTypeBadge |
        UIRemoteNotificationTypeSound |
        UIRemoteNotificationTypeAlert;
        [[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];
    }

您注册了推送功能，iOS 会自动回调以下方法，得到deviceToken，您需要将deviceToken传给SDK

	// 将得到的deviceToken传给SDK
	- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    	[[EaseMob sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
	}

	// 注册deviceToken失败
	- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    	[[EaseMob sharedInstance] application:application didFailToRegisterForRemoteNotificationsWithError:error];
	    NSLog(@"error -- %@",error);
	}


`apns注册失败，一般是由于使用了通用证书或者是模拟器调试导致，请检查证书并用真机调试。此处是iOS系统报的错，如仍不能确定，请从网上查找相关资料。`


### 4.EaseMobSDK讲解 {#analysissdk}

EaseMobSDK主要分为两部分，**IChatManager**目录和**IDeviceManager**两部分。

IChatManager部分主要提供各种聊天相关的函数，属性和回调。

IDeviceManager部分提供了各种硬件相关的函数，属性和回调。

SDK中提供了推送功能，推送功能主要为聊天提供支持；对推送分为两种，apns离线推送和本地推送。本地推送需要自己在收消息时自己实现。

以下会做出对应的描述

#### IChatManager internal 
* IChatManager.h 包含了SDK中**所有ChatManager相关的方法**
* IChatManagerBase.h IChatManager中所有internal的Base类（不需要关注）
* IChatManagerBuddy.h  提供了**好友管理**的所有方法
* IChatManagerChat.h   提供了**消息处理**的所有方法
* IChatManagerConversation.h  提供了**会话管理**的所有方法
* IChatManagerEncryption.h   提供了**消息加密相关**所有属性
* IChatManagerGroup.h   提供了**群组管理**的所有方法
* IChatManagerLogin.h   提供了**登录注册**的所有方法
* IChatManagerMedia.h   提供了**媒体消息**的所有方法
* IChatManagerPushNotification.h   提供了**推送管理**的所有方法
* IChatManagerSettingOptions.h   提供了**设置**的所有方法
* IChatManagerUtil.h SDK的工具类，  提供了SDK中**附件下载**等方法

__以上所有方法，都可以在IChatManager.h中找到__

#### IChatManager delegates
* IChatManagerDelegate.h	实现后可获得**所有IChatManager回调**
* EMChatManagerDelegate.h	实现后可获得**所有IChatManager回调**
* EMChatManagerDelegateBase.h  所有IChatManager回调的BaseDelegate(不需要关注)
* EMChatManagerBuddyDelegate.h	实现后可获得所有**好友相关回调**
* EMChatManagerChatDelegate.h	实现后可获得所有**聊天相关回调**
* EMChatManagerEncryptionDelegate.h 实现后可获得所有**加密回调**
* EMChatManagerGroupDelegate.h 实现后可获得所有**群组相关回调**
* EMChatManagerLoginDelegate.h 实现后可获得所有**注册登录相关回调**
* EMChatManagerMediaDelegate.h 实现后可获得所有**媒体相关回调**
* EMChatManagerPushNotificationDelegate.h 实现后可获得所有**推送相关回调**
* EMChatManagerUtilDelegate.h 实现后可获的所有**附件下载相关回调**

__以上所有回调都可以通过IChatManagerDelegate.h找到__

#### IDeviceManager internal
* IDeviceManager.h 包含了Device相关的**所有方法**
* IDeviceManagerBase.h EMDeviceManager中，所有internal的Base类（不需要关注）
* IDeviceManagerCamera.h 包含了**检测相机**等方法
* IDeviceManagerDevice.h 包含了**device**的方法
* IDeviceManagerLocation.h 包含了**获取位置**等方法
* IDeviceManagerMedia.h 包含了**媒体管理**等方法
* IDeviceManagerProximitySensor.h 包含了**传感器管理**等方法

__以上所有方法，都可以在IDeviceManager.h中找到__

#### IDeviceManager delegates

*	IDeviceManagerDelegate.h	实现后可以收到**所有IDeviceManager回调**
* 	EMDeviceManagerDelegate.h 	实现后可以收到**所有IDeviceManager回调**
* 	EMDeviceManagerDelegateBase.h 		所有EMDeviceManager回调的BaseDelegate(不需要关注)
* 	EMDeviceManagerLocationDelegate.h 	实现后可以收到**位置相关**回调
* 	EMDeviceManagerMediaDelegate.h 		实现后可以收到**媒体相关**回调
* 	EMDeviceManagerNetworkDelegate.h 	实现后可以收到**网络变化**回调
* 	EMDeviceManagerProximitySensorDelegate.h 实现后可以收到**传感器变化**回调

__以上所有回调，都可以通过实现IDeviceManagerDelegate.h找到__


## 5.EaseMobSDK 使用示例 {#usesdk}


在EaseMobSDK中，大部分与**网络有关的操作**，都提供了3种调用方法

* 同步方法
* 通过delegate回调的异步方法(以注册用户中代码为例)
* block异步方法

### 5.1 注册登录 {#registerandLogin}

#### 5.1.1 注册 {#register}

客户端注册是为了测试使用，`正式环境中不推荐使用该方式注册环信账号`，注册的流程应该是您服务器通过环信提供的[rest api](http://www.easemob.com/docs/rest/userapi/#im)注册，之后保存到您的服务器或返回给客户端。

注册模式分两种，开放注册和授权注册。只有开放注册时，才可以客户端注册。

注册提供了三种方法。

1、同步方法

	EMError *error = nil;
    BOOL isSuccess = [[EaseMob sharedInstance].chatManager registerNewAccount:@"8001" password:@"111111" error:&error];
    if (isSuccess && !isSuccess) {
        NSLog(@"注册成功");
    }
    
2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncRegisterNewAccount:@"8001" password:@"111111" withCompletion:^(NSString *username, NSString *password, EMError *error) {
        if (!error) {
            NSLog(@"注册成功");
        }
    } onQueue:nil];
    
3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    	// 注册8001到douser#istore这个appkey下。
    	[[EaseMob sharedInstance].chatManager asyncRegisterNewAccount:@"8001" password:@"111111"];
    
	}

	-(void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didRegisterNewAccount:(NSString *)username password:(NSString *)password error:(EMError *)error{
	    if (!error) {
        	NSLog(@"注册成功");
    	}
	}

	// 向SDK中注册回调
	-(void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	-(void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

#### 5.1.2 登录 集成SDK {#login}
登录提供了三种方法。

1、同步方法：
 
	EMError *error = nil;
    NSDictionary *loginInfo = [[EaseMob sharedInstance].chatManager loginWithUsername:@"8001" password:@"111111" error:&error];
    if (!error && loginInfo) {
        NSLog(@"登陆成功");
    }

2、block异步方法

	[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111" completion:^(NSDictionary *loginInfo, EMError *error) {
        if (!error && loginInfo) {
            NSLog(@"登陆成功");
        }
    } onQueue:nil];

3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	    // 登录
    	[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111"];
	}


	-(void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error{
    	if (!error && loginInfo) {
        	NSLog(@"登录成功");
	    }
	}

	// 向SDK中注册回调
	-(void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
	    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	-(void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


#### 5.1.3 自动登录 {#autologin}

自动登录：`即首次登录成功后，不需要再次调用登录方法，再下次app启动时，SDK会自动为您登录。并且如果您再自动登录时登录失败，也可以读取到之前的会话信息。`

SDK中缺省自动登录是没有打开的，需要您在登录成功后设置，以便您在下次app启动时不需要再次调用环信登录，并且能在没有网的情况下得到会话列表。

    BOOL isAutoLogin = [[EaseMob sharedInstance].chatManager isAutoLoginEnabled];
    if (!isAutoLogin) {
        [[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111" completion:^(NSDictionary *loginInfo, EMError *error) {
            if (!error) {
                // 设置自动登录
                /*
                 此属性如果被设置为YES, 会在以下几种情况下被重置为NO:
                 1. 用户发起的登出动作;
                 2. 用户在别的设备上更改了密码, 导致此设备上自动登陆失败;
                 3. 用户的账号被从服务器端删除;
                 4. 用户从另一个设备把当前设备上登陆的用户踢出.
                 */
                [[EaseMob sharedInstance].chatManager setIsAutoLoginEnabled:YES];
            }
        } onQueue:nil];
    }
自动登录在以下几种情况下会被取消

1. 用户发起的登出动作;
2. 用户在别的设备上更改了密码, 导致此设备上自动登陆失败;
3. 用户的账号被从服务器端删除;
4. 用户从另一个设备把当前设备上登陆的用户踢出.

所以，在您调用登录方法前，应该先判断是否设置了自动登录，如果设置了，则不需要您再调用。

SDK中，如果发生自动登录，会有以下回调:

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
    	BOOL isAutoLogin = [[EaseMob sharedInstance].chatManager isAutoLoginEnabled];
	    if (!isAutoLogin) {
    	    [[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111" completion:^(NSDictionary *loginInfo, EMError *error) {
        	    if (!error) {
            	    // 设置自动登录
                	/*
	                 此属性如果被设置为YES, 会在以下几种情况下被重置为NO:
    	             1. 用户发起的登出动作;
        	         2. 用户在别的设备上更改了密码, 导致此设备上自动登陆失败;
            	     3. 用户的账号被从服务器端删除;
                	 4. 用户从另一个设备把当前设备上登陆的用户踢出.
	                 */
    	            [[EaseMob sharedInstance].chatManager setIsAutoLoginEnabled:YES];
        	    }
	        } onQueue:nil];
    	}
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 将要开始自动登录
	- (void)willAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error{
    
	}

	// 自动登录结束
	- (void)didAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error{
    	if (!error) {
        	NSLog(@"登录成功");
	    }
	}

	// 向sdk中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消sdk中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

####  5.1.4 重连 {#autoconnect}

目前iOS SDK的心跳频率是180秒一次，当您与环信的服务器断开后，以下几种情况会重连：

1.	每隔180秒心跳时，SDK会尝试重连。
2.	您当前网络状态变化时，SDK会尝试重连。

自动重连，有以下回调

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 将要开始自动重连
	-(void)willAutoReconnect{

	}	

	// 自动重连结束
	-(void)didAutoReconnectFinishedWithError:(NSError *)error{
    	if (!error) {
        	NSLog(@"重连成功");
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


### 5.2 好友管理 {#buddy}

当SDK初始化时，您可以设置是否由SDK主动帮您获取好友，如果未设置，需要您自己调用获取方法获取。

	// 登录成功后，自动去取好友列表
    // SDK获取结束后，会回调
    // - (void)didFetchedBuddyList:(NSArray *)buddyList error:(EMError *)error方法。
    [[EaseMob sharedInstance].chatManager setIsAutoFetchBuddyList:YES];

#### 5.2.1 获取好友列表 {#getbuddylist}

虽然环信本身不需要加好友就可以聊天，但是环信中提供了好友关系。该部分不是必须使用的，如果你有自己的好友关系，则不需要使用环信的。

获取好友列表，环信提供了四种方法。

1、同步方法

    EMError *error = nil;
    NSArray *buddyList = [[EaseMob sharedInstance].chatManager fetchBuddyListWithError:&error];
    if (!error) {
        NSLog(@"获取成功 -- %@",buddyList);
    }

2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncFetchBuddyListWithCompletion:^(NSArray *buddyList, EMError *error) {
        if (!error) {
            NSLog(@"获取成功 -- %@",buddyList);
        }
    } onQueue:nil];

3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	    // 获取好友列表
    	[[EaseMob sharedInstance].chatManager asyncFetchBuddyList];
	}

	-(void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didFetchedBuddyList:(NSArray *)buddyList error:(EMError *)error{
    	if (!error) {
        	NSLog(@"获取成功 -- %@",buddyList);
	    }
	}

	// 向SDK中注册回调
	-(void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	-(void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

4、取内存中的值

该方法比较特殊，只有在您之前获取过好友列表的情况下才会有值，且不能保证最新。

	NSArray *buddyList = [[EaseMob sharedInstance].chatManager buddyList];


#### 5.1.2 添加好友 {#addbuddy}

环信iOS SDK提供了添加好友的方法

如果您已经发过，并且对方没有处理，您将不能再次发送

    BOOL isSuccess = [[EaseMob sharedInstance].chatManager addBuddy:@"6001" message:@"我想加您为好友" error:&error];
    if (isSuccess && !error) {
        NSLog(@"添加成功");
    }


#### 5.1.3 收到好友请求 {#receiverbuddyrequest}

当您收到好友请求，如果您没有处理，则您每次登录的时候，服务器都会给你发该请求,所以，请保证您监听回调的类和您的app一直初始化，否则可能会监听不到您离线时别人给你发的好友请求。

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 收到好友请求后回调
	-(void)didReceiveBuddyRequest:(NSString *)username message:(NSString *)message{
    
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


#### 5.2.4 处理好友请求 {#handlebuddyrequest}

##### 5.2.4.1 同意好友申请

    EMError *error = nil;
    BOOL isSuccess = [[EaseMob sharedInstance].chatManager acceptBuddyRequest:@"8001" error:&error];
    if (isSuccess && !error) {
        NSLog(@"发送同意成功");
    }

##### 5.2.5.2 拒绝好友申请

    EMError *error = nil;
    BOOL isSuccess = [[EaseMob sharedInstance].chatManager rejectBuddyRequest:@"8001" reason:@"111111" error:&error];
    if (isSuccess && !error) {
        NSLog(@"发送拒绝成功");
    }
    
####  5.2.5 好友申请处理结果回调 {#handlebuddyresponse}

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	/*!
	 @method
	 @brief 好友请求被接受时的回调
	 @discussion
	 @param username 之前发出的好友请求被用户username接受了
	 */
	- (void)didAcceptedByBuddy:(NSString *)username{
    	NSLog(@"%@同意了您的好友请求",username);
	}

	/*!
	 @method
	 @brief 好友请求被拒绝时的回调
	 @discussion
	 @param username 之前发出的好友请求被用户username拒绝了
	 */
	- (void)didRejectedByBuddy:(NSString *)username{
    	NSLog(@"%@拒绝了您的好友请求",username);
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
	    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end	

####  5.2.6 删除好友 {#removebuddy}

    EMError *error = nil;
    // 删除好友
    BOOL isSuccess = [[EaseMob sharedInstance].chatManager removeBuddy:@"6001" removeFromRemote:YES error:&error];
    if (isSuccess && !error) {
        NSLog(@"删除成功");
    }
    
*	removeBuddy:要删除的用户
*	removeFromRemote:是否将自己从对方好友列表中移除
*	error:错误信息

### 5.3 黑名单 {#blocklist}

环信的黑名单体系是独立的，与好友无任何关系。也就是说，您可以将任何人加入黑名单，不论他是否与您是好友关系。同时，如果您将好友好友加入黑名单，则他仍然是您的好友，只不过同时也在黑名单中。

黑名单的类型(EMRelationship)有三种，其中，两种可用。

	typedef enum{
    	eRelationshipBoth  = 0, 		双向都不接受消息；
	    eRelationshipFrom,				能给黑名单中的人发消息，接收不到黑名单中的人发的消息;
    	eRelationshipTo,				暂不支持;
	}EMRelationship;


#### 5.3.1 查询黑名单列表 {#searchblocklist}

查询黑名单列表，环信提供了四种方法。

1、同步方法

	EMError *error = nil;
    NSArray *blockedList = [[EaseMob sharedInstance].chatManager fetchBlockedList:&error];
    if (!error) {
        NSLog(@"获取成功 -- %@",blockedList);
    }
	
2、block回调方法

	[[EaseMob sharedInstance].chatManager asyncFetchBlockedListWithCompletion:^(NSArray *blockedList, EMError *error) {
        if (!error) {
            NSLog(@"获取成功 -- %@",blockedList);
        }
    } onQueue:nil];

3、IChatManagerDelegate回调方法

		//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
	    [super viewDidLoad];
    	[self registerEaseMobDelegate];
    
	    // 获取黑名单
    	[[EaseMob sharedInstance].chatManager asyncFetchBlockedList];
	}


	- (void)didReceiveMemoryWarning {
	    [super didReceiveMemoryWarning];
    	// Dispose of any resources that can be recreated.
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didUpdateBlockedList:(NSArray *)blockedList{
    	NSLog(@"获取成功 -- %@",blockedList);
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

4、取内存中的值

该方法比较特殊，只有在您之前获取过黑名单列表的情况下才会有值，且不能保证最新。

	 NSArray *blockedList = [[EaseMob sharedInstance].chatManager blockedList];
	 
#### 5.3.2	添加黑名单 {#addblock}

当您执行添加黑名单时，该用户并不会从好友列表中移除。

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    	//	将6001加入黑名单
    	EMError *error = [[EaseMob sharedInstance].chatManager blockBuddy:@"6001" 	relationship:eRelationshipBoth];
    	if (!error) {
        	NSLog(@"发送成功");
	    }
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	- (void)didBlockBuddy:(EMBuddy *)buddy error:(EMError **)pError{
    	if (!pError) {
	        NSLog(@"添加成功");
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

#### 5.3.3	移出黑名单 {#removeblock}

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    	// 将6001移除黑名单
	    EMError *error = [[EaseMob sharedInstance].chatManager unblockBuddy:@"6001"];
	    if (!error) {
    	    NSLog(@"发送成功");
	    }
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	- (void)didUnblockBuddy:(EMBuddy *)buddy error:(EMError **)pError{
    	if (!pError) {
        	NSLog(@"移除成功");
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


### 5.4 群组 {#group}

群组分为两大类，四小类

	typedef enum{
		// 私有群组，不能被非群组成员看到
		eGroupStyle_PrivateOnlyOwnerInvite = 0,  // 只有创建者可以邀请非成员进群
	    eGroupStyle_PrivateMemberCanInvite,	// 所有群成员都可以邀请非成员进群
	    // 共有群组，可通过查看所有共有群组得到
    	eGroupStyle_PublicJoinNeedApproval,	// 需要创建者同意才能进入(创建者可以邀请非成员进群)
	    eGroupStyle_PublicOpenJoin,				// 不需要同意可以直接进入()
	    eGroupStyle_Default = eGroupStyle_PrivateOnlyOwnerInvite,
	}EMGroupStyle;


#### 5.4.1	查看公开群 {#searchpublicgroup}

获取公开群，提供了三种方法

1、同步方法

	EMError *error = nil;
    NSArray *publicGroupList = [[EaseMob sharedInstance].chatManager fetchAllPublicGroupsWithError:&error];
    if (!error) {
        NSLog(@"获取成功 -- %@",publicGroupList);
    }

2、block异步方法

	[[EaseMob sharedInstance].chatManager asyncFetchAllPublicGroupsWithCompletion:^(NSArray *groups, EMError *error) {
        if (!error) {
            NSLog(@"获取成功 -- %@",groups);
        }
    } onQueue:nil];
    
3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
    	// 查看所有公开群组
	    [[EaseMob sharedInstance].chatManager asyncFetchAllPublicGroups];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didFetchAllPublicGroups:(NSArray *)groups error:(EMError *)error{
    	if (!error) {
	        NSLog(@"获取成功 -- %@",groups);
    	}
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end	


#### 5.4.2	查看已加入群组  {#fetchmygrouplist}

查看所有当前登录账号所在群组，提供了五种方法

1、同步方法

	EMError *error = nil;
    NSArray *myGroups = [[EaseMob sharedInstance].chatManager fetchMyGroupsListWithError:&error];
    if (!error) {
        NSLog(@"获取成功 -- %@",myGroups);
    }


2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncFetchMyGroupsListWithCompletion:^(NSArray *groups, EMError *error) {
        if (!error) {
            NSLog(@"获取成功 -- %@",groups);
        }
    } onQueue:nil];
	
3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
    	[[EaseMob sharedInstance].chatManager asyncFetchMyGroupsList];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	/*!
	 @method
	 @brief 群组列表变化后的回调
	 @param groupList 新的群组列表
	 @param error     错误信息
	 */
	- (void)didUpdateGroupList:(NSArray *)groupList
                     error:(EMError *)error{
	    if (!error) {
        	NSLog(@"获取成功 -- %@",groupList);
    	}
	}
	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


4、取db中的值，该方法取到的不一定是最新的。

	    NSArray *groupList = [[EaseMob sharedInstance].chatManager loadAllMyGroupsFromDatabase];
	    
5、取内存中的值

该方法比较特殊，只有在您之前获取过群组列表的情况下才会有值，且不能保证最新。

    NSArray *groupList = [[EaseMob sharedInstance].chatManager groupList];	
    
#### 5.4.3	创建群组 {#creategroup}

目前群组支持的属性有:

1.	群名称
2.	群描述
3.	群人数（不支持修改，目前上限为2000人）
4.	群类型（即上面提到的四种群组类型）

创建群组，提供了三种方法

1、同步方法

    EMError *error = nil;
    EMGroupStyleSetting *groupStyleSetting = [[EMGroupStyleSetting alloc] init];
    groupStyleSetting.groupMaxUsersCount = 500; // 创建500人的群，如果不设置，默认是200人。
    groupStyleSetting.groupStyle = eGroupStyle_PublicOpenJoin; // 创建不同类型的群组，这里需要才传入不同的类型
    EMGroup *group = [[EaseMob sharedInstance].chatManager createGroupWithSubject:@"群组名称" description:@"群组描述" invitees:@[@"6001",@"6002"] initialWelcomeMessage:@"邀请您加入群组" styleSetting:groupStyleSetting error:&error];
    if(!error){
        NSLog(@"创建成功 -- %@",group);
    }

2、block异步方法

	EMGroupStyleSetting *groupStyleSetting = [[EMGroupStyleSetting alloc] init];
    groupStyleSetting.groupMaxUsersCount = 500; // 创建500人的群，如果不设置，默认是200人。
    groupStyleSetting.groupStyle = eGroupStyle_PublicOpenJoin; // 创建不同类型的群组，这里需要才传入不同的类型
    [[EaseMob sharedInstance].chatManager asyncCreateGroupWithSubject:@"群组名称" description:@"群组描述" invitees:@[@"6001",@"6002"] initialWelcomeMessage:@"邀请您加入群组" styleSetting:groupStyleSetting completion:^(EMGroup *group, EMError *error) {
        if(!error){
            NSLog(@"创建成功 -- %@",group);
        }        
    } onQueue:nil];

3、IChatManagerDelegate 回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
    	EMGroupStyleSetting *groupStyleSetting = [[EMGroupStyleSetting alloc] init];
	    groupStyleSetting.groupMaxUsersCount = 500; // 创建500人的群，如果不设置，默认是200人。
    	groupStyleSetting.groupStyle = eGroupStyle_PublicOpenJoin; // 创建不同类型的群组，这里需要才传入不同的类型
	    [[EaseMob sharedInstance].chatManager asyncCreateGroupWithSubject:@"群组名称" description:@"群组描述" invitees:@[@"6001",@"6002"] initialWelcomeMessage:@"邀请您加入群组" styleSetting:groupStyleSetting];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)group:(EMGroup *)group didCreateWithError:(EMError *)error{
    	if (!error) {
        	NSLog(@"创建成功");
	    }
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


#### 5.4.4	申请加入群组（公开群） {#applypublicgroup}

只有公开群才能申请加入

_公开群，既创建时，类型为eGroupStyle_PublicJoinNeedApproval,或者eGroupStyle_PublicOpenJoin_

##### 5.4.4.1 申请加入不需要同意的群组（eGroupStyle_PublicOpenJoin）


申请加入群组，提供了三个方法

1、同步方法

	EMError *error = nil;
    [[EaseMob sharedInstance].chatManager joinPublicGroup:@"1410329312753" error:&error];
    if (!error) {
        NSLog(@入群成功");
    }


2、block回调方法

    EMError *error = nil;
    [[EaseMob sharedInstance].chatManager asyncJoinPublicGroup:@"1410329312753" completion:^(EMGroup *group, EMError *error) {
        if (!error) {
            NSLog(@"入群成功");
        }
    } onQueue:nil];
	
3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    	// 加入群组
	    [[EaseMob sharedInstance].chatManager asyncJoinPublicGroup:@"1410329312753"];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didJoinPublicGroup:(EMGroup *)group error:(EMError *)error{
    	if (!error) {
        	NSLog(@"入群成功");
	    }
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

##### 5.4.4.2 申请加入需要同意的群组（eGroupStyle_PublicJoinNeedApproval）

同样我们提供了三种方法

1、同步方法

    EMError *error = nil;
    // 申请加入需要审核的公开群组
    [[EaseMob sharedInstance].chatManager applyJoinPublicGroup:@"1410329312753" withGroupname:@"群组名称" message:@"申请信息" error:&error];
	if (!error) {
		NSLog(@"申请成功");
	}


2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncApplyJoinPublicGroup:@"1410329312753" withGroupname:@"群组名称" message:@"申请信息" completion:^(EMGroup *group, EMError *error) {
        if (!error) {
            NSLog(@"申请成功");
        }
    } onQueue:nil];
	
3、IChatManagerDelegate回调方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
    	
	    [[EaseMob sharedInstance].chatManager asyncApplyJoinPublicGroup:@"1410329312753" withGroupname:@"群组名称" message:@"申请信息"];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didApplyJoinPublicGroup:(EMGroup *)group error:(EMError *)error{
    	if (!error) {
        	NSLog(@"申请成功");
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

#### 5.4.5	处理申请（公开群） {#handlepublicgrouprequest}

##### 5.4.5.1	收到申请回调

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	/*!
	 @method
	 @brief 收到加入群组的申请
	 @param groupId         要加入的群组ID
	 @param groupname       申请人的用户名
	 @param username        申请人的昵称
	 @param reason          申请理由
	 @discussion
	 */
	- (void)didReceiveApplyToJoinGroup:(NSString *)groupId
                         groupname:(NSString *)groupname
                     applyUsername:(NSString *)username
                            reason:(NSString *)reason
                             error:(EMError *)error{
    	NSLog(@"收到加群申请，申请的群组id:%@ -- 群组名称:%@ -- 申请人:%@, -- 申请理由:%@",groupId,groupname,username,reason);
	}
	
	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

##### 5.4.5.1	同意申请（公开群）

同意申请提供了三种方法

1、同步方法

    EMError *error = nil;
    [[EaseMob sharedInstance].chatManager acceptApplyJoinGroup:@"1410329312753" groupname:@"群组名称" applicant:@"8001" error:&error];
    if (!error) {
        NSLog(@"发送同意成功");
    }


2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncAcceptApplyJoinGroup:@"1410329312753" groupname:@"群组名称" applicant:@"8001" completion:^(EMError *error) {
        if (!error) {
            NSLog(@"发送同意成功");
        }
        
    } onQueue:nil];
    
3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
    	[[EaseMob sharedInstance].chatManager asyncAcceptApplyJoinGroup:@"1410329312753" groupname:@"群组名称" applicant:@"8001"];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate

	/*!
	 @method
	 @brief 同意入群申请后，同意者收到的回调
	 @param groupId         申请加入的群组的ID
	 @param username        申请加入的username
	 @param error           错误信息
	 */
	-(void)didAcceptApplyJoinGroup:(NSString *)groupId username:(NSString *)username error:(EMError *)error{
    	if (!error) {
        	NSLog(@"同意加入%@群",groupId);
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


##### 5.4.5.2	拒绝申请（公开群）

	[[EaseMob sharedInstance].chatManager rejectApplyJoinGroup:@"1410329312753" groupname:@"群组名称" toApplicant:@"8001" reason:@"拒绝原因"];

#### 5.4.6	邀请加入群组（私有群） {#invitationprivategroup}

私有群邀请，邀请后对方会直接进群。

提供了三种邀请方法

1、同步方法

    EMError *error = nil;
    // 发送邀请
    [[EaseMob sharedInstance].chatManager addOccupants:@[@"6001",@"6002"] toGroup:@"1410329312753" welcomeMessage:@"邀请信息" error:&error];
    if (!error) {
        NSLog(@"发送邀请成功");
    }
2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncAddOccupants:@[@"6001",@"6002"] toGroup:@"1410329312753" welcomeMessage:@"邀请信息"  completion:^(NSArray *occupants, EMGroup *group, NSString *welcomeMessage, EMError *error) {
        if (!error) {
            NSLog(@"发送邀请成功");
        }
    } onQueue:nil];
    
3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
    	// 发送邀请
	    [[EaseMob sharedInstance].chatManager asyncAddOccupants:@[@"6001",@"6002"] toGroup:@"1410329312753" welcomeMessage:@"邀请信息"];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate

	-(void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error{
    	if (!error) {
        	NSLog(@"发送邀请成功");
	    }
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


#### 5.4.7	群邀请回调（私有群/公有群） {#invitationrequest}

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	/*!
	 @method
	 @brief 接受群组邀请后的回调
	 @param group 所接受的群组
	 @param error 错误信息
	 */
	-(void)didAcceptInvitationFromGroup:(EMGroup *)group error:(EMError *)error{
    	NSLog(@"收到群组邀请 -- %@",group);
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

#### 5.4.8	退出群组 {#exitgroup}

退出群组，如果是群成员调用，则为成员离开，如果是创建者离开，则视为群组解散

退出群组，提供了三种调用方法

1、同步方法

    EMError *error = nil;
    [[EaseMob sharedInstance].chatManager leaveGroup:@"1410329312753" error:&error];
    if (!error) {
        NSLog(@"退出群组成功");
    }
    
2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncLeaveGroup:@"1410329312753" completion:^(EMGroup *group, EMGroupLeaveReason reason, EMError *error) {
        if (!error) {
            NSLog(@"退出群组成功");
        }
    } onQueue:nil];
    
3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
	    [[EaseMob sharedInstance].chatManager asyncLeaveGroup:@"1410329312753"];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)group:(EMGroup *)group didLeave:(EMGroupLeaveReason)reason error:(EMError *)error{
    	if (!error) {
        	NSLog(@"退出成功");
	    }
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end
	
#### 5.4.9 解散群组（需要有群主权限） {#destroygroup}

解散群组提供了三种方法

1、同步方法
	
    EMError *error = nil;
    [[EaseMob sharedInstance].chatManager destroyGroup:group.groupId error:&error];
    if (!error) {
        NSLog(@"解散成功");
    }
    
2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncDestroyGroup:group.groupId completion:^(EMGroup *group, EMGroupLeaveReason reason, EMError *error) {
        if (!error) {
            NSLog(@"解散成功");
        }
    } onQueue:nil];
    
3、IChatManagerDelegate异步方法

	//
	//  TestViewController.m
	//  Test
	//
	//  Created by dujiepeng on 1/6/15.
	//  Copyright (c) 2015 dujiepeng. All rights reserved.
	//

	#import "TestViewController.h"
	#import "EaseMob.h"

	@interface TestViewController ()<IChatManagerDelegate>
	{
    	EMGroup *group;
	}
	@property (nonatomic) id<IChatManager> chatManager;
	@property (nonatomic, strong) EMGroup *currentGroup;
	@end

	@implementation TestViewController

	-(void)viewDidLoad{
    	[self registerEaseMobDelegate];
    
	    // 本例中，没有为group对象赋值，需要您根据您实际的业务为它赋值，此处需要groupid
    	[[EaseMob sharedInstance].chatManager asyncDestroyGroup:group.groupId];
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[self.chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[self.chatManager removeDelegate:self];
	}


	#pragma mark - IChatManagerDelegate
	-(void)group:(EMGroup *)group didLeave:(EMGroupLeaveReason)reason error:(EMError *)error{
	    if (!error && reason == eGroupLeaveReason_Destroyed) {
    	    NSLog(@"解散成功");
	    }
	}
	@end


#### 5.4.10	更改群属性 {#changegroupinfo}

SDK中提供了修改群名称或者群描述的方法。只有创建者可以修改，修改后不会主动通知群成员。

##### 5.4.10.1 更改群名称

1、同步方法

    EMError *error = nil;
    // 修改群名称
    EMGroup *group = [[EaseMob sharedInstance].chatManager changeGroupSubject:@"要修改的名称" forGroup:@"1410329312753" error:&error];
    if (!error) {
        NSLog(@"修改成功");
    }
    
2、block异步方法

    // 修改群名称
    [[EaseMob sharedInstance].chatManager asyncChangeGroupSubject:@"要修改的群名称" forGroup:@"1410329312753" completion:^(EMGroup *group, EMError *error) {
        if (!error) {
            NSLog(@"修改成功");
        }
    } onQueue:nil];

3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    
	    [[EaseMob sharedInstance].chatManager asyncChangeGroupSubject:@"要修改的群名称" 	forGroup:@"1410329312753"];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	/*!
	 @method
	 @brief 群组信息更新后的回调
	 @param group 发生更新的群组
	 @param error 错误信息
	 @discussion
	 当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调
	 */
	-(void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error{
	    if (!error) {
    	    NSLog(@"修改成功");
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
	    // 此处先取消一次，是为了保证只将self注册过一次回调。
    	[self unRegisterEaseMobDelegate];
	    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

##### 5.4.10.2 更改群描述

提供了三种方法

1、同步方法

    EMError *error = nil;
    // 修改群描述
    [[EaseMob sharedInstance].chatManager changeDescription:@"修改的群描述" forGroup:@"1410329312753" error:&error];
    if (!error) {
        NSLog(@"修改成功");
    }

2、block异步方法

    // 修改群描述
    [[EaseMob sharedInstance].chatManager asyncChangeDescription:@"要修改的描述" forGroup:@"1410329312753" completion:^(EMGroup *group, EMError *error) {
        if (!error) {
            NSLog(@"修改成功");
        }
    } onQueue:nil];

3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
    	// 修改群描述
	    [[EaseMob sharedInstance].chatManager asyncChangeDescription:@"要修改的描述" forGroup:@"1410329312753"];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	/*!
	 @method
	 @brief 群组信息更新后的回调
	 @param group 发生更新的群组
	 @param error 错误信息
	 @discussion
	 当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调
	 */
	-(void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error{
    	if (!error) {
        	NSLog(@"修改成功");
	    }
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

### 5.5 IM {#im}


#### 5.5.1	发消息 {#sendmessage}

发消息时，单聊和群聊调用的是统一接口，区别只是要设置下message.isGroup属性。目前不支持多body

##### 5.5.1.1	发文字

    EMChatText *txtChat = [[EMChatText alloc] initWithText:@"要发送的消息"];
    EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txtChat];
    
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];

##### 5.5.1.2	发图片

	/*!
	 @method
	 @brief 以UIImage构造图片对象
	 @discussion 
	 @param aImage UIImage实例
	 @param aDisplayName 图片对象的显示名
	 @result 图片对象
	 */
    EMChatImage *imgChat = [[EMChatImage alloc] initWithUIImage:img displayName:@"displayName"];
    EMImageMessageBody *body = [[EMImageMessageBody alloc] initWithChatObject:imgChat];
    
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];

##### 5.5.1.3	发位置

	/*!
	 @method
	 @brief 以位置信息构造位置对象
	 @discussion 
	 @param latitude 纬度
	 @param longitude 经度
	 @param address 地址信息
	 @result 位置对象
	 */
    EMChatLocation *locChat = [[EMChatLocation alloc] initWithLatitude:35.1 longitude:35.1 address:@"地址"];
    EMLocationMessageBody *body = [[EMLocationMessageBody alloc] initWithChatObject:locChat];
    
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];


##### 5.5.1.4	发音频



##### 5.5.1.5	发视频

    EMChatVideo *videoChat = [[EMChatVideo alloc] initWithFile:localPath displayName:@"displayName"];
    EMVideoMessageBody *body = [[EMVideoMessageBody alloc] initWithChatObject:videoChat];
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];


##### 5.5.1.6	发文件

    EMChatFile *fileChat = [[EMChatFile alloc] initWithFile:localPath displayName:@"displayName"];
    EMFileMessageBody *body = [[EMFileMessageBody alloc] initWithChatObject:fileChat];
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];

##### 5.5.1.7	发透传(CMD)

透传消息:透传消息不会存db，也不会走apns推送，类似一种指令型的消息，比如您的服务器要通知客户端做某些操作，您可以服务器和客户端提前约定好某个字段，当客户端收到约定好的字段时，执行某种特殊操作。



    EMChatCommand *cmdChat = [[EMChatCommand alloc] init];
    cmdChat.cmd = @"reason";
    EMCommandMessageBody *body = [[EMCommandMessageBody alloc] initWithChatObject:cmdChat];
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];

##### 5.5.1.8	发扩展(ext)

    EMChatText *txtChat = [[EMChatText alloc] initWithText:@"要发送的消息"];
    EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txtChat];
    
    // 生成message
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO; // 设置是否是群聊
    message.ext = @{@"key":@"value"}; // 添加扩展，key和value必须是基本类型，且不能是json
    
    // 发送消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:message progress:nil];


#### 5.5.2	收消息 {#receivemessage}

收消息分为离线消息，在线消息。

普通在线消息会走以下回调:

	/*!
	 @method
	 @brief 收到消息时的回调
	 @param message      消息对象
	 @discussion 当EMConversation对象的enableReceiveMessage属性为YES时, 会触发此回调
    	         针对有附件的消息, 此时附件还未被下载.
        	     附件下载过程中的进度回调请参考didFetchingMessageAttachments:progress:, 
            	 下载完所有附件后, 回调didMessageAttachmentsStatusChanged:error:会被触发
	 */
	- (void)didReceiveMessage:(EMMessage *)message;

	
透传(cmd)在线消息会走以下回调:

	/*!
	 @method
	 @brief 收到消息时的回调
	 @param cmdMessage      消息对象
	 @discussion 当EMConversation对象的enableReceiveMessage属性为YES时, 会触发此回调
	 */
	- (void)didReceiveCmdMessage:(EMMessage *)cmdMessage;
	
离线普通消息会走以下回调:

	/*!
	 @method
	 @brief 将要接收离线消息的回调
	 @discussion
	 @result
	 */
	- (void)willReceiveOfflineMessages;

	/*!
	 @method
	 @brief 离线非透传消息接收完成的回调
	 @discussion
	 @param offlineMessages 接收到的离线列表
	 @result
	 */
	- (void)didFinishedReceiveOfflineMessages:(NSArray *)offlineMessages;

离线透传(消息)消息会走以下回调:

	/*!
	 @method
	 @brief 离线透传消息接收完成的回调
	 @discussion
	 @param offlineCmdMessages 接收到的离线透传消息列表
	 @result
	 */
	- (void)didFinishedReceiveOfflineCmdMessages:(NSArray *)offlineCmdMessages;


消息未读数变化回调

	//
	//  TestViewController.m
	//  Test
	//
	//  Created by dujiepeng on 1/6/15.
	//  Copyright (c) 2015 dujiepeng. All rights reserved.
	//

	#import "TestViewController.h"
	#import "EaseMob.h"

	@interface TestViewController ()<IChatManagerDelegate>
	{

	}
	@property (nonatomic) id<IChatManager> chatManager;
	@property (nonatomic, strong) EMGroup *currentGroup;
	@end

	@implementation TestViewController

	-(void)viewDidLoad{
	    [self registerEaseMobDelegate];
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[self.chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[self.chatManager removeDelegate:self];
	}


	#pragma mark - IChatManagerDelegate
	// 未读消息变化
	-(void)didUnreadMessagesCountChanged{

	}
	@end


#### 5.5.3	消息解析 {#resolvemessage}


##### 5.5.3.1 解析普通消息

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
	    [super viewDidLoad];
    	[self registerEaseMobDelegate];
	}

	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 收到消息的回调，带有附件类型的消息可以用SDK提供的下载附件方法下载（后面会讲到）
	-(void)didReceiveMessage:(EMMessage *)message{
    	id<IEMMessageBody> msgBody = message.messageBodies.firstObject;
	    switch (msgBody.messageBodyType) {
    	    case eMessageBodyType_Text:
	        {
            	// 收到的文字是
        	    NSString *txt = ((EMTextMessageBody *)msgBody).text;
    	        NSLog(@"收到的文字是 txt -- %@",txt);
	        }
        	    break;
    	    case eMessageBodyType_Image:
	        {
            	// 得到一个图片消息body
        	    EMImageMessageBody *body = ((EMImageMessageBody *)msgBody);
    	        NSLog(@"大图remote路径 -- %@"   ,body.remotePath);
	            NSLog(@"大图local路径 -- %@"    ,body.localPath); // // 需要使用sdk提供的下载方法后才会存在
        	    NSLog(@"大图的secret -- %@"    ,body.secretKey);
    	        NSLog(@"大图的W -- %f ,大图的H -- %f",body.size.width,body.size.height);
	            NSLog(@"大图的下载状态 -- %lu",body.attachmentDownloadStatus);
            

	            // 缩略图sdk会自动下载
            	NSLog(@"小图remote路径 -- %@"   ,body.thumbnailRemotePath);
        	    NSLog(@"小图local路径 -- %@"    ,body.thumbnailLocalPath);
    	        NSLog(@"小图的secret -- %@"    ,body.thumbnailSecretKey);
	            NSLog(@"小图的W -- %f ,大图的H -- %f",body.thumbnailSize.width,body.thumbnailSize.height);
    	        NSLog(@"小图的下载状态 -- %lu",body.thumbnailDownloadStatus);
	        }
        	    break;
    	    case eMessageBodyType_Location:
	        {
            	EMLocationMessageBody *body = (EMLocationMessageBody *)msgBody;
        	    NSLog(@"纬度-- %f",body.latitude);
    	        NSLog(@"经度-- %f",body.longitude);
	            NSLog(@"地址-- %@",body.address);
        	}
            	break;
    	    case eMessageBodyType_Voice:
	        {
            	// 音频sdk会自动下载
        	    EMVoiceMessageBody *body = (EMVoiceMessageBody *)msgBody;
    	        NSLog(@"音频remote路径 -- %@"      ,body.remotePath);
	            NSLog(@"音频local路径 -- %@"       ,body.localPath); // 需要使用sdk提供的下载方法后才会存在（音频会自动调用）
            	NSLog(@"音频的secret -- %@"        ,body.secretKey);
        	    NSLog(@"音频文件大小 -- %lld"       ,body.fileLength);
    	        NSLog(@"音频文件的下载状态 -- %lu"   ,body.attachmentDownloadStatus);
	            NSLog(@"音频的时间长度 -- %lu"      ,body.duration);
	
	        }
            	break;
        	case eMessageBodyType_Video:
    	    {
	            EMVideoMessageBody *body = (EMVideoMessageBody *)msgBody;
            
    	        NSLog(@"视频remote路径 -- %@"      ,body.remotePath);
	            NSLog(@"视频local路径 -- %@"       ,body.localPath); // 需要使用sdk提供的下载方法后才会存在
        	    NSLog(@"视频的secret -- %@"        ,body.secretKey);
    	        NSLog(@"视频文件大小 -- %lld"       ,body.fileLength);
	            NSLog(@"视频文件的下载状态 -- %lu"   ,body.attachmentDownloadStatus);
            	NSLog(@"视频的时间长度 -- %lu"      ,body.duration);
        	    NSLog(@"视频的W -- %f ,视频的H -- %f", body.size.width, body.size.height);

    	        // 缩略图sdk会自动下载
	            NSLog(@"缩略图的remote路径 -- %@"     ,body.thumbnailRemotePath);
            	NSLog(@"缩略图的local路径 -- %@"      ,body.thumbnailRemotePath);
        	    NSLog(@"缩略图的secret -- %@"        ,body.thumbnailSecretKey);
    	        NSLog(@"缩略图的下载状态 -- %lu"      ,body.thumbnailDownloadStatus);
            
	        }
            	break;
        	case eMessageBodyType_File:
    	    {
	            EMFileMessageBody *body = (EMFileMessageBody *)msgBody;
            	NSLog(@"文件remote路径 -- %@"      ,body.remotePath);
        	    NSLog(@"文件local路径 -- %@"       ,body.localPath); // 需要使用sdk提供的下载方法后才会存在
    	        NSLog(@"文件的secret -- %@"        ,body.secretKey);
	            NSLog(@"文件文件大小 -- %lld"       ,body.fileLength);
            	NSLog(@"文件文件的下载状态 -- %lu"   ,body.attachmentDownloadStatus);
        	}
    	        break;
            
	        default:
        	    break;
    	}
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}	

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


##### 5.5.3.2 解析透传消息

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didReceiveCmdMessage:(EMMessage *)cmdMessage{
    	EMCommandMessageBody *body = (EMCommandMessageBody *)cmdMessage.messageBodies.lastObject;
	    NSLog(@"收到的action是 -- %@",body.action);
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end


##### 5.5.3.3 解析扩展消息

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 收到离线消息回调
	-(void)didReceiveCmdMessage:(EMMessage *)cmdMessage{
    	// cmd消息中的扩展属性
	    NSDictionary *ext = cmdMessage.ext;
    	NSLog(@"cmd消息中的扩展属性是 -- %@",ext);
	}
	// 收到消息回调
	-(void)didReceiveMessage:(EMMessage *)message{
    	// 消息中的扩展属性
	    NSDictionary *ext = message.ext;
    	NSLog(@"消息中的扩展属性是 -- %@",ext);
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

#### 5.5.4 下载附件 {#downloadmessage}

SDK中下载附件分为两种，一个是下载大图(或音视频)，一个是下载缩略图(缩略图在收到消息时会自动下载，提供该方法是为了在自动下载失败时可以主动调用)

##### 5.5.4.1 下载大图(或音视频)

SDK中提供了三种方法

1、同步方法

    EMError *error = nil;
    EMMessage *aMessage = [[EaseMob sharedInstance].chatManager fetchMessage:message progress:nil error:&error];
    if (!error) {
        NSLog(@"下载成功，下载后的message是 -- %@",aMessage);
    }
    
2、block回调方法

    [[EaseMob sharedInstance].chatManager asyncFetchMessage:message progress:nil completion:^(EMMessage *aMessage, EMError *error) {
        if (!error) {
            NSLog(@"下载成功，下载后的message是 -- %@",aMessage);
        }
        
    } onQueue:nil];

3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
	    [super viewDidLoad];
    	[self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 收到消息回调
	-(void)didReceiveMessage:(EMMessage *)message{
    	id<IEMMessageBody> body = message.messageBodies.firstObject;
	    switch (body.messageBodyType) {
        	case eMessageBodyType_Image:
    	    case eMessageBodyType_Video:
	        case eMessageBodyType_Voice:
        	case eMessageBodyType_File:
    	    {
	            // 当message中带有附件的时候执行下载(如图片、音频、视频、文件)
            	[[EaseMob sharedInstance].chatManager asyncFetchMessage:message progress:nil];
        	}
    	        break;
            
	        default:
        	    break;
    	}
	}

	// 附件下载结束回调
	-(void)didFetchMessage:(EMMessage *)aMessage error:(EMError *)error{
	    if (!error) {
        	NSLog(@"下载成功，下载后的message是 -- %@",aMessage);
    	}
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

##### 5.5.4.2 下载缩略图

在SDK收到消息时，会自动下载带有小图的消息，本方法提供，是为了在SDK自动下载失败时方便用户主动调用。

SDK中提供了三种方法

1、同步方法

    EMError *error = nil;
    EMMessage *aMessage = [[EaseMob sharedInstance].chatManager fetchMessageThumbnail:message progress:nil error:&error];
    if (!error) {
        NSLog(@"缩略图下载成功，下载后的message -- %@",aMessage);
    }
    
2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncFetchMessageThumbnail:message progress:nil completion:^(EMMessage *aMessage, EMError *error) {
        if (!error) {
            NSLog(@"缩略图下载成功");
        }
    } onQueue:nil];
    
3、IChatManagerDelegate异步方法

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	// 收到消息回调
	-(void)didReceiveMessage:(EMMessage *)message{
    	id<IEMMessageBody> body = message.messageBodies.firstObject;
	    switch (body.messageBodyType) {
    	    case eMessageBodyType_Image:
        	case eMessageBodyType_Video:
	        {
    	        // 当收到消息时，SDK会自动调用下载缩略图。此处在这里调用只是为了演示用。
        	    [[EaseMob sharedInstance].chatManager asyncFetchMessageThumbnail:message progress:nil];
	        }
    	        break;
            
        	default:
            	break;
	    }
	}

	// 当收到图片或视频时，SDK会自动下载缩略图，并回调该方法，如果下载失败，可以通过
	// asyncFetchMessageThumbnail:progress 方法主动获取
	-(void)didFetchMessageThumbnail:(EMMessage *)aMessage error:(EMError *)error{
    	if (!error) {
        	NSLog(@"下载缩略图成功，下载后的message是 -- %@",aMessage);
	    }
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end



### 5.6 消息回执 {#messageack}

环信支持消息回执，可以实现已送达/已读的效果

#### 5.6.1 送达回执 {#deliveryack}

该回调缺省是关闭的，需要您调用打开方法（只需要在SDK初始化后调用一次即可）

	/*!
	 @property
	 @brief 开启消息送达通知(默认是不开启的)
	 @discussion
	 */
	[[EaseMob sharedInstance].chatManager enableDeliveryNotification];


SDK提供了已送达回执，当对方收到您的消息后，您会收到以下回调

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
	    [super viewDidLoad];
    	[self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	//  已送达回执
	-(void)didReceiveHasDeliveredResponse:(EMReceipt *)resp{
    	NSLog(@"收到消息送达回执，消息接收人是 -- %@,消息id是 -- %@",resp.from,resp.chatId);
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

#### 5.6.2 已读回执 {#hasreadresponse}

已读回执需要开发者主动调用的。当用户读取消息后，由开发者主动调用方法

##### 5.6.2.1 发送已读回执

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didReceiveMessage:(EMMessage *)message{
    	// 发送已读回执.在这里写只是为了演示发送，在app中具体在哪里发送需要开发者自己决定。
	    [[EaseMob sharedInstance].chatManager sendHasReadResponseForMessage:message];
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end

##### 5.6.2.2 接收已读回执

	//
	//  ViewController.m
	//  Test
	//
	//  Created by dujiepeng on 12/29/14.
	//  Copyright (c) 2014 dujiepeng. All rights reserved.
	//

	#import "ViewController.h"
	#import "EaseMob.h"

	@interface ViewController ()<IChatManagerDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
    	[super viewDidLoad];
	    [self registerEaseMobDelegate];
	}


	- (void)dealloc{
    	[self unRegisterEaseMobDelegate];
	}

	#pragma mark - IChatManagerDelegate
	-(void)didReceiveHasReadResponse:(EMReceipt *)resp{
    	NSLog(@"收到已读回执，回执发送方是 -- %@, messageid是 -- %@",resp.from,resp.chatId);
	}

	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}

	@end
	
### 5.7 会话 {#conversation}

会话是SDK中为了方便操作而提供的一种对象，通过它可以方便得操作消息。

#### 5.7.1 创建会话 {#createconversation}

根据chatter创建一个conversation。
	
	EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:@"8001" isGroup:NO];

*	conversationForChatter:获取或创建与8001的会话
*	isGroup:是否是群聊（如果上面传入的Chatter是群id，则此处为YES）

#### 5.7.2 删除会话  {#removeconversation}


删除单个会话

	[[EaseMob sharedInstance].chatManager removeConversationByChatter:@"8001" deleteMessages:YES];
	
*	removeConversationByChatter:删除与8001的会话
*	deleteMessages:删除会话中的消息

根据chatter批量删除会话

	[[EaseMob sharedInstance].chatManager removeConversationsByChatters:chatters deleteMessages:YES];
	
*	removeConversationsByChatters:要删除的chatters
*	deleteMessages:删除会话中的消息

删除所有会话

	// deleteMessage,是否删除会话中的message，YES为删除
	[[EaseMob sharedInstance].chatManager removeAllConversationsWithDeleteMessages:YES];


#### 5.7.3 获取会话列表 {#getconversations}

SDK中提供了三种获取会会话列表的方法

1、获取或创建

	EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:@"8001" isGroup:NO];

*	conversationForChatter:获取或创建与8001的会话
*	isGroup:是否是群聊（如果上面传入的Chatter是群id，则此处为YES）

2、获取内存中所有会话

	NSArray *conversations = [[EaseMob sharedInstance].chatManager conversations];
	
3、获取DB中的所有会话

	NSArray *conversations = [[EaseMob sharedInstance].chatManager loadAllConversationsFromDatabase];

##### 5.7.3.1 获取会话中未读消息数

	[conversation unreadMessagesCount];

#### 5.7.4 操作消息 {#managemessage}

##### 5.7.5.1 插入消息到DB

目前只支持插入不带有附件类型的消息

    // 创建文本消息
    EMChatText *txtChat = [[EMChatText alloc] initWithText:@"text"];
    EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txtChat];
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO;
    // 设置消息的扩展属性（可不加）
    message.ext = @{@"key":@"value"};
    // 将消息插入db
    [[EaseMob sharedInstance].chatManager insertMessageToDB:message];
    
或

    // 创建文本消息
    EMChatText *txtChat = [[EMChatText alloc] initWithText:@"text"];
    EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txtChat];
    EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
    message.isGroup = NO;
    // 设置消息的扩展属性（可不加）
    message.ext = @{@"key":@"value"};
    // 将消息插入db，并调用相关回调（如果消息对应的conversation不存在，会调用didUpdateConversationList回调）
    [[EaseMob sharedInstance].chatManager insertMessageToDB:message append2Chat:YES];


##### 5.7.5.2 删除消息

根据messageId删除message
  
    [conversation removeMessageWithId:message.messageId];
    
    
根据messageIds批量删除message

	[conversation removeMessagesWithIds:messageIds];
	
删除会话中的所有message

	[conversation removeAllMessages];

##### 5.7.5.3 更新消息内容

更新message发送状态

    message.deliveryState = eMessageDeliveryState_Delivered;
    [message updateMessageDeliveryStateToDB];
    
更新message中ext的状态

	[message updateMessageExtToDB];
	
	
### 5.8 推送设置 {#apns}
	
环信iOS设备支持离线消息推送。

#### 5.8.1 流程介绍 {#apnsprocess}

`SDK中认为，只有长连接断开了，才应该发送离线消息，也就是说当您APP没有连接到服务器或者彻底关闭后，才会收到APNS。如果你需要app在后台或者锁屏时也可以提示，需要自己实现LocalNotification`

通知类型：

*	localNotification:App在后台，或者锁屏，但长连接没断开时使用。
*	Apns: 长连接断开后使用。


以下是离线消息流程（以下为iOS流程）

A 发消息msg给 B， B不在线。

1.	A 将 msg 发送给服务器。
2.	服务器判断 B 不在线，将消息缓存到离线消息空间。
3.	服务器将消息通过 APNS 推送给 B，B用户收到 APNS 推送。
4.	B 用户上线，服务器检测 B 用户连接到服务器，将离线消息空间中的缓存消息发给 B。


#### 5.8.2  制作并上传证书 {#updateapnscer}

[制作与上传推送证书](http://www.easemob.com/docs/ios/push/certificate/ "制作与上传推送证书")

#### 5.8.3 SDK设置 {#sdkapnssettings}

1、初始化SDK时，设置使用的证书名称

	[[EaseMob sharedInstance] registerSDKWithAppKey:@"easemob-demo#chatdemoui" apnsCertName:apnsCertName];

* apnsCertName: 后台上传的证书名称

2、初始化app时，注册推送

	#if !TARGET_IPHONE_SIMULATOR
    	UIApplication *application = [UIApplication sharedApplication];
    
	    //iOS8 注册APNS
    	if ([application respondsToSelector:@selector(registerForRemoteNotifications)]) {
        	[application registerForRemoteNotifications];
	        UIUserNotificationType notificationTypes = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
    	    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:notificationTypes categories:nil];
        	[application registerUserNotificationSettings:settings];
	    }else{
    	    UIRemoteNotificationType notificationTypes = UIRemoteNotificationTypeBadge |
        UIRemoteNotificationTypeSound |
        UIRemoteNotificationTypeAlert;
       	 [[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];
	    }
	#endif
	
3、监听deviceToken回调，并向EaseMobSDK(iOS)注册deviceToken。

	-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
	{
    	[[EaseMob sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
	}

4、监听获取deviceToken失败回调
	
	- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    	[[EaseMob sharedInstance] application:application didFailToRegisterForRemoteNotificationsWithError:error];
	}

#### 5.8.4 设置推送时Apns昵称显示（需要真机，并且得到deviceToken的情况下） {#setapnsnick}

	[[EaseMob sharedInstance].chatManager setApnsNickname:@"APNS昵称"];
	
#### 5.8.5 显示推送详情

    EMPushNotificationOptions *options = [[EaseMob sharedInstance].chatManager pushNotificationOptions];
    options.displayStyle = ePushNotificationDisplayStyle_messageSummary;
    [[EaseMob sharedInstance].chatManager asyncUpdatePushOptions:options completion:^(EMPushNotificationOptions *options, EMError *error) {
        if (!error) {
            NSLog(@"设置成功");
        }
    } onQueue:nil];
    
*	ePushNotificationDisplayStyle_simpleBanner   简单显示一条"您有一条新消息"的文本
*	ePushNotificationDisplayStyle_messageSummary 会显示一条具有消息内容的推送消息

#### 5.8.6 免打扰设置  {#unrecive}

该设置是全局设置，对群组也起作用。

	EMPushNotificationOptions *options = [[EaseMob sharedInstance].chatManager pushNotificationOptions];
	options.noDisturbing = YES;
	options.noDisturbingStartH = 13;
	options.noDisturbingEndH = 15;
	[[EaseMob sharedInstance].chatManager asyncUpdatePushOptions:options completion:^(EMPushNotificationOptions *options, EMError *error) {
		if (!error) {
			NSLog(@"设置成功");
		}
	} onQueue:nil];

*	13点到15点之间不收推送

#### 5.8.7 群组免打扰设置 {#groupunrecive}

设置群组免打扰，提供了三种方法

1、同步方法

    EMError *error = nil;
    [[EaseMob sharedInstance].chatManager ignoreGroupPushNotification:group.groupId ignore:YES error:&error];
    if (!error) {
        NSLog(@"设置成功");
    }
    
2、block异步方法

    [[EaseMob sharedInstance].chatManager asyncIgnoreGroupPushNotification:group.groupId isIgnore:YES completion:^(NSArray *ignoreGroupsList, EMError *error) {
        if (!error) {
            NSLog(@"设置成功");
        }
    } onQueue:nil];
    
3、IChatManagerDelegate异步方法

	//
	//  TestViewController.m
	//  Test
	//
	//  Created by dujiepeng on 1/6/15.
	//  Copyright (c) 2015 dujiepeng. All rights reserved.
	//

	#import "TestViewController.h"
	#import "EaseMob.h"

	@interface TestViewController ()<IChatManagerDelegate>
	{

	}
	@property (nonatomic) id<IChatManager> chatManager;
	@property (nonatomic, strong) EMGroup *currentGroup;
	@end

	@implementation TestViewController

	-(void)viewDidLoad{
    	[self registerEaseMobDelegate];
	    // 传入要忽略的群组id，此处没有写获取group逻辑，需要您自己在实际场景中得到
    	[[EaseMob sharedInstance].chatManager asyncIgnoreGroupPushNotification:group.groupId isIgnore:YES];
	}


	// 向SDK中注册回调
	- (void)registerEaseMobDelegate{
    	// 此处先取消一次，是为了保证只将self注册过一次回调。
	    [self unRegisterEaseMobDelegate];
    	[self.chatManager addDelegate:self delegateQueue:nil];
	}

	// 取消SDK中注册的回调
	- (void)unRegisterEaseMobDelegate{
    	[self.chatManager removeDelegate:self];
	}


	#pragma mark - IChatManagerDelegate

	-(void)didIgnoreGroupPushNotification:(NSArray *)ignoredGroupList error:(EMError *)error{
	    if (!error) {
    	    NSLog(@"设置成功");
	    }
	}
	@end

#### 5.8.8 获取免打扰群组id  {#getungroupsid}

	[[EaseMob sharedInstance].chatManager ignoredGroupIds];
