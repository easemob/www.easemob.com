---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.2 release note

>强推更新SDK方式：

>setp1、将旧的sdk从工程中删除，导入新的sdk；

>setp2、编译工程，会出现一系列的error和warning;

>setp3、将error和warning逐个击破，千万不要忽略warning，亲~~。

## 注意事项

1、更换了database，改动较大。

step1、需要新引入**libsqlite3.dylib**；

step2、在登陆成功之后调用[importDataToNewDatabase]将数据导入新的数据库，使用示例
<pre class="hll"><code class="language-java">
EMError *error = [[EaseMob sharedInstance].chatManager importDataToNewDatabase];
if (!error) {
    error = [[EaseMob sharedInstance].chatManager loadDataFromDatabase];
}；
</code></pre>

step3、检测工程中编译产生的所有error和warning，接口的更改会造成编译的失败或警告。

2、接收消息

a> 离线消息需要监听[didFinishedReceiveOfflineMessages:]回调方法，不会在[didReceiveMessage:]返回；

b> cmd类型的消息监听[didReceiveCmdMessage:]，不会在[didReceiveMessage:]返回。

3、插入消息

a> 需要设置message.conversationChatter，此项无值会插入失败；


## new api

### IChatManagerLogin

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 将数据库数据导入新的数据库，旧版sdk数据库采用CoreData,从2.1.0版本开始，换成Sqlite
@discussion 同步方法，登录成功之后调用
@result     错误信息
*/
- (EMError *)importDataToNewDatabase;

2、/*!
@method
@brief  调用sdk登录接口，登陆成功之后，sdk内部会默认调用一次该函数
从数据库获取信息，包括 好友，好友黑名单，自己相关的群组，被屏蔽的群组的id数组，会话，消息
@discussion 登录成功之后调用
@result     错误信息
*/
- (EMError *)loadDataFromDatabase;
</code></pre>

### IChatManagerConversation

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 删除所有会话对象
@discussion
@param chatters        要被删除的会话对象所对应的用户名列表
@param aDeleteMessages 是否删除这个会话对象所关联的聊天记录
@result 是否成功执行
*/
- (BOOL)removeAllConversationsByChatter:(NSString *)chatter deleteMessages:(BOOL)aDeleteMessages;

2、/*!
@method
@brief 保存一组聊天消息(推荐用法，速度有惊喜哦)
@param messages 待保存的聊天消息列表
@param chatter  必填选项，message的conversationChatter
@param append2Chat 是否调用相关回调方法
@return 是否成功插入
*/
- (BOOL)insertMessagesToDB:(NSArray *)messages
                forChatter:(NSString *)chatter
               append2Chat:(BOOL)append2Chat;
</code></pre>

### IChatManagerGroup

<pre class="hll"><code class="language-java">
/*!
@method
@brief  从数据库获取与登陆者相关的群组
@return 错误信息
@discussion
*/
- (NSArray *)loadAllMyGroupsFromDatabase;
</code></pre>

### EMChatManagerLoginDelegate

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 用户将要进行自动登录操作的回调
@discussion
@param loginInfo 登录的用户信息
@param error     错误信息
@result
*/
- (void)willAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error;

2、/*!
@method
@brief 用户自动登录完成后的回调
@discussion
@param loginInfo 登录的用户信息
@param error     错误信息
@result
*/
- (void)didAutoLoginWithInfo:(NSDictionary *)loginInfo error:(EMError *)error;
</code></pre>

### EMMessage

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief  更新消息发送状态
@result 是否更新成功
*/
- (BOOL)updateMessageDeliveryStateToDB;

2、/*!
@method
@brief  更新消息扩展属性
@result 是否更新成功
*/
- (BOOL)updateMessageExtToDB;

3、/*!
@method
@brief  更新消息的消息体
@result 是否更新成功
*/
- (BOOL)updateMessageBodiesToDB;

4、/*!
@method
@brief  修改当前 message 的发送状态, 下载状态为 failed (crash 时或者 terminate)
@return 是否更新成功
*/
- (BOOL)updateMessageStatusFailedToDB;
</code></pre>

