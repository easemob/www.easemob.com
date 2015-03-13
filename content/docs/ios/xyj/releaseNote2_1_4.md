---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.4 release note

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

***
## 注意事项

1、发送一个含多个附件的EMMessage, 附件包括图片/语音/视频/文件，正在优化；

2、转发或插入一条含附件的EMMessage, 附件包括图片/语音/视频/文件，不支持;

3、多附件下载或上传的进度回调，进度会不准；

***
## bug fix

1、会话conversation数量很多的时候，偶尔会出现两条一样的;

2、群名称中包含“（”或者“）”，会造成crash;

3、EMConversation.latestMessage.deliveryState值有时不对；

***
## SDK内部细节调整

1、发送附件类消息，如果附件发送失败，这条消息将设置为失败状态；

2、拨打实时语音，如果对方不在线，回调返回不在线的error;

***
## SDK性能优化

1、实时语音通话接通概率；

2、从数据库load conversation的速度；

***
## 新功能大放送

1、自定义是否关闭打印的log，不能关闭log写入文件，目前我们需要log文件定位问题，望见谅。

sdk中相关接口：

<pre class="hll"><code class="language-java">
/*!
@method
@brief 初始化SDK
@discussion 失败返回EMError,成功返回nil
@param anAppKey        申请应用时的appkey
@param anAPNSCertName  需要使用的APNS证书名字(需要与后台上传时的APNS证书名字相同, 客户端打包时的证书, 需要与服务器后台的证书一一对应)
@param anOtherConfig   其他初始化配置。目前支持自定义 1、是否打印Console Log（对应key为kSDKConfigEnableConsoleLogger）
@result 初始化是否成功
*/
- (EMError *)registerSDKWithAppKey:(NSString *)anAppKey
apnsCertName:(NSString *)anAPNSCertName
otherConfig:(NSDictionary *)anOtherConfig;
</code></pre>

demo中使用示例：

AppDelegate+EaseMob.m

2、添加DNS解析功能

添加理由：有些app出现过连我们的域名解析不出来的，这个好像跟区域有关系。直接使用ip一般情况下应该是会连上的，不排除特殊的可能性。

sdk中相关接口

<pre class="hll"><code class="language-java">
/*!
@property
@brief 是否使用ip
@discussion
*/
@property (nonatomic) BOOL isUseIp;
</code></pre>

***
## new api

### EaseMob

添加理由：用户自定义是否打印log

<pre class="hll"><code class="language-java">
/*!
@method
@brief 初始化SDK
@discussion 失败返回EMError,成功返回nil
@param anAppKey        申请应用时的appkey
@param anAPNSCertName  需要使用的APNS证书名字(需要与后台上传时的APNS证书名字相同, 客户端打包时的证书, 需要与服务器后台的证书一一对应)
@param anOtherConfig   其他初始化配置。目前支持自定义 1、是否打印Console Log（对应key为kSDKConfigEnableConsoleLogger）
@result 初始化是否成功
*/
- (EMError *)registerSDKWithAppKey:(NSString *)anAppKey
                      apnsCertName:(NSString *)anAPNSCertName
                       otherConfig:(NSDictionary *)anOtherConfig;
</code></pre>