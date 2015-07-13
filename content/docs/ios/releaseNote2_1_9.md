---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.9 release note


## bug fix
1. demo bug: 好友删除, 对应的会话不被删除。

## SDK内部细节调整

1. 使用SDK后，在沙盒中生成的存储数据的文件夹，不同步到iCloud;

2. 自动登录流程：

 step1、自动登录开始前，会发送回调[willAutoLoginWithInfo: error:];
 
 step2、自动登录结束或出错后，发送回调[didAutoLoginWithInfo: error:]。
 
 step3、如果自动登录结束回调里的error不为nil，分为3种情况操作
 
		(A) EMErrorServerTimeout || EMErrorServerNotReachable || EMErrorNetworkNotConnected || EMErrorServerMaxCountExceeded 表示sdk中自动登录操作还未终止，sdk将在下次网络变化时尝试重新自动登录，如果你不想继续进行自动登录，调用[logoffWithUnbindDeviceToken: error:]终止自动登录；
		
		(B)EMErrorServerTooManyOperations 表示已经在登录中，你可以不进行任何操作；
		
		(C)其余类型的error，表示sdk内部已经终止了自动登录操作。

3. 接收离线消息的回调接口有所调整，现在的流程是这样的：

   step1、sdk中接收到第一条离线消息时，会发送回调[willReceiveOfflineMessages]以通知开始接收离线消息了；
   
   step2、接收过程中，每隔3秒调用 [didReceiveOfflineMessages:] 和 [didReceiveOfflineCmdMessages:]以通知刷新页面；
   
   step3、接受结束后，sdk会发送回调[didFinishedReceiveOfflineMessages] 和 [didFinishedReceiveOfflineCmdMessages]以通知离线消息接受完了。

## 新功能大放送

1.	环信小助手功能，可自动回复，在demo中有体现。

## new api

### IChatManagerRobot

add理由: 新功能

### IChatManagerRobot

add理由: 新功能

### EMRobot

add理由: 新功能

### ICallManagerCall

add理由: 显示视频实时通话的各种参数

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief  获取实时视频的延迟ms，实时变化
 */
- (int)getVideoTimedelay;

/*!
 @method
 @brief  获取实时视频的帧率，实时变化
 */
- (int)getVideoFramerate;

/*!
 @method
 @brief  获取实时视频时，每100包丢失的包数，实时变化
 */
- (int)getVideoLostcnt;

/*!
 @method
 @brief  获取实时视频的宽度，固定值，不会实时变化
 */
- (int)getVideoWidth;

/*!
 @method
 @brief  获取实时视频的高度，固定值，不会实时变化
 */
- (int)getVideoHeight;

</code></pre>

## change api

### EMChatManagerChatDelegate

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 离线透传消息接收完成的回调
 @discussion
 @param offlineCmdMessages 接收到的离线透传消息列表
 @result
 */
- (void)didFinishedReceiveOfflineCmdMessages:(NSArray *)offlineCmdMessages EM_DEPRECATED_IOS(2_1_5,2_1_8,"使用didFinishedReceiveOfflineCmdMessages标识离线消息结束，离线CMD全部通过didReceiveOfflineCmdMessages返回");

/*!
 @method
 @brief 离线非透传消息接收完成的回调
 @discussion
 @param offlineMessages 接收到的离线列表
 @result
 */
- (void)didFinishedReceiveOfflineMessages:(NSArray *)offlineMessages EM_DEPRECATED_IOS(2_1_5,2_1_8,"使用didFinishedReceiveOfflineMessages标识离线消息结束，离线消息全部通过didReceiveOfflineMessages返回");
</code></pre>

## delete api

### IChatManagerGroup

	delete理由: SDK只支持默认同意建群邀请
	
<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 接受并加入群组
 @param groupId 所接受的群组ID
 @param pError  错误信息
 @result 返回所加入的群组对象
 */
- (EMGroup *)acceptInvitationFromGroup:(NSString *)groupId
                                 error:(EMError **)pError EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 异步方法, 接受并加入群组
 @param groupId 所接受的群组ID
 @discussion
        函数执行后, didAcceptInvitationFromGroup:error:回调会被触发
 */
- (void)asyncAcceptInvitationFromGroup:(NSString *)groupId EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 异步方法, 接受并加入群组
 @param groupId    所接受的群组ID
 @param completion 消息完成后的回调
 @param aQueue     回调执行时的线程
 */
- (void)asyncAcceptInvitationFromGroup:(NSString *)groupId
                            completion:(void (^)(EMGroup *group,
                                                 EMError *error))completion
                               onQueue:(dispatch_queue_t)aQueue EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 拒绝一个加入群组的邀请
 @param groupId  被拒绝的群组ID
 @param username 被拒绝的人
 @param reason   拒绝理由
 */
- (void)rejectInvitationForGroup:(NSString *)groupId
                       toInviter:(NSString *)username
                          reason:(NSString *)reason EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");
</code></pre>

### IChatManagerChat

	delete理由: SDK不支持转发消息
	
<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 将某一条消息转发给另一个聊天用户
 @discussion
 @param message     需要转发的消息对象
 @param ext         转发时需要修改的ext(原有需要转发的message的ext不会进行转发)
 @param username    需要转发给聊天对象的username
 @param isGroup  是否是转发到一个群组
 @param progress    发送多媒体信息时的progress回调对象
 @param pError      错误信息
 @result 发送的消息对象
 */