### EMChatManagerChatDelegate

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 收到消息时的回调
@param cmdMessage      消息对象
@discussion 当EMConversation对象的enableReceiveMessage属性为YES时, 会触发此回调
针对有附件的消息, 此时附件还未被下载.
附件下载过程中的进度回调请参考didFetchingMessageAttachments:progress:,
下载完所有附件后, 回调didMessageAttachmentsStatusChanged:error:会被触发
*/
- (void)didReceiveCmdMessage:(EMMessage *)cmdMessage;

2、/*!
@method
@brief 离线透传消息接收完成的回调
@discussion
@param offlineCmdMessages 接收到的离线透传消息列表
@result
*/
- (void)didFinishedReceiveOfflineCmdMessages:(NSArray *)offlineCmdMessages;
</code></pre>


## change api

### IChatManagerSettingOptions

<pre class="hll"><code class="language-java">
1、/*!
@property
@brief 当前登陆用户的昵称, 默认为用户名
*/
@property (strong, nonatomic) NSString *nickname EM_DEPRECATED_IOS(2_0_6, 2_1_1, "apnsNickname");
@property (strong, nonatomic) NSString *apnsNickname;

2、/*!
@property
@brief 自动获取好友列表(包括好友黑名单，Default is NO), 当为 YES时, 登录成功后会自动调用 asyncFetchBuddyList 方法
*/
@property (nonatomic) BOOL autoFetchBuddyList EM_DEPRECATED_IOS(2_0_9, 2_1_1, "isAutoFetchBuddyList");
@property (nonatomic) BOOL isAutoFetchBuddyList;
</code></pre>

### IChatManagerConversation

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 获取当前登录用户的会话列表
@discussion
@result 会话对象列表
*/
- (NSArray *)loadAllConversations EM_DEPRECATED_IOS(2_0_8, 2_1_1, "Use - loadAllConversationsFromDatabase");
- (NSArray *)loadAllConversationsFromDatabase;

2、/*!
@method
@brief 保存聊天消息到DB
@param message 待保存的聊天消息
@return 是否成功保存聊天消息
@discussion 
消息会直接保存到数据库中,并不会调用相关回调方法;
若希望调用相关回调方法,请使用insertMessageToDB:append2Chat:
*/
- (BOOL)saveMessage:(EMMessage *)message EM_DEPRECATED_IOS(2_0_6, 2_1_1, "Use - insertMessageToDB:");
- (BOOL)insertMessageToDB:(EMMessage *)message;

3、/*!
@method
@brief 导入聊天消息
@param message 待导入的聊天消息
@param append2Chat 是否调用相关回调方法
@return 是否成功导入聊天消息
*/
- (BOOL)importMessage:(EMMessage *)message
          append2Chat:(BOOL)append2Chat  EM_DEPRECATED_IOS(2_0_6, 2_1_1, "Use - insertMessageToDB:append2Chat:");

- (BOOL)insertMessageToDB:(EMMessage *)message
              append2Chat:(BOOL)append2Chat;

4、/*!
@method
@brief 保存一组聊天消息
@param messages 待保存的聊天消息列表
@return 成功保存的聊天消息条数
*/
- (NSInteger)saveMessages:(NSArray *)messages EM_DEPRECATED_IOS(2_0_6, 2_1_1, "Use - insertMessagesToDB:");

- (NSInteger)insertMessagesToDB:(NSArray *)messages;
</code></pre>

### EMConversation

<pre class="hll"><code class="language-java">
1、/*!
@method
@brief 删除会话对象和数据库中相关联的某一条消息
@discussion 如果此消息不属于或不存在于此会话, 则不会进行删除
@param aMessageId 将要删除的消息ID
@result 是否成功删除此消息
*/
- (BOOL)removeMessage:(NSString *)aMessageId EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Delete");
- (BOOL)removeMessageWithId:(NSString *)aMessageId;

2、/*!
@method
@brief 删除会话对象和数据库中相关联的某几条消息
@discussion 如果消息不属于或不存在于此会话, 则不会进行删除相应的消息
@param aMessageIds 将要删除的消息ID列表
@result 成功删除的消息条数
*/
- (NSUInteger)removeMessages:(NSArray *)aMessageIds EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use - removeMessagesWithIds:");
- (NSUInteger)removeMessagesWithIds:(NSArray *)aMessageIds;

