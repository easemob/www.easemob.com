---
title: 环信
sidebar: iossidebar
secondnavios: true
---

#群聊：

##收发消息及聊天记录相关等
这部分与单聊是一样的，详情见单聊[http://developer.easemob.com/docs/ios/singlechat](http://developer.easemob.com/docs/ios/singlechat)

##新建群组

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief  创建群组（同步方法）
	 @param subject        群组名称
	 @param description    群组描述
	 @param invitees       默认群组成员（usernames）
	 @param welcomeMessage 群组欢迎语
	 @param styleSetting   群组属性配置
	 @param pError          建组的错误。成功为nil
	 @return 创建好的群组
	 @discussion
	        创建群组成功 判断条件：*pError == nil && returnGroup != nil
	 */
	- (EMGroup *)createGroupWithSubject:(NSString *)subject
	                        description:(NSString *)description
	                           invitees:(NSArray *)invitees
	              initialWelcomeMessage:(NSString *)welcomeMessage
	                       styleSetting:(EMGroupStyleSetting *)styleSetting
	                              error:(EMError **)pError;

	/*!
	 @method
	 @brief  创建群组（异步方法）。
	 @param subject        群组名称
	 @param description    群组描述
	 @param invitees       默认群组成员（usernames）
	 @param welcomeMessage 群组欢迎语
	 @param styleSetting   群组属性配置
	 @discussion
	        函数执行完, 回调[group:didCreateWithError:]会被触发
	 */
	- (void)asyncCreateGroupWithSubject:(NSString *)subject
	                        description:(NSString *)description
	                           invitees:(NSArray *)invitees
	              initialWelcomeMessage:(NSString *)welcomeMessage
	                       styleSetting:(EMGroupStyleSetting *)styleSetting;
	
	/*!
	 @method
	 @brief  创建群组（异步方法）。
	 @param subject        群组名称
	 @param description    群组描述
	 @param invitees       默认群组成员（usernames）
	 @param welcomeMessage 群组欢迎语
	 @param styleSetting   群组属性配置
	 @param completion     创建完成后的回调
	 @param aQueue         回调block时的线程
	 @discussion
	        创建群组成功 判断条件：completion中，error == nil && group != nil
	        函数执行完, 会调用参数completion
	 */
	- (void)asyncCreateGroupWithSubject:(NSString *)subject
	                        description:(NSString *)description
	                           invitees:(NSArray *)invitees
	              initialWelcomeMessage:(NSString *)welcomeMessage
	                       styleSetting:(EMGroupStyleSetting *)styleSetting
	                         completion:(void (^)(EMGroup *group,
	                                              EMError *error))completion
	                            onQueue:(dispatch_queue_t)aQueue;
	                            
</code></pre>
	
调用示例

<pre class="hll"><code class="language-objective_c">
	EMGroupStyleSetting *setting = [[EMGroupStyleSetting alloc] init];
	setting.groupStyle = eGroupStyle_PublicOpenJoin;
	//setting.groupStyle = eGroupStyle_PrivateOnlyOwnerInvite;
	[[EaseMob sharedInstance].chatManager asyncCreateGroupWithSubject:(群组标题) description:(群组描述) invitees:(群组初始化成员，不需要包括创建者) initialWelcomeMessage:(邀请信息) styleSetting:setting completion:^(EMGroup *group, EMError *error) {
	        //code
	    } onQueue:nil];
</code></pre>

##群组加人

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 邀请用户加入群组
	 @param occupants      被邀请的用户名列表
	 @param groupId        群组ID
	 @param welcomeMessage 欢迎信息
	 @param pError         错误信息
	 @result 返回群组对象, 失败返回空
	 */
	- (EMGroup *)addOccupants:(NSArray *)occupants
	                  toGroup:(NSString *)groupId
	           welcomeMessage:(NSString *)welcomeMessage
	                    error:(EMError **)pError;

	/*!
	 @method
	 @brief 异步方法, 邀请用户加入群组
	 @param occupants      被邀请的用户名列表
	 @param groupId        群组ID
	 @param welcomeMessage 欢迎信息
	 @discussion
	        函数执行完, 回调group:didAddOccupants:welcomeMessage:error:会被触发
	 */
	- (void)asyncAddOccupants:(NSArray *)occupants
	                  toGroup:(NSString *)groupId
	           welcomeMessage:(NSString *)welcomeMessage;

	/*!
	 @method
	 @brief 异步方法, 邀请用户加入群组
	 @param occupants      被邀请的用户名列表
	 @param groupId        群组ID
	 @param welcomeMessage 欢迎信息
	 @param completion     消息完成后的回调
	 @param aQueue         回调block时的线程
	 */
	- (void)asyncAddOccupants:(NSArray *)occupants
	                  toGroup:(NSString *)groupId
	           welcomeMessage:(NSString *)welcomeMessage
	               completion:(void (^)(NSArray *occupants,
	                                    EMGroup *group,
	                                    NSString *welcomeMessage,
	                                    EMError *error))completion
	                  onQueue:(dispatch_queue_t)aQueue;
	
</code></pre>

调用示例

<pre class="hll"><code class="language-objective_c">
	EMError *error;
	EMGroup *chatGroup = [[EaseMob sharedInstance].chatManager addOccupants:(被邀请的用户名列表) toGroup:(groupId) welcomeMessage:@"欢迎加入" error:&error];

</code></pre>

##群组踢人

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 将某人请出群组
	 @param occupant 要请出群组的人的用户名
	 @param groupId  群组ID
	 @param pError   错误信息
	 @result 返回群组对象
	 @discussion
	        此操作需要admin/owner权限
	 */
	- (EMGroup *)removeOccupant:(NSString *)occupant
	                  fromGroup:(NSString *)groupId
	                      error:(EMError **)pError;

	/*!
	 @method
	 @brief 异步方法, 将某人请出群组
	 @param occupant 要请出群组的人的用户名
	 @param groupId  群组ID
	 @discussion
	        此操作需要admin/owner权限.
	        函数执行完, group:didRemoveOccupant:error:回调会被触发
	 */
	- (void)asyncRemoveOccupant:(NSString *)occupant
	                  fromGroup:(NSString *)groupId;

	/*!
	 @method
	 @brief 异步方法, 将某人请出群组
	 @param occupant   要请出群组的人的用户名
	 @param groupId    群组ID
	 @param completion 消息完成后的回调
	 @param aQueue     回调block时的线程
	 @discussion
	        此操作需要admin/owner权限
	 */
	- (void)asyncRemoveOccupant:(NSString *)occupant
	                  fromGroup:(NSString *)groupId
	                 completion:(void (^)(EMGroup *group,
	                                      EMError *error))completion
	                    onQueue:(dispatch_queue_t)aQueue;

</code></pre>

调用示例

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncRemoveOccupant:(要请出群组的人的用户名) fromGroup:(groupId) completion:^(EMGroup *group, EMError *error) {
	                        //code
	                    } onQueue:nil];
