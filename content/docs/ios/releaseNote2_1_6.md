---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# SDK 2.1.6 release note

## SDK内部细节调整

1.	离线消息调整为3s调用一次回调，将3s内接收到的离线消息抛出；

2.	从sdk中获取所有会话conversation时，会将没有消息的conversation一起返回，请开发者自己在app层面自由定制；

3.	创建群组的同时默认添加群成员的操作
在2.1.6以前版本，默认群成员的操作是异步进行的，这样会出现群组创建成功了，但是群成员还没有添加完，这时去获取群信息就会出现信息不准确。
2.1.6版本将默认群成员操作改成同步进行，即创建群之后，调用同步添加群成员方法，群成员都添加完之后，才将整个创建方法结束。
2.1.6版本方法的弊端是默认群成员很多时，这个创建方法进行的时间会稍长，不能容忍的开发者，请在创建群组接口的默认成员参数传入nil，群组创建成功之后，自由定制是否异步进行加人操作。
其中创建群组的接口：[createGroupWithSubject:…], 加人的接口：[addOccupants:…]/[asyncAddOccupants:…]；

4.	从SDK数据库中load数据
SDK提供了一系列的从数据库中获取数据的方法，IOS的接口以load开头，比如[loadDataFromDatabase] ,[loadAllConversationsFromDatabaseWithAppend2Chat:] ,[loadAllMyGroupsFromDatabaseWithAppend2Chat:]。
IOS SDK在2.1.1版本开始，使用了sqlite，废弃了旧版的数据库，所以开发者们在写从2.1.0版本升级功能时，需要调用接口【importDataToNewDatabase】，在该接口成功之后，再调用load相关方法进行获取数据。
IOS SDK从2.1.6版本开始，不再在内部进行load相关方法，开发者可以根据自己的需求，自主定制调用load接口。比如，登录成功之后，你只想获取群组，那你就可以只调用[loadAllMyGroupsFromDatabaseWithAppend2Chat:]方法；如果你想获取所有数据，就要调用[loadDataFromDatabase] ，so easy。

5.	messageID统一由服务器生成，如果您之前使用demo的code，请将MessageModel的实现也做相应修改。


## IOS SDK性能优化：

1.	优化wifi && 非rely环境下的实时语音接通率；
2.	减小实时语音的静态库大小；

## 新功能大放送

1.	添加实时视频功能，beta版。
需要在demo中添加依赖库libc++.dylib，实时视频不支持后台运行。


2.	添加接口：离开群时是否自动删除群会话(Default is YES)，该接口的设置不会进行存储，需要开发者每次启动sdk之前设置一下

<pre class="hll">
[[EaseMob sharedInstance].chatManager isAutoDeleteConversationWhenLeaveGroup];
</pre>

## new api

A、IChatManagerSettingOptions
<pre class="hll">
/*!
 @property
 @brief 离开群时是否自动删除群会话(Default is YES)
 @discussion
 设置为YES时, 当离开该群时会自动删除该群对应的会话
 */
 @property (nonatomic) BOOL isAutoDeleteConversationWhenLeaveGroup;
</pre>

B、IChatManagerBuddy
<pre class="hll">
/*!
 @method
 @brief 异步方法，将username的用户加到黑名单（该用户不会被从好友中删除，若想删除，请自行调用删除接口）
 @param username        加入黑名单的用户username
 @param relationship    黑名单关系（both:双向都不接受消息；
                            from:能给黑名单中的人发消息，接收不到黑名单中的人发的消息;
                            to:暂不支持）
 @discussion
 函数执行完, 回调[didBlockBuddy:error:]会被触发
 */
- (void)asyncBlockBuddy:(NSString *)username
           relationship:(EMRelationship)relationship;

/*!
 @method
 @brief 异步方法，将username的用户加到黑名单（该用户不会被从好友中删除，若想删除，请自行调用删除接口）
 @param username       加入黑名单的用户username
 @param relationship   黑名单关系（both:双向都不接受消息；
                            from:能给黑名单中的人发消息，接收不到黑名单中的人发的消息;
                            to:暂不支持）
 @param completion     完成后的回调
 @param aQueue         回调block时的线程
 @discussion
 加黑名单成功 判断条件：completion中，error == nil 函数执行完, 会调用参数completion
 */
- (void)asyncBlockBuddy:(NSString *)username
           relationship:(EMRelationship)relationship
         withCompletion:(void (^)(NSString *username, EMError *error))completion
                                    onQueue:(dispatch_queue_t)aQueue;

/*!
 @method
 @brief 异步方法，将username的用户移出黑名单
 @param username        加入黑名单的用户username
 @discussion
 函数执行完, 回调[didUnblockBuddy:error:]会被触发
 */
- (void)asyncUnblockBuddy:(NSString *)username;

/*!
 @method
 @brief 异步方法，将username的用户移出黑名单
 @param username       加入黑名单的用户username
 @param completion     完成后的回调
 @param aQueue         回调block时的线程
 @discussion
 移出黑名单成功 判断条件：completion中，error == nil 函数执行完, 会调用参数completion
 */
- (void)asyncUnblockBuddy:(NSString *)username
         withCompletion:(void (^)(NSString *username, EMError *error))completion
                onQueue:(dispatch_queue_t)aQueue; 
</pre>
 
 
##	change api

A、EMChatManagerBuddyDelegate
<pre class="hll">
/*!
 @method
 @brief 将好友加到黑名单完成后的回调
 @discussion
 @param username    加入黑名单的好友
 @param pError      错误信息
 */
- (void)didBlockBuddy:(NSString *)username error:(EMError *)pError;

/*!
 @method
 @brief 将好友移出黑名单完成后的回调
 @discussion
 @param username    移出黑名单的好友
 @param pError      错误信息
 */
- (void)didUnblockBuddy:(NSString *)username error:(EMError *)pError;
</pre>