3、/*!
@method
@brief 根据消息ID从数据库中加载消息
@discussion 如果数据库中没有这条消息, 方法返回nil
@param aMessageId 消息ID
@result 加载的消息
*/
- (EMMessage *)loadMessage:(NSString *)aMessageId EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use - loadMessageWithId:");
- (EMMessage *)loadMessageWithId:(NSString *)aMessageId;

4、/*!
@method
@brief 根据消息ID列表从数据库中加载消息
@discussion 如果数据库中没有某条消息对应的ID, 则不加载这条消息
@param aMessageIds 消息ID列表
@result 加载的消息列表
*/
- (NSArray *)loadMessages:(NSArray *)aMessageIds EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use - loadMessagesWithIds:");
- (NSArray *)loadMessagesWithIds:(NSArray *)aMessageIds;

5、/*!
@method
@brief 把本对话里的所有消息标记为已读/未读
@param isRead 已读或未读
@result 成功标记的消息条数
*/
- (NSUInteger)markMessagesAsRead:(BOOL)isRead EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use - markAllMessagesAsRead:");
- (BOOL)markAllMessagesAsRead:(BOOL)isRead;
</code></pre>

### EMMessage

<pre class="hll"><code class="language-java">
1、/*!
@property
@brief 是否接收到了接收方的阅读回执, 或是否已发送了阅读回执给对方
@discussion 针对发送的消息, 当接收方读了消息后, 会发回已读回执, 接收到了已读回执, 此标记位会被置为YES; 
针对接收的消息, 发送了阅读回执后, 此标记会被置为YES
*/
@property (nonatomic) BOOL isAcked EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use -isReadAcked");
@property (nonatomic) BOOL isReadAcked;

2、/*!
@property
@brief 对于发送方来说, 该值表示:接收方是否已收到了消息, 对于接收方来说, 表示:接收方是否已发送了"已接收回执" 给对方
@discussion 针对发送的消息, 当接收方读了消息后, 会发回已读回执, 接收到了已读回执, 此标记位会被置为YES;
针对接收的消息, 发送了阅读回执后, 此标记会被置为YES
*/
@property (nonatomic) BOOL isDelivered EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use -isDeliveredAcked");
@property (nonatomic) BOOL isDeliveredAcked;
</code></pre>

### IEMFileMessageBody

<pre class="hll"><code class="language-java">
/*!
@enum
@brief 附件下载的状态
@constant eAttachmentDownloading       正在下载
@constant eAttachmentDownloadSuccessed 下载成功
@constant eAttachmentDownloadFailure   下载失败
@constant eAttachmentNone              未下载
*/
typedef enum : NSUInteger {
	EMAttachmentDownloading,
	EMAttachmentDownloadSuccessed,
	EMAttachmentDownloadFailure,
	EMAttachmentNotStarted,
} EMAttachmentDownloadStatus;
</code></pre>

### IChatManagerPushNotification

<pre class="hll"><code class="language-java">
/*!
@property
@brief     已屏蔽接收推送消息的群ID列表
*/
@property (nonatomic, strong, readonly) NSArray *ignoredGroupList EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Use - ignoredGroupIds");
@property (nonatomic, strong, readonly) NSArray *ignoredGroupIds;
</code></pre>


## Delete api

### EMConversation

<pre class="hll"><code class="language-java">
1、/*!
@property
@brief 此会话中的消息列表
*/
@property (nonatomic, strong, readonly) NSArray *messages EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Delete");

2、/*!
@property
@brief 是否接收关于此会话的消息
*/
@property (nonatomic, readwrite) BOOL enableReceiveMessage EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Delete");
</code></pre>

### EMMessage

<pre class="hll"><code class="language-java">
/*!
@property
@brief 消息所属的对话对象
*/
@property (nonatomic, weak) EMConversation *conversation EM_DEPRECATED_IOS(2_0_0, 2_1_1, "Delete");
</code></pre>