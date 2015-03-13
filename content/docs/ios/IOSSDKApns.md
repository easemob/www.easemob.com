---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# apns离线推送

##必备条件 {#apnsCondition}

1、后台上传了推送证书，具体步骤见 [集成SDK前的准备工作](http://www.easemob.com/docs/ios/IOSSDKPrepare) 之 [制作并上传推送证书](http://www.easemob.com/docs/ios/IOSSDKPrepare/#apnsCertificate)

2、代码配置app使用的推送证书

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance] registerSDKWithAppKey:@"appkey" apnsCertName:apnsCertName];

</code></pre>

3、代码注册离线推送

<pre class="hll"><code class="language-java">

//iOS8 注册APNS
if ([application respondsToSelector:@selector(registerForRemoteNotifications)]) {
    [application registerForRemoteNotifications];
    UIUserNotificationType notificationTypes = UIUserNotificationTypeBadge |
    UIUserNotificationTypeSound |
    UIUserNotificationTypeAlert;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:notificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
    }
else{
    UIRemoteNotificationType notificationTypes = UIRemoteNotificationTypeBadge |
    UIRemoteNotificationTypeSound |
    UIRemoteNotificationTypeAlert;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];
}

</code></pre>


您注册了推送功能，iOS 会自动回调以下方法，得到deviceToken，您需要将deviceToken传给SDK

<pre class="hll"><code class="language-java">

// 将得到的deviceToken传给SDK
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    [[EaseMob sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// 注册deviceToken失败
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    [[EaseMob sharedInstance] application:application didFailToRegisterForRemoteNotificationsWithError:error];
    NSLog(@"error -- %@",error);
}

</code></pre>

** apns注册失败，一般是由于使用了通用证书或者是模拟器调试导致，请检查证书并用真机调试。
此处是iOS系统报的错，如仍不能确定，请从网上查找相关资料**


##全局apns操作 {#apnsGlobal}

###获取全局apns配置

登录成功之后，sdk会自返回apns属性，获取代码如下

<pre class="hll"><code class="language-java">

EMPushNotificationOptions *options = [[EaseMob sharedInstance].chatManager pushNotificationOptions];

</code></pre>

### 设置apns昵称

登陆成功之后，按照以下代码设置当前登录用户的apns昵称

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:username
password:password completion:^(NSDictionary *loginInfo, EMError *error) {
    [self hideHud];
    if (loginInfo && !error) 
    {
        //设置推送设置
        [[EaseMob sharedInstance].chatManager setApnsNickname:@"推送昵称"];
    }
} onQueue:nil];

</code></pre>

### apns全局设置

提供三种方法。可以配置apns免打扰时间，apns昵称，推送样式，EMPushNotificationOptions中的属性传入你想设置的值，调用以下方法即可。

1、 同步方法

<pre class="hll"><code class="language-java">

/*!
@method
@brief 更新消息推送相关属性配置（同步方法）
@param options    属性
@param pError     更新错误信息
@result    最新的属性配置
*/
- (EMPushNotificationOptions *)updatePushOptions:(EMPushNotificationOptions *)options
error:(EMError **)pError;

</code></pre>

2、 block异步方法

<pre class="hll"><code class="language-java">

/*!
@method
@brief 更新消息推送相关属性配置(异步方法)
@param options    属性
@param completion 回调
@param aQueue     回调时的线程
@result
*/
- (void)asyncUpdatePushOptions:(EMPushNotificationOptions *)options
completion:(void (^)(EMPushNotificationOptions *options, EMError *error))completion
onQueue:(dispatch_queue_t)aQueue;

</code></pre>

3、 EMChatManagerPushNotificationDelegate回调方法

<pre class="hll"><code class="language-java">

/*!
@method
@brief 更新消息推送相关属性配置（异步方法）
@param options    属性
@discussion
方法执行完之后，调用[didUpdatePushOptions:error:];
*/
- (void)asyncUpdatePushOptions:(EMPushNotificationOptions *)options;
- 
</code></pre>


##群组apns操作 {#apnsGroup}

### 设置指定群组是否接收apns

1、 同步方法

<pre class="hll"><code class="language-java">

/*!
@method
@brief 屏蔽接收群的推送消息
@param groupId    需要屏蔽/取消屏蔽 推送消息的群ID
@param ignore     屏蔽/取消屏蔽
@param pError     错误信息
@result           返回已屏蔽接收推送消息的群列表
@discussion
全局的屏蔽推送消息属性优先于此设置
*/
- (NSArray *)ignoreGroupPushNotification:(NSString *)groupId ignore:(BOOL)ignore error:(EMError **)pError;
- 
</code></pre>

2、 block异步方法

<pre class="hll"><code class="language-java">

/*!
@method
@brief 屏蔽接收群的推送消息, 异步方法
@param groupId    需要屏蔽/取消屏蔽 推送消息的群ID
@param isIgnore   屏蔽/取消屏蔽
@param completion 回调
@param aQueue     回调时的线程
@discussion
全局的屏蔽推送消息属性优先于此设置;
*/
- (void)asyncIgnoreGroupPushNotification:(NSString *)groupId isIgnore:(BOOL)isIgnore completion:(void (^)(NSArray *ignoreGroupsList, EMError *error))completion onQueue:(dispatch_queue_t)aQueue;
- 
</code></pre>

3、 EMChatManagerPushNotificationDelegate回调方法

<pre class="hll"><code class="language-java">

/*!
@method
@brief 屏蔽接收群的推送消息, 异步方法
@param groupId    需要屏蔽/取消屏蔽 推送消息的群ID
@param isIgnore   屏蔽/取消屏蔽
@discussion
全局的屏蔽推送消息属性优先于此设置; 
方法执行完之后，调用[didIgnoreGroupPushNotification:error:].
*/
- (void)asyncIgnoreGroupPushNotification:(NSString *)groupId isIgnore:(BOOL)isIgnore;
- 
</code></pre>

### 获取不接收apns的群组id

登录成功之后，sdk会自动返回不接收apns的群组id，获取代码如下

<pre class="hll"><code class="language-java">

NSArray *ignoredGroupIds = [[EaseMob sharedInstance].chatManager ignoredGroupIds];

</code></pre>

