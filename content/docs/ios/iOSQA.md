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

Q:![xcode6Need icon](xcode6Need.png)

A:	升级xcode6。

Q: SDK太大了，怎么办？

A: SDK大不影响打包成ipa，打包出ipa安装包后，一般只会增加2MB左右。

Q: SDK是否支持64位？

A: 支持

## 	无法收到消息 {#chat}

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
## 	无法收到推送	{#notification}
##	 	无法自动登录 {#autoLogin}
## 	App启动时无法获取历史会话	{#getConversationList}

