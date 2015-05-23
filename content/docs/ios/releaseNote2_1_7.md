---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.7 release note

## Bug fix

1. sdk的bug：登录后，免打扰群组列表获取有延迟；

2. demo的bug：连续播放音频时可能crash；

3. demo的bug：iPhone4上，点击重发按钮，重发按钮不会立刻消失。相应的修改代码在demo的重发操作里；

## SDK内部细节调整

1.	将语音的录制和播放相关代码从SDK中开源出来了，SDK不再管理相关代码，请开发者自由定制；

2.	请使用EaseMob单实例引用callManager. 在从2.1.7版本开始不会提供EMSDKFull及其头文件. EMSDKFull的功能将整合进EaseMob中；

3.	登录操作返回的错误码调整：
EMErrorServerTooManyOperations(已经登录或者正在登录)，
EMErrorNetworkNotConnected(未连网)，
EMErrorInvalidUsername_NULL(用户名为空), 
EMErrorInvalidUsername_Chinese(用户名是中文), 
EMErrorServerAuthenticationFailure(用户名或密码错误),
EMErrorServerNotReachable(未连接到服务器)，
EMErrorConfigInvalidAppKey(appkey不可用), 
MErrorServerTimeout(超时)
其他的error类型统称登录失败

## 新功能大放送

1.	聊天室，大家期待已久的聊天室上线了。

在环信demo的源代码中，Chatroom文件夹下是关于聊天室接口的使用示例。


## new api

A、EMConversation
<pre class="hll">
/*!
@method
@brief 根据消息id加载它之前的指定条数消息
@param aCount 要加载的消息条数
@param messageId 消息id，如果传nil就是取最后一条消息
@discussion
加载后的消息按照升序排列;
@result 加载的消息列表
*/
- (NSArray *)loadNumbersOfMessages:(NSUInteger)aCount withMessageId:(NSString *)messageId;
</pre>

B、IChatManagerChatroom

该头文件中所有的接口都是新添加的

C、EMChatManagerChatroomDelegate

该头文件中所有的回调接口都是新添加的

D、EMChatManagerDefs
<pre class="hll">
/*
@brief 会话类型
@constant eConversationTypeChat            单聊会话
@constant eConversationTypeGroupChat       群聊会话
@constant eConversationTypeChatRoom        聊天室会话
*/
typedef NS_ENUM(NSInteger, EMConversationType){
eConversationTypeChat,
eConversationTypeGroupChat,
eConversationTypeChatRoom
};

/*
@brief 会话类型
@constant eConversationTypeChat            单聊会话
@constant eConversationTypeGroupChat       群聊会话
@constant eConversationTypeChatRoom        聊天室会话
*/
typedef NS_ENUM(NSInteger, EMConversationType){
eConversationTypeChat,
eConversationTypeGroupChat,
eConversationTypeChatRoom
};
</pre>
 
 
##	change api

A、IChatManagerConversation
<pre class="hll">
/*!
@method
@brief 获取所有conversation的未读消息数量
@discussion
@result 未读消息数量
*/
- (NSUInteger)totalUnreadMessagesCount EM_DEPRECATED_IOS(2_1_0, 2_1_6, "Use - loadTotalUnreadMessagesCountFromDatabase");

/*!
@method
@brief 获取某个用户的会话
@discussion
此方法获取会话的顺序如下:
1. 查找内存会话列表中的会话;
2. 如果没找到, 试图从数据库中查找此条会话;
3. 如果仍没找到, 创建一个新的会话, 加到会话列表中, 并触发didUpdateConversationList:回调
@param chatter 需要获取会话对象的用户名, 对于群组, 则是群组ID
@result 会话对象
*/
- (EMConversation *)conversationForChatter:(NSString *)chatter
isGroup:(BOOL)isGroup EM_DEPRECATED_IOS(2_0_0, 2_1_6, "Use - conversationForChatter:conversationType");

/*!
@method
@brief 获取某个用户的会话
@discussion
此方法获取会话的顺序如下:
1. 查找内存会话列表中的会话;
2. 如果没找到, 试图从数据库中查找此条会话;
3. 如果仍没找到, 创建一个新的会话, 加到会话列表中, 并触发didUpdateConversationList:回调
@param chatter 需要获取会话对象的用户名, 对于群组是群组ID，聊天室则是聊天室ID
@result 会话对象
*/
- (EMConversation *)conversationForChatter:(NSString *)chatter
conversationType:(EMConversationType)type;
</pre>

B、IChatManagerChat
<pre class="hll">
/*!
@method
@brief 发送一个"已读消息"(在UI上显示了或者阅后即焚的销毁的时候发送)的回执到服务器
@discussion
@param message 从服务器收到的消息
@result
*/
- (void)sendHasReadResponseForMessage:(EMMessage *)message EM_DEPRECATED_IOS(2_0_0, 2_1_6, "Use - sendReadAckForMessage:");
</pre>

C、EMConversation
<pre class="hll">
/*!
@property
@brief 是否是群聊
*/
@property (nonatomic, readonly) BOOL isGroup EM_DEPRECATED_IOS(2_0_0, 2_1_6, "Use - conversationType");
</pre>

D、EMMessage
<pre class="hll">
/*!
@property
@brief 此消息是否是群聊消息
*/
@property (nonatomic) BOOL isGroup EM_DEPRECATED_IOS(2_0_0, 2_1_6, "Use - messageType");
</pre>