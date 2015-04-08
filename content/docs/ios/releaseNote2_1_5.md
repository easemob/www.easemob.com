---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.5 release note

>强推更新SDK方式：

>setp1、将旧的sdk从工程中删除，导入新的sdk；

>setp2、编译工程，会出现一系列的error和warning;

>setp3、将error和warning逐个击破，千万不要忽略warning，亲~~。

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

>注：

>1、 include包含5个子文件夹：CallService、ChatService、EaseMobClientSDK、EaseMobClientSDKLite、Utility。如果无需实时语音功能，将CallService和EaseMobClientSDK删掉即可。

>2、 类似EM@Manager命名格式的文件夹的内部结构都是相似的。delegates文件夹包含各种代理接口，internal文件夹包含各种协议的声明，types文件夹包含各种实例的声明。


## 注意事项

1、发送一个含多个附件的EMMessage, 附件包括图片/语音/视频/文件，正在优化；

2、转发或插入一条含附件的EMMessage, 附件包括图片/语音/视频/文件，不支持;

3、多附件下载或上传的进度回调，进度会不准；


## bug fix

1、调用申请加入群组[applyJoinPublicGroup:]相关接口，有时会出现发送申请失败的情况；

2、调用[asyncUpdatePushOptions:]接口时, 未赋值的属性会被同步成默认值；


## SDK内部细节调整

1、Error列表整理，请使用Error的枚举声明进行判断，不要使用对应的数字编号；

2、EMCallManager文件结构整理。需要监听call相关的回调，请引用协议<EMCallManagerDelegate>;

3、登陆成功之后，sdk内部不再自动获取群组列表，请自行调用；

更改理由：有些app的群组不需要从环信服务器获取，基本流程是这样 app客户端—>app服务器—>环信服务器

示例代码如下：

<pre class="hll"><code class="language-java">
//手动登录
[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:username
                                                    password:password
                                                  completion:^(NSDictionary *loginInfo, EMError *error)
{
	if (loginInfo && !error) {
		//获取群组信息
		[[EaseMob sharedInstance].chatManager asyncFetchMyGroupsList];
	}
} onQueue:nil];

//自动登录
-(void)didAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error
{
    if (!error) {
        //获取群组信息
        [[EaseMob sharedInstance].chatManager asyncFetchMyGroupsList];
    }
}
</code></pre>


## 新功能大放送

1、判断当前socket是否连接

sdk接口如下：

<pre class="hll"><code class="language-java">
/*!
 @property
 @brief 是否连上聊天服务器
 */
@property (nonatomic, readonly) BOOL isConnected;
</code></pre>


## new api

### IChatManagerLogin

添加理由：判断当前socket是否连接

<pre class="hll"><code class="language-java">
/*!
 @property
 @brief 是否连上聊天服务器
 */
@property (nonatomic, readonly) BOOL isConnected;
</code></pre>

### EMPushManagerDefs

添加理由：APNS的免打扰状态

<pre class="hll"><code class="language-java">
/*!
 @enum
 @brief 推送消息免打扰设置的状态
 @constant ePushNotificationNoDisturbStatusDay     全天免打扰
 @constant ePushNotificationNoDisturbStatusCustom  自定义时间段免打扰
 @constant ePushNotificationNoDisturbStatusClose   关闭免打扰模式
 */
typedef enum {
    ePushNotificationNoDisturbStatusDay = 0,
    ePushNotificationNoDisturbStatusCustom = 1,
    ePushNotificationNoDisturbStatusClose = 2,
}EMPushNotificationNoDisturbStatus;
</code></pre>

## change api

### EMErrorDefs

修改理由：有些错误类型重复，去掉重复的

注意：判断错误请根据枚举类型判断，不要根据数字去判断

等号左边是废弃掉的，右边是对应替换的

<pre class="hll"><code class="language-java">
EMErrorReachLimit = EMErrorServerMaxCountExceeded,
EMErrorOutOfRateLimited = EMErrorServerMaxCountExceeded,
EMErrorGroupOccupantsReachLimit = EMErrorServerMaxCountExceeded,
EMErrorTooManyLoginRequest = EMErrorServerTooManyOperations,
EMErrorTooManyLogoffRequest = EMErrorServerTooManyOperations,
EMErrorPermissionFailure = EMErrorServerInsufficientPrivilege,
EMErrorIsExist = EMErrorExisted,
</code></pre>

### EMPushNotificationOptions

修改理由：EMPushNotificationOptions的noDisturbStatus成员变量默认值是-1，-1代表不更新服务器该字段

<pre class="hll"><code class="language-java">
/*!
 @property
 @brief 推送消息是否开启了免打扰模式，YES:开启免打扰；NO:未开启免打扰
 */
@property (nonatomic) BOOL noDisturbing EM_DEPRECATED_IOS(2_0_6, 2_1_4, "Use - noDisturbStatus");

/*!
 @property
 @brief 推送消息的免打扰设置，YES:开启免打扰；NO:未开启免打扰
 */
@property (nonatomic) EMPushNotificationNoDisturbStatus noDisturbStatus;
</code></pre>

### EMPushManagerDefs

修改理由：当EMPushNotificationOptions的displayStyle成员变量默认值是-1，-1代表不更新服务器该字段

<pre class="hll"><code class="language-java">
/*!
 @enum
 @brief 推送消息的定制信息
 @constant ePushNotificationDisplayStyle_simpleBanner   简单显示一条"您有一条新消息"的文本
 @constant ePushNotificationDisplayStyle_messageSummary 会显示一条具有消息内容的推送消息
 */
typedef enum {
    ePushNotificationDisplayStyle_simpleBanner = 0,
    ePushNotificationDisplayStyle_messageSummary = 1,
}EMPushNotificationDisplayStyle;
</code></pre>