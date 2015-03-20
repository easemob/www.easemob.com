---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# 集成SDK基础功能 {#iOS}

	在您阅读此文档时，我们假定您已经具备了基础的 iOS 应用开发经验，并能够理解相关基础概念。
	
> SDK中，大部分与**网络有关的操作**，都提供了3种调用方法
>
> 1. 同步方法
>
> 2. 通过delegate回调的异步方法。要想能收到回调，必须要注册为delegate（[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];）
>
> 3. block异步方法(推荐使用)
	
## 初始化SDK {#initSdk} 

引入相关头文件 #import"EaseMob.h"(不需要实时语音功能)或者 #import"EMSDKFull.h"

在工程的AppDelegate中的以下方法中，调用SDK对应方法:

<pre class="hll"><code class="language-java">

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
	//	registerSDKWithAppKey:注册的appKey，详细见下面注释。
	//	apnsCertName:推送证书名(不需要加后缀)，详细见下面注释。
    [[EaseMob sharedInstance] registerSDKWithAppKey:@"douser#istore" apnsCertName:@"istore_dev"];
    [[EaseMob sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    return YES;
}

// App进入后台
- (void)applicationDidEnterBackground:(UIApplication *)application
{
    [[EaseMob sharedInstance] applicationDidEnterBackground:application];
}

// App将要从后台返回
- (void)applicationWillEnterForeground:(UIApplication *)application
{
    [[EaseMob sharedInstance] applicationWillEnterForeground:application];
}

// 申请处理时间
- (void)applicationWillTerminate:(UIApplication *)application
{
    [[EaseMob sharedInstance] applicationWillTerminate:application];
}

</code></pre>

* **registerSDKWithAppKey**: 区别app的标识，[注册与生成appkey](http://www.easemob.com/docs/gettingstart/#section-1)
* **apnsCertName**: iOS中推送证书名称。[制作与上传推送证书](http://www.easemob.com/docs/ios/IOSSDKPrepare/#apnsCertificate)

环信为im部分提供了apns推送功能，如果您要使用，请跳转到[apns离线推送](http://www.easemob.com/docs/ios/IOSSDKApns/)


## 注册 {#register}

客户端注册是为了测试使用，`正式环境中不推荐使用该方式注册环信账号`，注册的流程应该是您服务器通过环信提供的[rest api](http://www.easemob.com/docs/rest/userapi/#im)注册，之后保存到您的服务器或返回给客户端。

注册模式分两种，开放注册和授权注册。只有开放注册时，才可以客户端注册。

注册提供了三种方法。

1、 同步方法

<pre class="hll"><code class="language-java">

EMError *error = nil;
BOOL isSuccess = [[EaseMob sharedInstance].chatManager registerNewAccount:@"8001" password:@"111111" error:&error];
if (isSuccess) {
    NSLog(@"注册成功");
}

</code></pre>
    
2、 block异步方法

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncRegisterNewAccount:@"8001" password:@"111111" withCompletion:^(NSString *username, NSString *password, EMError *error) {
    if (!error) {
        NSLog(@"注册成功");
    }
} onQueue:nil];

</code></pre>

    
3、 IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">

 [[EaseMob sharedInstance].chatManager asyncRegisterNewAccount:@"8001" password:@"111111"];

</code></pre>

监听回调方法

<pre class="hll"><code class="language-java">

 /*!
 @method
 @brief 成功注册新用户后的回调
 @discussion
 @result
 */
- (void)didRegisterNewAccount:(NSString *)username 
					 password:(NSString *)password
					    error:(EMError *)error;

</code></pre>

## 手动登录 {#login}

	手动登录：调用SDK的登录接口进行的操作；
	
提供了三种方法。

1、同步方法：
 
<pre class="hll"><code class="language-java">

EMError *error = nil;
NSDictionary *loginInfo = [[EaseMob sharedInstance].chatManager loginWithUsername:@"8001" password:@"111111" error:&error];
if (!error && loginInfo) {
    NSLog(@"登陆成功");
}

</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111" completion:^(NSDictionary *loginInfo, EMError *error) {
    if (!error && loginInfo) {
        NSLog(@"登陆成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111"];

</code></pre>

监听回调方法

<pre class="hll"><code class="language-java">

/*!
 @method
 @brief 用户登录后的回调
 @discussion
 @param loginInfo 登录的用户信息
 @param error     错误信息
 @result
 */
- (void)didLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error;

</code></pre>

## 自动登录 {#autologin}
	
	自动登录：即首次登录成功后，不需要再次调用登录方法，在下次app启动时，SDK会自动为您登录。并且如果您自动登录失败，也可以读取到之前的会话信息。

### 配置是否进行自动登录

SDK中自动登录属性默认是关闭的，需要您在登录成功后设置，以便您在下次app启动时不需要再次调用环信登录，并且能在没有网的情况下得到会话列表。

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111" completion:^(NSDictionary *loginInfo, EMError *error) {
        if (!error) {
            // 设置自动登录
            [[EaseMob sharedInstance].chatManager setIsAutoLoginEnabled:YES];
        }
    } onQueue:nil];

</code></pre>

> 自动登录在以下几种情况下会被取消
>
> 1. 用户发起的登出动作;
> 2. 用户在别的设备上更改了密码, 导致此设备上自动登陆失败;
> 3. 用户的账号被从服务器端删除;
> 4. 用户从另一个设备把当前设备上登陆的用户踢出.

### 所以，在您调用登录方法前，应该先判断是否设置了自动登录，如果设置了，则不需要您再调用。

<pre class="hll"><code class="language-java">

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

</code></pre>

### SDK中，如果发生自动登录，会有以下回调:

<pre class="hll"><code class="language-java">

/*!
 @method
 @brief 用户将要进行自动登录操作的回调
 @discussion
 @param loginInfo 登录的用户信息
 @param error     错误信息
 @result
 */
- (void)willAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error;

/*!
 @method
 @brief 用户自动登录完成后的回调
 @discussion
 @param loginInfo 登录的用户信息
 @param error     错误信息
 @result
 */
- (void)didAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error;

</code></pre>


## 重连 {#reconnect}

当掉线时，IOS SDK会自动重连，只需要监听重连相关的回调，无需进行任何操作。

<pre class="hll"><code class="language-java">

/*!
 @method
 @brief 将要发起自动重连操作时发送该回调
 @discussion
 @result
 */
- (void)willAutoReconnect;

/*!
 @method
 @brief 自动重连操作完成后的回调（成功的话，error为nil，失败的话，查看error的错误信息）
 @discussion
 @result
 */
- (void)didAutoReconnectFinishedWithError:(NSError *)error;

</code></pre>


## 退出 {#logout}

退出分两种类型：主动退出和被动退出。

* 主动退出：主动点击app的退出按钮；

* 被动退出：
1、 正在登陆的账号在另一台设备上登陆；
2、 正在登陆的账号被从服务器端删除。

退出 提供了三种方法。

**WithUnbindDeviceToken**在被动退出时传NO，在主动退出时传YES.

1、 同步方法：

<pre class="hll"><code class="language-java">

EMError *error = nil;
NSDictionary *info = [[EaseMob sharedInstance].chatManager logoffWithUnbindDeviceToken:YES/NO error:&error];
if (!error && info) {
    NSLog(@"退出成功");
}

</code></pre>


2、 block异步方法 

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncLogoffWithUnbindDeviceToken:YES/NO completion:^(NSDictionary *info, EMError *error) {
    if (!error && info) {
        NSLog(@"退出成功");
    }
} onQueue:nil];

</code></pre>


3、 IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">

// 退出，传入YES，会解除device token绑定，不再收到群消息；传NO，不解除device token
[[EaseMob sharedInstance].chatManager asyncLogoffWithUnbindDeviceToken:YES/NO];

</code></pre>

回调方法监听

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 用户注销后的回调
 @discussion
 @param error        错误信息
 @result
 */
- (void)didLogoffWithError:(EMError *)error;

</code></pre>