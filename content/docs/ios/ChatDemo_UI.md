---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# EaseMob SDK 集成

## 特别说明
**username：环信IM用户唯一标识符**

**SDK的username不能是中文**

**只要知道对方username，不需要互为好友即可聊天**

## 下载环信Demo及SDK

1. 下载环信Demo及SDK： [下载](http://www.easemob.com/sdk/)

2. 解压缩iOSSDK.zip后会得到以下目录结构：

![alt text](/example_layout_IOS.png "Title")

**SDK压缩包下载后, 有20M左右, 解压后, SDK的静态库 libEaseMobClientSDKLite.a 会有42M左右, 静态库这么大的原因是因为静态库包含了三个Architectures:i386、ARMV7、ARMV7S。**
**应用集成SDK后build的iPA安装包，会在原有的基础上变大1.5-2M，对安装包的大小不会有很大的影响的**

## 将EaseMobSDK拖入到项目中 

![alt text](/import.png "Title")

## 添加SDK依赖库 

![alt text](/addLib.png "Lib")

## 设置Linker 

![alt text](/link.png "link")

向Other Linker Flags 中添加 -ObjC。(如果已有，则不需要再添加)

## 设置Architectures 

![alt text](/Active.png "Active")

# SDK的使用，以demo源码为示例

## UIDemo依赖库 
![alt text](/addUIDemoLib.png "UIDemoLib")

## 初始化EaseMobSDK ，见AppDelegate

###在AppDelegate中注册SDK

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

### 配置apns相关函数（需要在真机上运行）

<pre class="hll"><code class="language-objective_c">
//自定义方法
- (void)registerRemoteNotification
{
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
}

//系统方法
-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    //SDK方法调用
    [[EaseMob sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

//系统方法
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    //SDK方法调用
    [[EaseMob sharedInstance] application:application didFailToRegisterForRemoteNotificationsWithError:error];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"注册推送失败"
    message:error.description
    delegate:nil
    cancelButtonTitle:@"确定"
    otherButtonTitles:nil];
    [alert show];
}

//系统方法
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    //SDK方法调用
    [[EaseMob sharedInstance] application:application didReceiveRemoteNotification:userInfo];
}

//系统方法
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
    //SDK方法调用
    [[EaseMob sharedInstance] application:application didReceiveLocalNotification:notification];
}
</code></pre>


## 如果某个类想监听SDK的回调方法，该类需要符合协议<IChatManagerDelegate>，并且需要注册为listener ,如 MainViewController

<pre class="hll"><code class="language-objective_c">
[[EaseMob sharedInstance].chatManager addDelegate:self
delegateQueue:nil];
</code></pre>


## 登录 ，见 LoginViewController

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


### 退出登录：见SettingsViewController 

<pre class="hll"><code class="language-objective_c">
[[EaseMob sharedInstance].chatManager asyncLogoff];
</code></pre>


### 发送消息：工具类 ChatSendHelper 

<pre class="hll"><code class="language-objective_c">
EMChatText *text = [[EMChatText alloc] initWithText:message];
EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:text];

EMMessage *msg = [[EMMessage alloc]
initWithReceiver:@"bot"
bodies:[NSArray arrayWithObject:body]];
//msg.ext = ...;

[[EaseMob sharedInstance].chatManager sendMessage:msg
progress:nil
error:nil];
</code></pre>


### 接收聊天消息并显示：见ChatViewController 

<pre class="hll"><code class="language-objective_c">
 -(void)didReceiveMessage:(EMMessage *)message 
 {
     id\<\IEMMessageBody\>\ body = [message.messageBodies firstObject];
     if (body.messageBodyType == eMessageBodyType_Text) {
     NSString *msg = ((EMTextMessageBody *)body).text;
     NSLog(@"收到的消息---%@",msg);
 }
</code></pre>


## 其他说明
### 回调方法：监测网络状态

在MainViewController类中有体现，监测以下方法

<pre class="hll"><code class="language-objective_c">
//IChatManagerDelegate 登录状态变化
- (void)didConnectionStateChanged:(EMConnectionState)connectionState
{

}
</code></pre>

![alt text](/chatUIDemoNetwork.png "Demo") 

### 回调方法：账号在其它设备登录

账号在其它设备登录时, 当前设备会自动断开连接(收到该回调时, 当前客户端已不能收发消息了, 当前客户端必须处理该回调, 退出到登录页面, )

<pre class="hll"><code class="language-objective_c">
- (void)didLoginFromOtherDevice
{
//退出到登录页面代码
}
</code></pre>

### 回调方法：账号在后台被删除

<pre class="hll"><code class="language-objective_c">
- (void)didRemovedFromServer
{

}
</code></pre>

## Demo演示流程
  
### 运行demo

账号不支持中文

 ![alt text](/chatUIDemoLogin.png "Demo")
 
### 登录成功进入首页

会话：聊天的会话列表

通讯录：申请通知，群组，好友列表

设置：退出登录

 ![alt text](/chatUIDemoHome.png "Demo")
 
### 添加好友

运行程序并登录账号2。点击“通讯录”页面的“+”

 ![alt text](/chatUIDemoOther.png "Demo")
 
输入好友用户名（账号1），进行搜索添加
 
 ![alt text](/chatUIDemoAddFriend.png "Demo")
 
在账号1接收账号2的好友申请
 
 ![alt text](/chatUIDemoApplyList.png "Demo")
 
### 账号1和账号2互发消息

 ![alt text](/chatUIDemoChatList.png "Demo") 
