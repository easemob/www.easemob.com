---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 聊天室 

“聊天室”模型：

1、进入聊天页面之前，进行[加入聊天室操作](http://www.easemob.com/docs/ios/IOSSDKChatRoom/#join)；

2、成功进入聊天室之后，服务器会自动给推10条消息；

3、离开聊天页面之后，进行[退出聊天室操作](http://www.easemob.com/docs/ios/IOSSDKChatRoom/#leave)；

4、聊天室创建者owner可以进行[退出聊天室操作](http://www.easemob.com/docs/ios/IOSSDKChatRoom/#leave)；

5、支持最大成员5000;

6、环信的聊天室内仅有owner和游客;

7、不支持客户端建立聊天室;

8、不支持客户端邀请;

9、不支持REST邀请；

10、聊天室内成员离线后，服务器当监听到此成员不在线后不在会给此成员再发推送。

## REST {#rest}

* 支持建群
* curl -X POST "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms" -H "Authorization: Bearer azfuPA9RobgM8SXITeBtRnQOXDi8dU" -d '{"owner":"u1","members":["u1","u2"],"maxusers":5000,"groupname":"chatroom title","desc":"chatroom description"}'

* 支持查询所有APP聊天室
* curl -X GET "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms" -H "Authorization: Bearer azfuPA9RobgM8SXITeBtRnQOXDi8dU"

* 支持查询聊天室详情
* curl -X GET "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1430798028680235" -H "Authorization: Bearer azfuPA9RobgM8SXITeBtRnQOXDi8dU"

* 支持聊天室踢人
* curl -X DELETE 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1430798028680235/users/u2' -H "Authorization: Bearer azfuPA9RobgM8SXITeBtRnQOXDi8dU"

* 支持删除聊天室
* curl -X DELETE 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/143228117786605' -H "Authorization: Bearer azfuPA9RobgM8SXITeBtRnQOXDi8dU"

## 获取聊天室 {#fetch}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 获取range指定范围内的聊天室
@param range   获取聊天室的范围
@param pError  错误信息
@return        获取的聊天室列表
@discussion
这是一个阻塞方法，用户应当在一个独立线程中执行此方法，执行后, range被更新，location指向下一个范围的起点(> 0)，用户可以连续调用此方法以获得所有的聊天室
*/
- (NSArray *)fetchChatroomsInSliceRange:(NSRange *)range 
                              withError:(EMError **)pError;

/*!
@method
@brief 异步方法, 获取指定范围的聊天室
@param range       获取聊天室的范围
@param completion  消息完成后的回调
@param aQueue      调block时的线程
*/
- (void)asyncFetchChatroomsInRange:(NSRange)range 
                    withCompletion:(void (^)(NSArray *chatrooms, NSRange nextSliceRange, EMError *error))completion
                           onQueue:(dispatch_queue_t)aQueue;
</code></pre>

## 获取聊天室详情  {#fetchInfo}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 同步方法, 获取聊天室信息
@param chatroomId  聊天室ID
@param pError      错误信息
@return 聊天室
*/
- (EMChatroom *)fetchChatroomInfo:(NSString *)chatroomId 
                            error:(EMError **)pError;

/*!
@method
@brief 异步方法, 获取聊天室信息
@param chatroomId  群组ID
@param completion  完成后的回调
@param aQueue      回调block时的线程
*/
- (void)asyncFetchChatroomInfo:(NSString *)chatroomId
                    completion:(void (^)(EMChatroom *group, EMError *error))completion
                       onQueue:(dispatch_queue_t)aQueue;
</code></pre>

## 获取成员 {#fetchOccupants}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 同步方法, 获取聊天室成员列表，执行后, range被更新，location指向下一个范围的起点(> 0)，用户可以连续调用此方法以获得所有的成员
@param chatroomId  聊天室ID
@param range       获取成员的范围
@param pError      错误信息
@return  聊天室的成员列表
*/
- (NSArray *)fetchOccupantsForChatroom:(NSString *)chatroomId 
                          inSliceRange:(NSRange *)range 
                                 error:(EMError **)pError;

/*!
@method
@brief 同步方法, 获取聊天室成员列表
@param chatroomId  聊天室ID
@param completion 完成后的回调
@param aQueue     回调block时的线程
*/
- (void)asyncFetchOccupantsForChatroom:(NSString *)chatroomId
                          inSliceRange:(NSRange)range
                            completion:(void (^)(NSArray *occupantsList, NSRange nextSliceRange, EMError *error))completion
                               onQueue:(dispatch_queue_t)aQueue;
</code></pre>

## 加入聊天室 {#join}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 加入一个聊天室
@param chatroomId  聊天室的ID
@param pError      错误信息
@result 所加入的聊天室
@discussion
这是一个阻塞方法，用户应当在一个独立线程中执行此方法
*/
- (EMChatroom *)joinChatroom:(NSString *)chatroomId
                       error:(EMError **)pError;

/*!
@method
@brief 异步方法, 加入一个聊天室
@param chatroomId  聊天室的ID
@param completion  加入聊天室完成后的回调
@param aQueue      回调block时的线程
*/
- (void)asyncJoinChatroom:(NSString *)chatroomId
               completion:(void (^)(EMChatroom *chatroom, EMError *error))completion
                  onQueue:(dispatch_queue_t)aQueue;
</code></pre>

## 离开聊天室 {#leave}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 退出聊天室
@param chatroomId  聊天室ID
@param pError      错误信息
@result 退出的聊天室, 失败返回nil
@discussion
这是一个阻塞方法，用户应当在一个独立线程中执行此方法
*/
- (EMChatroom *)leaveChatroom:(NSString *)chatroomId
                        error:(EMError **)pError;

/*!
@method
@brief 异步方法, 退出聊天室
@param chatroomId  聊天室ID
@param completion  退出聊天室完成后的回调
@param aQueue      回调block时的线程
*/
- (void)asyncLeaveChatroom:(NSString *)chatroomId
                completion:(void (^)(EMChatroom *chatroom, EMError *error))completion
                   onQueue:(dispatch_queue_t)aQueue;
</code></pre>

## 聊天室相关的回调 {#delegate}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 有用户加入聊天室
@param chatroom    加入的聊天室
@param username    加入者名称
*/
- (void)chatroom:(EMChatroom *)chatroom occupantDidJoin:(NSString *)username;

/*!
@method
@brief 有用户离开聊天室
@param chatroom    离开的聊天室
@param username    离开者名称
*/
- (void)chatroom:(EMChatroom *)chatroom occupantDidLeave:(NSString *)username;

/*!
@method
@brief 被踢出聊天室
@param chatroom    被踢出的聊天室
*/
- (void)beKickedOutFromChatroom:(EMChatroom *)chatroom;

/*!
@method
@brief 收到加入聊天室的邀请
@param chatroomId  聊天室ID
@param username    邀请人名称
@param message     邀请信息
@discussion
*/
- (void)didReceiveChatroomInvitationFrom:(NSString *)chatroomId
                                 inviter:(NSString *)username
                                 message:(NSString *)message;
</code></pre>