- (EMMessage *)forwardMessage:(EMMessage *)message
                          ext:(NSDictionary *)ext
                           to:(NSString *)username
                      isGroup:(BOOL)isGroup
                     progress:(id<IEMChatProgressDelegate>)progress
                        error:(EMError **)pError EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 异步方法, 将某一条消息转发给另一个聊天用户
 @discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改. 在发送过程中, EMChatManagerChatDelegate中的willSendMessage:error:和didSendMessage:error:这两个回调会被触发
 @param message     需要转发的消息对象
 @param ext         转发时需要修改的ext(原有需要转发的message的ext不会进行转发)
 @param username    需要转发给聊天对象的username
 @param isGroup  是否是转发到一个群组
 @param progress    发送多媒体信息时的progress回调对象
 @result 发送的消息对象(因为是异步方法, 不能作为发送完成或发送成功失败与否的判断)
 */
- (EMMessage *)asyncForwardMessage:(EMMessage *)message
                               ext:(NSDictionary *)ext
                                to:(NSString *)username
                           isGroup:(BOOL)isGroup
                          progress:(id<IEMChatProgressDelegate>)progress EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 异步方法, 将某一条消息转发给另一个聊天用户
 @discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改.
 @param message     需要转发的消息对象
 @param ext         转发时需要修改的ext(原有需要转发的message的ext不会进行转发)
 @param username    需要转发给聊天对象的username
 @param isGroup     是否是转发到一个群组
 @param progress    发送多媒体信息时的progress回调对象
 @param prepare          将要发送消息前的回调block
 @param aPrepareQueue    回调block时的线程
 @param completion       发送消息完成后的回调
 @param aCompletionQueue 回调block时的线程
 @result 发送的消息对象(因为是异步方法, 不能作为发送完成或发送成功失败与否的判断)
 */
- (EMMessage *)asyncForwardMessage:(EMMessage *)message
                               ext:(NSDictionary *)ext
                                to:(NSString *)username
                           isGroup:(BOOL)isGroup
                          progress:(id<IEMChatProgressDelegate>)progress
                           prepare:(void (^)(EMMessage *message,
                                             EMError *error))prepare
                           onQueue:(dispatch_queue_t)aPrepareQueue
                        completion:(void (^)(EMMessage *message,
                                             EMError *error))completion
                           onQueue:(dispatch_queue_t)aCompletionQueue EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 将某一条消息转发给另一个聊天用户
 @discussion
 @param message     需要转发的消息对象
 @param ext         转发时需要修改的ext(原有需要转发的message的ext不会进行转发)
 @param username    需要转发给聊天对象的username
 @param type        转发对象的类型
 @param progress    发送多媒体信息时的progress回调对象
 @param pError      错误信息
 @result 发送的消息对象
 */
- (EMMessage *)forwardMessage:(EMMessage *)message
                          ext:(NSDictionary *)ext
                           to:(NSString *)username
                  messageType:(EMMessageType)type
                     progress:(id<IEMChatProgressDelegate>)progress
                        error:(EMError **)pError EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 异步方法, 将某一条消息转发给另一个聊天用户
 @discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改. 在发送过程中, EMChatManagerChatDelegate中的willSendMessage:error:和didSendMessage:error:这两个回调会被触发
 @param message     需要转发的消息对象
 @param ext         转发时需要修改的ext(原有需要转发的message的ext不会进行转发)
 @param username    需要转发给聊天对象的username
 @param type        转发对象的类型
 @param progress    发送多媒体信息时的progress回调对象
 @result 发送的消息对象(因为是异步方法, 不能作为发送完成或发送成功失败与否的判断)
 */
- (EMMessage *)asyncForwardMessage:(EMMessage *)message
                               ext:(NSDictionary *)ext
                                to:(NSString *)username
                       messageType:(EMMessageType)type
                          progress:(id<IEMChatProgressDelegate>)progress EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");

/*!
 @method
 @brief 异步方法, 将某一条消息转发给另一个聊天用户
 @discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改.
 @param message     需要转发的消息对象
 @param ext         转发时需要修改的ext(原有需要转发的message的ext不会进行转发)
 @param username    需要转发给聊天对象的username
 @param type        转发对象的类型
 @param progress    发送多媒体信息时的progress回调对象
 @param prepare          将要发送消息前的回调block
 @param aPrepareQueue    回调block时的线程
 @param completion       发送消息完成后的回调
 @param aCompletionQueue 回调block时的线程
 @result 发送的消息对象(因为是异步方法, 不能作为发送完成或发送成功失败与否的判断)
 */
- (EMMessage *)asyncForwardMessage:(EMMessage *)message
                               ext:(NSDictionary *)ext
                                to:(NSString *)username
                       messageType:(EMMessageType)type
                          progress:(id<IEMChatProgressDelegate>)progress
                           prepare:(void (^)(EMMessage *message,
                                             EMError *error))prepare
                           onQueue:(dispatch_queue_t)aPrepareQueue
                        completion:(void (^)(EMMessage *message,
                                             EMError *error))completion
                           onQueue:(dispatch_queue_t)aCompletionQueue EM_DEPRECATED_IOS(2_0_3, 2_1_8, "Delete");
</code></pre>



