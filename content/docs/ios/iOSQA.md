---
title: 环信
sidebar: iossidebar
secondnavios: true
---
# iOS QA

## 	集成报错 {#init}

Q: [NSConcreteData AES256Decrypt]: unrecognized selector sent to instance XXX

A: other link flags -ObjC `注意大小写`

Q: 	framework not found Metal for architecture armv7s

A: 	需要升级到xcode6。

Q:![xcode6Need icon](/iOS_Xcode6Need.png)

A:	升级xcode6。

Q: SDK太大了，怎么办？

A: SDK大不影响打包成ipa，打包出ipa安装包后，一般只会增加2MB左右。

Q: SDK是否支持64位？

A: 支持


##		无法收到消息 {#chat}

Q:  无法收到聊天消息

A:	接收聊天等回调，要注意以下几步骤：

1、声明实现IChatManagerDelegate，如：
	
	@interface EaseMobSDKAccountManager ()<IChatManagerDelegate>
	
2、注册当前类接收回调


	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	
	
3、实现对应回调方法，如：

	// 收消息的回调
	-(void)didReceiveMessage:(EMMessage *)message{
	
	}
	
	
Q:  一条消息收到多次

A:	一般是由本类多次注册了回调导致，请确定以下方法只执行了一次

	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	
并且在类析构时注销回调


	-(void)dealloc{
    	[[EaseMob sharedInstance].chatManager removeDelegate:self];
	}


##		无法收到加好友请求 {#addBuddy}

Q:	无法收到好友请求

A: 请确定您接受好友请求的类是否初始化，并声明了IChatManagerDelegate，实现了注册回调和回调方法。


##		无法收到推送	{#notification}


Q:	APP后台时无法收到推送。

A:	环信将notification分为两种，一种是本地通知，一种是apns。当您后台时，长连接还存在，会走didReceiveMessage方法，需要您自己维护本地通知（即LocalNotification）。

Q:  APP彻底关闭，无法收到推送。

A:	您可以通过以下几步检验您的推送

1.	首先需要您[制作并上传推送证书](http://www.easemob.com/docs/ios/IOSSDKPrepare/#apnsCertificate)。
2.	在环信iOSSDK初始化时填写您的证书名称。
3.	[注册推送](http://www.easemob.com/docs/ios/IOSSDKApns/#apnsCondition)。
4.	真机登录环信im账号。
5.	查看管理后台中，对应im账户下是否有您刚刚写的证书名。（如果没有，请检查您是否得到了deviceToken）
6.	确定您当前证书是否和您的项目匹配。（开发证书与生产证书需要一一对应）	
		

##	 	无法自动登录 {#autoLogin}

Q:	无法自动登录

A:	[iOS设置自动登录](http://www.easemob.com/docs/ios/IOSSDKInit/#login)。



##		App启动时无法获取历史会话	{#getConversationList}

Q:	APP再次启动，登录成功前无法获取会话列表。

A:	您需要设置[自动登录](http://www.easemob.com/docs/ios/IOSSDKInit/#login)。

