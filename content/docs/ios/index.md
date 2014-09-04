---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---

# 快速入门（五分钟运行环信demo)  


## 下载环信demo (iOS) 

### 什么是环信demo 

环信demo展示了怎样使用环信SDK快速创建一个完整的类微信聊天APP。展示的功能包括：环信SDK初始化，登录，登出，注册消息接收listener, 发送消息。

环信demo源代码已在github上开源供开发者下载，以帮助开发者更好的学习了解环信SDK。

### 下载环信demo 

1. 下载环信Demo及SDK： [下载](http://www.easemob.com/sdk/)

2. 解压缩iOSSDK.zip后会得到以下目录结构：
 
 ![alt text](/example_layout_IOS.png "Title")


## 运行环信demo (iOS) 

在模拟器中运行chatdemo-nonui工程。

或者使用手机上的Safari浏览器访问 [www.easemob.com/downloads/chatdemo.html](http://www.easemob.com/downloads/chatdemo.html)直接安装

 
运行chatdemo-nonui: 

点击“发送文本消息”，会发送消息给测试机器人（其账号为"bot"）。该测试机器人接收到消息后会把接收的消息原封不动的自动发送回来，显示如下图。

![alt text](/demoIOS.png "demo")

## 快速集成 

### 下载EaseMobSDK: 

下载EaseMobSDK [下载链接](http://www.easemob.com/downloads/iOSSDK.zip)

### 将EaseMobSDK拖入到项目中 

![alt text](/import.png "Title")
 
### SDK依赖库 

![alt text](/addLib.png "Lib")

### UIDemo依赖库 
![alt text](/addUIDemoLib.png "UIDemoLib")
 
### 设置Linker 

![alt text](/link.png "link")

向Other Linker Flags 中添加 -ObjC。(如果已有，则不需要再添加)

### 设置Architectures 

![alt text](/Active.png "Active")

### 初始化EaseMobSDK 

在AppDelegate中注册SDK

<pre class="hll"><code class="language-objective_c">
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary 	*)launchOptions
{
	self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
	self.window.backgroundColor = [UIColor whiteColor];

	// 真机的情况下,notification提醒设置
	UIRemoteNotificationType notificationTypes = UIRemoteNotificationTypeBadge |
	UIRemoteNotificationTypeSound |
	UIRemoteNotificationTypeAlert;
	[[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];

	//注册 APNS文件的名字, 需要与后台上传证书时的名字一一对应
	NSString *apnsCertName = @"chatdemo";
	[[EaseMob sharedInstance] registerSDKWithAppKey:@"easemob-demo#chatdemo" apnsCertName:apnsCertName];
	[[EaseMob sharedInstance] enableBackgroundReceiveMessage];
	[[EaseMob sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];

	[self.window makeKeyAndVisible];
	return YES;
}
</code></pre>

关于EASEMOB_APPKEY，请登录或注册[环信开发者后台(https://console.easemob.com),申请APPKEY后，进行相关配置。

## 从源代码级别深入了解环信demo (iOS) 


### 深入理解环信demo背后的代码 

#### 注册listener,以接收聊天消息:RootViewController.m 

<pre class="hll"><code class="language-objective_c">
    [[EaseMob sharedInstance].chatManager addDelegate:self
                                        delegateQueue:nil];
</code></pre>

#### 登录：见RandViewController+Login

<pre class="hll"><code class="language-objective_c">
    [[EaseMob sharedInstance].chatManager asyncLoginWithUsername:username
                                                        password:@"123456"
                                                      completion:
     ^(NSDictionary *loginInfo, EMError *error) {
         if (!error) {
             NSLog(@"登录成功");         
         }
     } onQueue:nil];
</code></pre>

#### 退出登录：见RandViewController+Login.m 

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncLogoff];
	
</code></pre>

#### 发送消息：见RootViewController+sendChat.m 

<pre class="hll"><code class="language-objective_c">
	EMChatText *text = [[EMChatText alloc] initWithText:message];
    EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:text];
    
    EMMessage *msg = [[EMMessage alloc]
                      initWithReceiver:@"bot"
                      bodies:[NSArray arrayWithObject:body]];
    
    [[EaseMob sharedInstance].chatManager sendMessage:msg
                                             progress:nil
                                                error:nil];
	
</code></pre>


#### 接收聊天消息并显示：见RootViewController.m 

<pre class="hll"><code class="language-objective_c">
	-(void)didReceiveMessage:(EMMessage *)message {
    	id<IEMMessageBody> body = [message.messageBodies firstObject];
		if (body.messageBodyType == eMessageBodyType_Text) {
			NSString *msg = ((EMTextMessageBody *)body).text;
			NSLog(@"收到的消息---%@",msg);
	    }
	}
</code></pre>