</code></pre>

##退出群组

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 退出群组
	 @param groupId  群组ID
	 @param pError   错误信息
	 @result 退出的群组对象, 失败返回nil
	 */
	- (EMGroup *)leaveGroup:(NSString *)groupId
	                  error:(EMError **)pError;

	/*!
	 @method
	 @brief 异步方法, 退出群组
	 @param groupId  群组ID
	 @discussion
	 函数执行完, 回调group:didLeave:error:会被触发
	 */
	- (void)asyncLeaveGroup:(NSString *)groupId;

	/*!
	 @method
	 @brief 异步方法, 退出群组
	 @param groupId  群组ID
	 @param completion 消息完成后的回调
	 @param aQueue     回调block时的线程
	 */
	- (void)asyncLeaveGroup:(NSString *)groupId
	             completion:(void (^)(EMGroup *group,
	                                  EMGroupLeaveReason reason,
	                                  EMError *error))completion
	                onQueue:(dispatch_queue_t)aQueue;
</code></pre>	

调用示例

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncLeaveGroup:(groupId) completion:^(EMGroup *group, EMGroupLeaveReason reason, EMError *error) {
	        //code
	    } onQueue:nil];
</code></pre>

##解散群组

**需要创建者权限**

接口及用法同<5、退出群聊>，SDK中会判断调用者是否是创建者，如果是则解散群组。  

