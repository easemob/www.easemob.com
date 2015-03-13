---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.3 release note

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


## 使用技巧

** 1、不支持修改数据库中已存在的EMMessage的from属性，to属性，conversationChatter属性；

*** 2、如果想判断EMConversation里边有没有message，调用【EMConversation latestMessage】,千万不要调用【EMConversation loadAllMessages】,你的app会被拖死的；

*** 3、如果想判断EMMessage属于哪个EMConversation, 通过EMMessage.conversationChatter属性判断；

**** 4、2.1.2以前版本的ios sdk会出现conversation.chatter == nil的情况，2.1.2及以后版本对这个问题有修改，但是为了防止有漏网的，在调用【[EaseMob sharedInstance].chatManager conversationForChatter:chatter isGroup:_isChatGroup】前，判断一下chatter是否为空；

***** 5、其他端给ios客户端发消息时，要避免出现NSNULL类型，会造成崩溃，ios SDK目前没有容错NSNULL；

** 6、2.1.2及以后版本，message列表要你们自己维护了，便于定制，也好内存管理；

** 7、消息推送分两种情况：app死掉之后的是离线推送，环信负责；app在后台没死之前是本地推送，需要你们自己负责；

***** 8、ios SDK中的接口，以async开头的是异步方法，其余为同步方法。


## bug fix

1、发送消息回执失败，即客户端A调用方法【sendHasReadResponseForMessage：】，客户端B不会收到【didReceiveHasReadResponse：】回调。

使用2.1.2的补救办法：
EMMessage *tmpMessage = [[EMMessage alloc] initMessageWithID:message.messageId sender:message.to receiver:message.from bodies:nil];
[[EaseMob sharedInstance].chatManager sendHasReadResponseForMessage:tmpMessage];
正确方法：[[EaseMob sharedInstance].chatManager sendHasReadResponseForMessage:message];
搜索关键词：sendHasReadResponseForMessage；

2、在不正确的操作流程下，conversation的消息未读数会出现-1，修复为最小是0，不会返回负数；

3、Database的数据存到了Document目录下，迁移到Library目录下；

4、特殊情况下，会出现收到离线消息的时候SDK中的Database还没有open, 造成第一条离线消息无法存进去;


## SDK内部细节调整

1、登录

分为自动登录和手动登录。

a>、手动登录是调用sdk的login相关接口；

b>、登陆成功之后，(一定是在登录成功之后)设置【EMChatManager setIsAutoLoginEnabled:YES】即设置为自动登录，下次启动之后，判断【EMChatManager isAutoLoginEnabled】是否==YES，等于YES，就不要再去手动登录，sdk内部会自动进行登录，你只需监听【willAutoLoginWithInfo:error:】和【didAutoLoginWithInfo:error:】。sdk自动登录在sdk接口【application:didFinishLaunchingWithOptions:】中实现，所以确定该方法在你的工程代码的AppDelegate类中有调用。

2、离线消息

分为离线cmd消息和离线非cmd消息两种类型。开始监听的方法是同一个【willReceiveOfflineMessages】；在离线消息接收过程中，不会返回回调【didReceive(Cmd)Message：】和【didUnreadMessagesCountChanged】；结束后返回的回调有三个【didFinishedReceiveOfflineMessages：】、【didFinishedReceiveOfflineCmdMessages：】和【didUnreadMessagesCountChanged】（如果没有离线消息，不返回）。

3、群成员被踢

是这样的流程：踢在线的，对方会收到回调【group:didLeave:error:】；踢不在线的，对方上线后不会收到回调；但是两种情况群都会被移除。

4、EMMessage

因为安卓SDK暂时不支持多body，为了统一，IOS SDK请暂时不要使用多body的EMMessage结构。


## SDK性能优化

1、网络状态不好时，会导致频繁掉线、重连，在这个过程中，程序会卡；


## 新功能大放送

1、点对点语音通话bate版，目前只支持wifi非relay情况下使用。如果想在黑屏状态下能继续通话，请选择VIOP。


## new api

### EMReceipt

<pre class="hll"><code class="language-java">
/*!
@property
@brief 回执所属的对话对象的chatter
*/
@property (strong, nonatomic) NSString *conversationChatter;

添加理由：便于判断收到的回执是哪个conversation的。
</code></pre>


## change api

### IChatManagerLogin

修改理由：当前登录账号被踢或者被删除，只需要在客户端断开Socket，不需要解除device token的绑定

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 注销当前登录用户
@discussion 当接收到【didLoginFromOtherDevice】和【didRemovedFromServer】的回调时，调用此方法，isUnbind传NO
@param isUnbind 是否解除device token
@param pError 错误信息
@result 返回注销信息
*/
- (void)asyncLogoff EM_DEPRECATED_IOS(2_0_6, 2_1_1, "Use - asyncLogoffWithUnbindDeviceToken:");

- (NSDictionary *)logoffWithUnbindDeviceToken:(BOOL)isUnbind
error:(EMError **)pError;

2、/*!
@method
@brief 异步方法, 注销当前登录用户
@discussion 当接收到【didLoginFromOtherDevice】和【didRemovedFromServer】的回调时，调用此方法，isUnbind传NO
@result 完成后【didLogoffWithError:】回调会被触发.
*/
- (NSDictionary *)logoffWithError:(EMError **)pError EM_DEPRECATED_IOS(2_0_6, 2_1_1, "Use - logoffWithUnbindDeviceToken:error:");

