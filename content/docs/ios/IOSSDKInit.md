---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---


# 集成SDK基础功能 {#iOS}
	在您阅读此文档时，我们假定您已经具备了基础的 iOS 应用开发经验，并能够理解相关基础概念。
	
## SDK目录讲解 {#explainSdk}

sdk文件夹中有三个子文件夹:include、lib、resources，请不要擅自修改这些文件夹的任何东西，下面依次介绍这三个子文件夹。

* **lib** 静态库，包含连个静态库libEaseMobClientSDK.a和libEaseMobClientSDKLite.a。libEaseMobClientSDKLite.a不包含实时语音功能，libEaseMobClientSDK.a包含所有功能。如果你的app中不需要实时语音功能，删掉libEaseMobClientSDK.a只使用libEaseMobClientSDKLite.a即可。
* **resources** sdk的bundle，包含旧版sdk的数据库、消息提示音，sdk配置文件。其中sdk配置文件已加密，旧版sdk数据库几乎没什么实质作用。
* **include** 包含sdk的头文件。

主要介绍下**include**，所有的接口都在这个文件夹中。

###include目录讲解 {#explainInclude}

* **EaseMobClientSDK/EaseMobClientSDKLite** 包含在项目中要引用的总头文件，即在代码中只需#import"EMSDKFull.h"或#import"EaseMob.h"即可调用所有对应的api。
* **CallService** 包含实时语音相关的接口
* **ChatService** 包含聊天相关的接口，比如注册、登录、退出、单聊、群聊、群组等
* **Utility** 包含DeviceManager和ErrorManager。DeviceManager硬件相关接口，ErrorManager错误码定义

具体接口讲解请转到[接口说明](http://www.easemob.com/docs/ios/apiDocs/IOSSDKAPIChatManager/)


> 注：
> 
>1. include包含5个子文件夹：CallService、ChatService、EaseMobClientSDK、EaseMobClientSDKLite、Utility。如果无需实时语音功能，将CallService和EaseMobClientSDK删掉即可。
>
>2. 类似EM@Manager命名格式的文件夹的内部结构都是相似的。delegates文件夹包含各种代理接口，internal文件夹包含各种协议的声明，types文件夹包含各种实例的声明。


## 初始化SDK {#initSdk} 

需要导入头文件 EaseMob.h(不需要实时语音功能)或者EMSDKFull.h

<pre class="hll"><code class="language-java">

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
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

</code></pre>

* **AppKey**: 区别app的标识，对应上图中的 douser#istore
* **APNSCertName**: iOS中推送证书名称。[制作与上传推送证书](http://www.easemob.com/docs/ios/IOSSDKPrepare/#apnsCertificate)

环信为im部分提供了apns推送功能，如果您要使用，请跳转到[apns离线推送](http://www.easemob.com/docs/ios/IOSSDKApns/)


> SDK中，大部分与**网络有关的操作**，都提供了3种调用方法
>
> 1. 同步方法
>
> 2. 通过delegate回调的异步方法。要想能收到回调，必须要注册为delegate（[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];）
>
> 3. block异步方法(推荐使用)


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

<pre class="hll"><code class="language-java">

//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()&lt;IChatManagerDelegate&gt;

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

</code></pre>


## 登录 {#login}


登录分两种类型：手动登录和自动登录

### 1.  手动登录 

提供了三种方法。

1.1. 同步方法：
 
<pre class="hll"><code class="language-java">

EMError *error = nil;
NSDictionary *loginInfo = [[EaseMob sharedInstance].chatManager loginWithUsername:@"8001" password:@"111111" error:&error];
if (!error && loginInfo) {
    NSLog(@"登陆成功");
}

</code></pre>

1.2. block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:@"8001" password:@"111111" completion:^(NSDictionary *loginInfo, EMError *error) {
    if (!error && loginInfo) {
        NSLog(@"登陆成功");
    }
} onQueue:nil];
</code></pre>

1.3. IChatManagerDelegate回调方法

<pre class="hll"><code class="language-java">

//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()&lt;IChatManagerDelegate&gt;

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

</code></pre>


### 2. 自动登录 {#autologin}

**自动登录**：即首次登录成功后，不需要再次调用登录方法，再下次app启动时，SDK会自动为您登录。并且如果您再自动登录时登录失败，也可以读取到之前的会话信息。

SDK中缺省自动登录是没有打开的，需要您在登录成功后设置，以便您在下次app启动时不需要再次调用环信登录，并且能在没有网的情况下得到会话列表。

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

自动登录在以下几种情况下会被取消

1. 用户发起的登出动作;
2. 用户在别的设备上更改了密码, 导致此设备上自动登陆失败;
3. 用户的账号被从服务器端删除;
4. 用户从另一个设备把当前设备上登陆的用户踢出.

所以，在您调用登录方法前，应该先判断是否设置了自动登录，如果设置了，则不需要您再调用。

SDK中，如果发生自动登录，会有以下回调:

<pre class="hll"><code class="language-java">

//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()&lt;IChatManagerDelegate&gt;

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

</code></pre>


## 重连 {#reconnect}

目前iOS SDK的心跳频率是180秒一次，当您与环信的服务器断开后，以下几种情况会重连：

1.	每隔180秒心跳时，SDK会尝试重连。
2.	您当前网络状态变化时，SDK会尝试重连。

自动重连，有以下回调

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()&lt;IChatManagerDelegate&gt;

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

</code></pre>


## 退出 {#logout}

退出分两种类型：主动退出和被动退出。

* 主动退出：结束账号A在设备DA上的登录状态

* 被动退出：
1、 账号A在设备DA上登录，在线的情况下，账号A又在设备DB上登录。这种情况下，设备DA会收到被踢的回调；
2、 账号A在设备DA上登录，在线的情况下，账号A被从后台删除。这种情况下，设备A会收到被删除的回调。

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


<pre class="hll"><code class="language-java">

//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()&lt;IChatManagerDelegate&gt;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
    // 退出
    [[EaseMob sharedInstance].chatManager asyncLogoffWithUnbindDeviceToken:YES/NO];
}


-(void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
- (void)didLogoffWithError:(EMError *)error{
    if (!error) {
    NSLog(@"退出成功");
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

</code></pre>



进行完上边的步骤之后，编译并运行一下工程，如果能成功运行起工程，恭喜你，你已经能成功调用SDK的方法了。

然后进行注册/登录/退出操作，如果都顺利进行，可以进行下一步了。如果出现了错误，可以去环信开发者讨论群或者环信论坛去提问。