##群组事件监听

**前提条件**

注册为 [EaseMob sharedInstance].chatManager 的代理。
调用哪种类型的接口能监听到对应的回调方法，请看接口方法注释

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 创建一个群组后的回调
	 @param group 所创建的群组对象
	 @param error 错误信息
	 @discussion
	 */
	- (void)group:(EMGroup *)group didCreateWithError:(EMError *)error;
	
	/*!
	 @method
	 @brief 离开一个群组后的回调
	 @param group  所要离开的群组对象
	 @param reason 离开的原因
	 @param error  错误信息
	 @discussion
	        离开的原因包含主动退出, 被别人请出, 和销毁群组三种情况
	 */
	- (void)group:(EMGroup *)group didLeave:(EMGroupLeaveReason)reason error:(EMError *)error;
	
	/*!
	 @method
	 @brief 群组信息更新后的回调
	 @param group 发生更新的群组
	 @param error 错误信息
	 @discussion
	        当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调
	 */
	- (void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error;
	
	/*!
	 @method
	 @brief 收到了其它群组的加入邀请
	 @param groupId  群组ID
	 @param username 邀请人名称
	 @param message  邀请信息
	 @discussion
	 */
	- (void)didReceiveGroupInvitationFrom:(NSString *)groupId
	                              inviter:(NSString *)username
	                              message:(NSString *)message;
	
	/*!
	 @method
	 @brief 接受群组邀请后的回调
	 @param group 所接受的群组
	 @param error 错误信息
	 */
	- (void)didAcceptInvitationFromGroup:(EMGroup *)group
	                               error:(EMError *)error;
	
	/*!
	 @method
	 @brief 邀请别人加入群组, 但被别人拒绝后的回调
	 @param groupId  群组ID
	 @param username 拒绝的人的用户名
	 @param reason   拒绝理由
	 */
	- (void)didReceiveGroupRejectFrom:(NSString *)groupId
	                          invitee:(NSString *)username
	                           reason:(NSString *)reason;
	
	/*!
	 @method
	 @brief 收到加入群组的申请
	 @param groupId         要加入的群组ID
	 @param groupname   申请人的用户名
	 @param username   申请人的昵称
	 @param reason          申请理由
	 */
	- (void)didReceiveApplyToJoinGroup:(NSString *)groupId
	                         groupname:(NSString *)groupname
	                     applyUsername:(NSString *)username
	                            reason:(NSString *)reason;
	
	/*!
	 @method
	 @brief 申请加入群组，被拒绝后的回调
	 @param fromId          拒绝的人的ID
	 @param groupname       申请加入的群组名称
	 @param reason          拒绝理由
	 */
	- (void)didReceiveRejectApplyToJoinGroupFrom:(NSString *)fromId
	                                   groupname:(NSString *)groupname
	                                      reason:(NSString *)reason;
	
	/*!
	 @method
	 @brief 申请加入群组，同意后的回调
	 @param groupId         申请加入的群组的ID
	 @param groupname       申请加入的群组名称
	 */
	- (void)didReceiveAcceptApplyToJoinGroup:(NSString *)groupId
	                               groupname:(NSString *)groupname;
	
	/*!
	 @method
	 @brief 群组列表变化后的回调
	 @param groupList 新的群组列表
	 @param error     错误信息
	 */
	- (void)didUpdateGroupList:(NSArray *)groupList
	                     error:(EMError *)error;
	
	/*!
	 @method
	 @brief 获取所有公开群组后的回调
	 @param groups 公开群组列表
	 @param error  错误信息
	 */
	- (void)didFetchAllPublicGroups:(NSArray *)groups
	                          error:(EMError *)error;
	
	/*!
	 @method
	 @brief 获取群组信息后的回调
	 @param group 群组对象
	 @param error 错误信息
	 */
	- (void)didFetchGroupInfo:(EMGroup *)group
	                    error:(EMError *)error;
	
	/*!
	 @method
	 @brief 加入公开群组后的回调
	 @param group 群组对象
	 @param error 错误信息
	 */
	- (void)didJoinPublicGroup:(EMGroup *)group
	                     error:(EMError *)error;
	
	/*!
	 @method
	 @brief 申请加入公开群组后的回调
	 @param group 群组对象
	 @param error 错误信息
	 */
	- (void)didApplyJoinPublicGroup:(EMGroup *)group
	                          error:(EMError *)error;
</code></pre>
	                          
##获取与自己相关的群组列表（加入或者创建的）

接口

<pre class="hll"><code class="language-objective_c">
	/**
	 @brief  获取与我相关的群组列表（自己创建的，加入的）(同步方法)
	 @param pError 获取错误信息
	 @return 群组列表
	 @discussion
	        获取列表成功 判断条件：*pError == nil && returnArray != nil
	 */
	- (NSArray *)fetchMyGroupsListWithError:(EMError **)pError;
	
	/*!
	 @method
	 @brief      获取与我相关的群组列表（自己创建的，加入的）(异步方法)
	 @discussion    
	        执行后, 回调[didUpdateGroupList:error]会被触发
	 */
	- (void)asyncFetchMyGroupsList;
	
	/*!
	 @method
	 @brief 获取与我相关的群组列表（自己创建的，加入的）(异步方法)
	 @param completion 消息完成后的回调
	 @param aQueue     回调block时的线程
	 @discussion
	        获取列表成功 判断条件：completion中，error == nil && groups != nil
	 */
	- (void)asyncFetchMyGroupsListWithCompletion:(void (^)(NSArray *groups,
	                                                  EMError *error))completion
	                                onQueue:(dispatch_queue_t)aQueue;
	
</code></pre>

调用示例

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncFetchMyGroupsListWithCompletion:^(NSArray *groups, EMError *error) {
        //code
    } onQueue:nil];