- (void)asyncLogoffWithUnbindDeviceToken:(BOOL)isUnbind;

3、/*!
@method
@brief 异步方法, 注销当前登录用户
@discussion 当接收到【didLoginFromOtherDevice】和【didRemovedFromServer】的回调时，调用此方法，isUnbind传NO
@param completion 回调
@param aQueue     回调时的线程
@result
*/
- (void)asyncLogoffWithCompletion:(void (^)(NSDictionary *info, EMError *error))completion
onQueue:(dispatch_queue_t)aQueue EM_DEPRECATED_IOS(2_0_6, 2_1_1, "Use - asyncLogoffWithUnbindDeviceToken:completion:onQueue:");

- (void)asyncLogoffWithUnbindDeviceToken:(BOOL)isUnbind
                              completion:(void (^)(NSDictionary *info, EMError *error))completion
                                 onQueue:(dispatch_queue_t)aQueue;
</code></pre>

### IChatManagerConversation

修改理由：以下方法由开发者传入append2Chat参数决定是否返回回调方法，便于开发者自定义。不带append2Chat参数的对应方法，默认不返回回调方法，注释中有详细描述

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 获取当前登录用户的会话列表
@param append2Chat  是否返回相关回调方法
@result 会话对象列表
*/
- (NSArray *)loadAllConversationsFromDatabase EM_DEPRECATED_IOS(2_1_0, 2_1_2, "Use - loadAllConversationsFromDatabaseWithAppend2Chat:");

- (NSArray *)loadAllConversationsFromDatabaseWithAppend2Chat:(BOOL)append2Chat;

2、/*!
@method
@brief 删除某个会话对象
@discussion
@param chatter 这个会话对象所对应的用户名
@param aDeleteMessages 是否删除这个会话对象所关联的聊天记录
@param append2Chat  是否返回相关回调方法
@result 删除成功或失败
*/
- (BOOL)removeConversationByChatter:(NSString *)chatter
deleteMessages:(BOOL)aDeleteMessages EM_DEPRECATED_IOS(2_1_0, 2_1_2, "Use - removeConversationByChatter:deleteMessages:append2Chat:");

- (BOOL)removeConversationByChatter:(NSString *)chatter
                     deleteMessages:(BOOL)aDeleteMessages
                        append2Chat:(BOOL)append2Chat;

3、/*!
@method
@brief 删除某几个会话对象
@discussion
@param chatters 这几个要被删除的会话对象所对应的用户名列表
@param aDeleteMessages 是否删除这个会话对象所关联的聊天记录
@param append2Chat     是否返回相关回调方法
@result 成功删除的会话对象的个数
*/
- (NSUInteger)removeConversationsByChatters:(NSArray *)chatters
deleteMessages:(BOOL)aDeleteMessages EM_DEPRECATED_IOS(2_1_0, 2_1_2, "Use - removeConversationsByChatters:deleteMessages:append2Chat:");

- (NSUInteger)removeConversationsByChatters:(NSArray *)chatters
                             deleteMessages:(BOOL)aDeleteMessages
                                append2Chat:(BOOL)append2Chat;

4、/*!
@method
@brief 删除所有会话对象
@discussion
@param aDeleteMessages 是否删除这个会话对象所关联的聊天记录
@param append2Chat     是否返回相关回调方法
@result 是否成功执行
*/
- (BOOL)removeAllConversationsWithDeleteMessages:(BOOL)aDeleteMessages EM_DEPRECATED_IOS(2_1_0, 2_1_2, "Use - removeAllConversationsWithDeleteMessages:append2Chat:");

- (BOOL)removeAllConversationsWithDeleteMessages:(BOOL)aDeleteMessages append2Chat:(BOOL)append2Chat;
</code></pre>

### IChatManagerGroup

修改理由：以下方法由开发者传入append2Chat参数决定是否返回回调方法，便于开发者自定义。不带append2Chat参数的对应方法，默认不返回回调方法，注释中有详细描述

<pre class="hll"><code class="language-java">
/*!
@method
@brief  从数据库获取与登陆者相关的群组
@param append2Chat  是否返回相关回调方法
@return 错误信息
*/
- (NSArray *)loadAllMyGroupsFromDatabase EM_DEPRECATED_IOS(2_1_0, 2_1_2, "Use - loadAllMyGroupsFromDatabaseWithAppend2Chat:");

- (NSArray *)loadAllMyGroupsFromDatabaseWithAppend2Chat:(BOOL)append2Chat;
</code></pre>

### IEMChatProgressDelegate

<pre class="hll"><code class="language-java">
/*!
@method
@brief 设置进度
@discussion 用户需实现此接口用以支持进度显示
@param progress 值域为0到1.0的浮点数
@param message  某一条消息的progress
@param messageBody  某一条消息某个body的progress
@result
*/
- (void)setProgress:(float)progress
         forMessage:(EMMessage *)message EM_DEPRECATED_IOS(2_0_6, 2_1_2, "Use - setProgress:forMessage:forMessageBody:");


- (void)setProgress:(float)progress
         forMessage:(EMMessage *)message
     forMessageBody:(id<IEMMessageBody>)messageBody;
</code></pre>