</code></pre>
    
##获取公开群组列表

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 获取所有公开群组
	 @param pError 错误信息
	 @return 获取的所有群组列表
	 */
	- (NSArray *)fetchAllPublicGroupsWithError:(EMError **)pError;
	
	/*!
	 @method
	 @brief 异步方法, 获取所有公开群组
	 @discussion
	        执行后, 回调didFetchAllPublicGroups:error:会被触发
	 */
	- (void)asyncFetchAllPublicGroups;
	
	/*!
	 @method
	 @brief 异步方法, 获取所有公开群组
	 @param completion 消息完成后的回调
	 @param aQueue     回调block时的线程
	 */
	- (void)asyncFetchAllPublicGroupsWithCompletion:(void (^)(NSArray *groups,
	                                                          EMError *error))completion
	                                        onQueue:(dispatch_queue_t)aQueue;
</code></pre>
	                                        
调用示例

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncFetchAllPublicGroupsWithCompletion:^(NSArray *groups, EMError *error) {
	        //code
	    } onQueue:nil];	   
</code></pre>	    

##搜索公开群组	 

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief  根据groupId搜索公开群(同步方法)
	 @param groupId  群组id(完整id)
	 @param pError   搜索失败的错误
	 @return 搜索到的群组
	 @discussion
	        搜索群组成功 判断条件：*pError == nil && returnGroup != nil
	 */
	- (EMGroup *)searchPublicGroupWithGroupId:(NSString *)groupId
	                                    error:(EMError **)pError;
	
	/*!
	 @method
	 @brief  根据groupId搜索公开群(异步方法)
	 @param groupId    公开群组的ID(完整id)
	 @param completion 消息完成后的回调
	 @param aQueue     回调block时的线程
	 @discussion
	        搜索群组成功 判断条件：completion中，error == nil && group != nil
	 */
	- (void)asyncSearchPublicGroupWithGroupId:(NSString *)groupId
	                               completion:(void (^)(EMGroup *group,
	                                                    EMError *error))completion
	                                  onQueue:(dispatch_queue_t)aQueue;
	                                        
</code></pre>

调用示例

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncSearchPublicGroupWithGroupId:(groupId) completion:^(EMGroup *group, EMError *error) {
        //code
    } onQueue:nil]; 
</code></pre>

##Apple Doc
[Apple Doc](http://developer.easemob.com/apidoc/IOS/chat/)

##Demo及SDK下载
[Demo及SDK下载](http://www.easemob.com/sdk/)