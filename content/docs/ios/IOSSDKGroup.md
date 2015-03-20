---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 群组管理

群组分为两大类，四小类

<pre class="hll"><code class="language-java">
typedef enum{
    // 私有群组，不能被非群组成员看到
    eGroupStyle_PrivateOnlyOwnerInvite = 0,  // 只有创建者可以邀请非成员进群
    eGroupStyle_PrivateMemberCanInvite,	// 所有群成员都可以邀请非成员进群
    // 共有群组，可通过查看所有共有群组得到
    eGroupStyle_PublicJoinNeedApproval,	// 需要创建者同意才能进入(创建者可以邀请非成员进群)
    eGroupStyle_PublicOpenJoin,				// 不需要同意可以直接进入()
    eGroupStyle_Default = eGroupStyle_PrivateOnlyOwnerInvite,
}EMGroupStyle;
</code></pre>

>注：

> 1、群组实例对应EMGroup,SDK的EMGroup正在进行优化，不允许用户自己初始化EMGroup或者copy EMGroup。

> 2、群组不支持权限转移，没有admin权限，owner只有一个且为创建者。

## 创建群组 {#createGroup}

目前创建群组支持的配置属性有:

1.	群名称
2.	群描述
3.	群人数（不支持修改，目前上限为2000人）
4.	群类型（即上面提到的四种群组类型）

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
EMGroupStyleSetting *groupStyleSetting = [[EMGroupStyleSetting alloc] init];
groupStyleSetting.groupMaxUsersCount = 500; // 创建500人的群，如果不设置，默认是200人。
groupStyleSetting.groupStyle = eGroupStyle_PublicOpenJoin; // 创建不同类型的群组，这里需要才传入不同的类型
EMGroup *group = [[EaseMob sharedInstance].chatManager createGroupWithSubject:@"群组名称" description:@"群组描述" invitees:@[@"6001",@"6002"] initialWelcomeMessage:@"邀请您加入群组" styleSetting:groupStyleSetting error:&error];
if(!error){
    NSLog(@"创建成功 -- %@",group);
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
EMGroupStyleSetting *groupStyleSetting = [[EMGroupStyleSetting alloc] init];
groupStyleSetting.groupMaxUsersCount = 500; // 创建500人的群，如果不设置，默认是200人。
groupStyleSetting.groupStyle = eGroupStyle_PublicOpenJoin; // 创建不同类型的群组，这里需要才传入不同的类型
[[EaseMob sharedInstance].chatManager asyncCreateGroupWithSubject:@"群组名称" 
													  description:@"群组描述" 
													  invitees:@[@"6001",@"6002"] 
													  initialWelcomeMessage:@"邀请您加入群组" 
													  styleSetting:groupStyleSetting 
													  completion:^(EMGroup *group, EMError *error) {
    if(!error){
        NSLog(@"创建成功 -- %@",group);
    }        
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate 回调方法

接口调用

<pre class="hll"><code class="language-java">

EMGroupStyleSetting *groupStyleSetting = [[EMGroupStyleSetting alloc] init];
groupStyleSetting.groupMaxUsersCount = 500; // 创建500人的群，如果不设置，默认是200人。
groupStyleSetting.groupStyle = eGroupStyle_PublicOpenJoin; // 创建不同类型的群组，这里需要才传入不同的类型
[[EaseMob sharedInstance].chatManager asyncCreateGroupWithSubject:@"群组名称" 
    												  description:@"群组描述" 
    												  invitees:@[@"6001",@"6002"] 
    												  initialWelcomeMessage:@"邀请您加入群组" 
    												  styleSetting:groupStyleSetting];

</code></pre>

回调监听

<pre class="hll"><code class="language-java">

/*!
 @method
 @brief 创建一个群组后的回调
 @param group 所创建的群组对象
 @param error 错误信息
 @discussion
 */
- (void)group:(EMGroup *)group didCreateWithError:(EMError *)error;

</code></pre>


## 加入群组 {#joinGroup}

> 群组分4种类型，目前SDK不支持自主选择是否进群。我们将针对每种类型讲解加入群组要进行的操作。
>
> 1. eGroupStyle_PrivateOnlyOwnerInvite
> 
> 该类型的群组只允许群主（owner）添加人进群，其他人无法主动加入。
> 
> 2. eGroupStyle_PrivateMemberCanInvite (**推荐使用**)
> 
> 该类型的群组允许所有群成员添加人进群，其他人无法主动加入。
> 
> 3. eGroupStyle_PublicJoinNeedApproval (**推荐使用**)
> 
> 该类型的群组只允许群主（owner）添加人进群；其他人想进入群组的话，需要先发送申请，群主同意申请之后才能进群；其他人无法主动加入。
> 
> 4. eGroupStyle_PublicOpenJoin (**不推荐使用**)
> 
> 该类型的群组允许任何人主动加入群组。

### * 添加人进群

被添加的人会收到回调：

<pre class="hll"><code class="language-java">
/*!
@method
@brief 接受群组邀请并加入群组后的回调
@param group 所接受的群组
@param error 错误信息
*/
- (void)didAcceptInvitationFromGroup:(EMGroup *)group error:(EMError *)error;
</code></pre>

加人接口如下：

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
[[EaseMob sharedInstance].chatManager addOccupants:@[@"6001",@"6002"] toGroup:@"1410329312753" welcomeMessage:@"邀请信息" error:&error];
if (!error) {
    NSLog(@"添加成功");
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncAddOccupants:@[@"6001",@"6002"] toGroup:@"1410329312753" welcomeMessage:@"邀请信息"  completion:^(NSArray *occupants, EMGroup *group, NSString *welcomeMessage, EMError *error) {
    if (!error) {
    NSLog(@"添加成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate异步方法

接口调用

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncAddOccupants:@[@"6001",@"6002"] toGroup:@"1410329312753" welcomeMessage:@"邀请信息"];

</code></pre>

监听回调

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 群组信息更新后的回调
 @param group 发生更新的群组
 @param error 错误信息
 @discussion
        当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调
 */
- (void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error;
</code></pre>

### * 发送进群申请

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
// 申请加入需要审核的公开群组
[[EaseMob sharedInstance].chatManager applyJoinPublicGroup:@"1410329312753" withGroupname:@"群组名称" message:@"申请信息" error:&error];
if (!error) {
    NSLog(@"申请成功");
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncApplyJoinPublicGroup:@"1410329312753" withGroupname:@"群组名称" message:@"申请信息" completion:^(EMGroup *group, EMError *error) {
    if (!error) {
        NSLog(@"申请成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncApplyJoinPublicGroup:@"1410329312753" withGroupname:@"群组名称" message:@"申请信息"];

</code></pre>

监听回调

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 申请加入公开群组后的回调
 @param group 群组对象
 @param error 错误信息
 */
- (void)didApplyJoinPublicGroup:(EMGroup *)group
                          error:(EMError *)error;
</code></pre>

### * 处理进群申请

	只有owner有权限处理进群申请

1、收到进群申请

<pre class="hll"><code class="language-java">
/*!
@method
@brief 收到加入群组的申请
@param groupId         要加入的群组ID
@param groupname       申请人的用户名
@param username        申请人的昵称
@param reason          申请理由
@discussion
*/
- (void)didReceiveApplyToJoinGroup:(NSString *)groupId
                         groupname:(NSString *)groupname
                     applyUsername:(NSString *)username
                            reason:(NSString *)reason
                             error:(EMError *)error;
</code></pre>

2、同意进群申请

<pre class="hll"><code class="language-java">
/*!
@method
@brief 同意加入群组的申请
@param groupId   所申请的群组ID
@param groupname 申请的群组名称
@param username  申请人的用户名
@param pError    错误信息
*/
- (void)acceptApplyJoinGroup:(NSString *)groupId
                   groupname:(NSString *)groupname
                   applicant:(NSString *)username
                       error:(EMError **)pError;

/*!
@method
@brief 异步方法, 同意加入群组的申请
@param groupId   所申请的群组ID
@param groupname 申请的群组名称
@param username  申请人的用户名
@discussion
函数执行后, didAcceptApplyJoinGroup:username:error:回调会被触发
*/
- (void)asyncAcceptApplyJoinGroup:(NSString *)groupId
                        groupname:(NSString *)groupname
                        applicant:(NSString *)username;

/*!
@method
@brief 异步方法, 同意加入群组的申请
@param groupId    所申请的群组ID
@param groupname  申请的群组名称
@param username   申请人的用户名
@param completion 消息完成后的回调
@param aQueue     回调执行时的线程
*/
- (void)asyncAcceptApplyJoinGroup:(NSString *)groupId
                        groupname:(NSString *)groupname
                        applicant:(NSString *)username
                       completion:(void (^)(EMError *error))completion
                          onQueue:(dispatch_queue_t)aQueue;
</code></pre>

3、拒绝加群申请

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager rejectApplyJoinGroup:@"1410329312753" groupname:@"群组名称" toApplicant:@"8001" reason:@"拒绝原因"];
</code></pre>

### * 加入eGroupStyle_PublicOpenJoin类型的群组

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
[[EaseMob sharedInstance].chatManager joinPublicGroup:@"1410329312753" error:&error];
if (!error) {
    NSLog(@入群成功");
}
</code></pre>

2、block回调方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
[[EaseMob sharedInstance].chatManager asyncJoinPublicGroup:@"1410329312753" completion:^(EMGroup *group, EMError *error) {
    if (!error) {
        NSLog(@"入群成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">

 // 加入群组
[[EaseMob sharedInstance].chatManager asyncJoinPublicGroup:@"1410329312753"];

</code></pre>

回调监听

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 加入公开群组后的回调
 @param group 群组对象
 @param error 错误信息
 */
- (void)didJoinPublicGroup:(EMGroup *)group
                     error:(EMError *)error;
</code></pre>


## 退出群组 {#exitGroup}

	群主（owner）不支持退群操作，只能解散群。

	退出群组分为主动退群和被动退群。被动退群即为被owner踢出群组。


### * 主动退群

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
[[EaseMob sharedInstance].chatManager leaveGroup:@"1410329312753" error:&error];
if (!error) {
    NSLog(@"退出群组成功");
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncLeaveGroup:@"1410329312753" completion:^(EMGroup *group, EMGroupLeaveReason reason, EMError *error) {
    if (!error) {
        NSLog(@"退出群组成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate异步方法

接口调用

<pre class="hll"><code class="language-java">

 [[EaseMob sharedInstance].chatManager asyncLeaveGroup:@"1410329312753"];

</code></pre>

回调监听

<pre class="hll"><code class="language-java">
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
</code></pre>

### * 被动退群

会通过以下回调通知被踢者

<pre class="hll"><code class="language-java">
- (void)group:(EMGroup *)group didLeaveWithReason:(EMGroupLeaveReason)leaveReason;
</code></pre>


## 解散群组 {#destroyGroup}

	解散群组需要owner权限

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
[[EaseMob sharedInstance].chatManager destroyGroup:group.groupId error:&error];
if (!error) {
    NSLog(@"解散成功");
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncDestroyGroup:group.groupId completion:^(EMGroup *group, EMGroupLeaveReason reason, EMError *error) {
    if (!error) {
        NSLog(@"解散成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate异步方法

接口调用

<pre class="hll"><code class="language-java">

 [[EaseMob sharedInstance].chatManager asyncDestroyGroup:groupId];

</code></pre>

回调监听

<pre class="hll"><code class="language-java">
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
</code></pre>

## 移除群成员 {#removeMember}

	只有owner权限才能调用

<pre class="hll"><code class="language-java">
/*!
@method
@brief 将某些人请出群组
@param occupants 要请出群组的人的用户名列表
@param groupId   群组ID
@param pError    错误信息
@result 返回群组对象
@discussion
此操作需要admin/owner权限
*/
- (EMGroup *)removeOccupants:(NSArray *)occupants
                   fromGroup:(NSString *)groupId
                       error:(EMError *__autoreleasing *)pError;

/*!
@method
@brief 异步方法, 将某些人请出群组
@param occupants 要请出群组的人的用户名列表
@param groupId   群组ID
@discussion
此操作需要admin/owner权限.
函数执行完, 回调groupDidUpdateInfo:error:会被触发
*/
- (void)asyncRemoveOccupants:(NSArray *)occupants
                   fromGroup:(NSString *)groupId;

/*!
@method
@brief 异步方法, 将某些人请出群组
@param occupants  要请出群组的人的用户名列表
@param groupId    群组ID
@param completion 消息完成后的回调
@param aQueue     回调block时的线程
@discussion
此操作需要admin/owner权限
*/
- (void)asyncRemoveOccupants:(NSArray *)occupants
                   fromGroup:(NSString *)groupId
                  completion:(void (^)(EMGroup *group, EMError *error))completion
                     onQueue:(dispatch_queue_t)aQueue;
</code></pre>


## 加入群黑名单 {#blockMember}

    只有owner权限才能调用该接口，并且只有owner权限的才能查看群黑名单。

    可以将群成员和非群成员的人加入群黑名单。

<pre class="hll"><code class="language-java">
/*!
@method
@brief 将某些人加入群组黑名单
@param occupants 要加入黑名单的用户名列表
@param groupId   群组ID
@param pError    错误信息
@result 返回群组对象
@discussion
此操作需要admin/owner权限, 被加入黑名单的人, 不会再被允许进入群组
*/
- (EMGroup *)blockOccupants:(NSArray *)occupants
                  fromGroup:(NSString *)groupId
                      error:(EMError **)pError;

/*!
@method
@brief 异步方法, 将某些人加入群组黑名单
@param occupants 要加入黑名单的用户名列表
@param groupId   群组ID
@discussion
此操作需要admin/owner权限, 被加入黑名单的人, 不会再被允许进入群组
函数执行完, 回调groupDidUpdateInfo:error:会被触发
*/
- (void)asyncBlockOccupants:(NSArray *)occupants
                  fromGroup:(NSString *)groupId;

/*!
@method
@brief 异步方法, 将某些人加入群组黑名单
@param occupants   要加入黑名单的用户名列表
@param groupId     群组ID
@param completion  消息完成后的回调
@param aQueue      回调block时的线程
@discussion
此操作需要admin/owner权限, 被加入黑名单的人, 不会再被允许进入群组
*/
- (void)asyncBlockOccupants:(NSArray *)occupants
                  fromGroup:(NSString *)groupId
                 completion:(void (^)(EMGroup *group, EMError *error))completion
                    onQueue:(dispatch_queue_t)aQueue;
</code></pre>


## 移出群黑名单 {#unblockMember}

	只有owner权限才能调用该接口，并且只有owner权限的才能查看群黑名单。

    从群黑名单移除出去，该用户已经不在群组里了，需要重新加入群组。

<pre class="hll"><code class="language-java">
/*!
@method
@brief 将某些人从群组黑名单中解除
@param occupants 要从黑名单中移除的用户名列表
@param groupId   群组ID
@param pError    错误信息
@result 返回群组对象
@discussion
此操作需要admin/owner权限, 从黑名单中移除后, 可以再次进入群组
*/
- (EMGroup *)unblockOccupants:(NSArray *)occupants
                     forGroup:(NSString *)groupId
                        error:(EMError **)pError;

/*!
@method
@brief 异步方法, 将某些人从群组黑名单中解除
@param occupants 要从黑名单中移除的用户名列表
@param groupId   群组ID
@discussion
此操作需要admin/owner权限, 从黑名单中移除后, 可以再次进入群组
函数执行完, 回调groupDidUpdateInfo:error:会被触发
*/
- (void)asyncUnblockOccupants:(NSArray *)occupants
                     forGroup:(NSString *)groupId;

/*!
@method
@brief 异步方法, 将某些人从群组黑名单中解除
@param occupants   要从黑名单中移除的用户名列表
@param groupId     群组ID
@param completion  消息完成后的回调
@param aQueue      回调block时的线程
@discussion
此操作需要admin/owner权限, 从黑名单中移除后, 可以再次进入群组
*/
- (void)asyncUnblockOccupants:(NSArray *)occupants
                     forGroup:(NSString *)groupId
                   completion:(void (^)(EMGroup *group, EMError *error))completion
                      onQueue:(dispatch_queue_t)aQueue;

</code></pre>

## 修改群名称 {#editGroupSubject}

	只有owner有权限修改

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
// 修改群名称
EMGroup *group = [[EaseMob sharedInstance].chatManager changeGroupSubject:@"要修改的名称" forGroup:@"1410329312753" error:&error];
if (!error) {
    NSLog(@"修改成功");
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
// 修改群名称
[[EaseMob sharedInstance].chatManager asyncChangeGroupSubject:@"要修改的群名称" forGroup:@"1410329312753" completion:^(EMGroup *group, EMError *error) {
    if (!error) {
        NSLog(@"修改成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate异步方法

接口调用

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance].chatManager asyncChangeGroupSubject:@"要修改的群名称" 	forGroup:@"1410329312753"];

</code></pre>

回调监听

<pre class="hll"><code class="language-java">

/*!
@method
@brief 群组信息更新后的回调
@param group 发生更新的群组
@param error 错误信息
@discussion
当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调
*/
-(void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error{
    if (!error) {
        NSLog(@"修改成功");
    }
}
</code></pre>

## 修改群描述 {#editGroupDescription}

	** 不推荐使用 **，只有owner有权限操作

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
// 修改群描述
[[EaseMob sharedInstance].chatManager changeDescription:@"修改的群描述" forGroup:@"1410329312753" error:&error];
if (!error) {
    NSLog(@"修改成功");
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
// 修改群描述
[[EaseMob sharedInstance].chatManager asyncChangeDescription:@"要修改的描述" forGroup:@"1410329312753" completion:^(EMGroup *group, EMError *error) {
    if (!error) {
        NSLog(@"修改成功");
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate异步方法

接口调用

<pre class="hll"><code class="language-java">
// 修改群描述
[[EaseMob sharedInstance].chatManager asyncChangeDescription:@"要修改的描述" forGroup:@"1410329312753"];
</code></pre>

回调监听

<pre class="hll"><code class="language-java">
/*!
@method
@brief 群组信息更新后的回调
@param group 发生更新的群组
@param error 错误信息
@discussion
当添加/移除/更改角色/更改主题/更改群组信息之后,都会触发此回调
*/
-(void)groupDidUpdateInfo:(EMGroup *)group error:(EMError *)error;
</code></pre>

## 屏蔽群消息 {#blockGroup}

	不允许owner权限的调用

<pre class="hll"><code class="language-java">
/*!
@method
@brief 屏蔽群消息，服务器不发送消息(不能屏蔽自己创建的群，EMErrorInvalidUsername)
@param groupId   要屏蔽的群ID
@param pError    错误信息
@result 返回群组对象
@discussion
被屏蔽的群，服务器不再发消息
*/
- (EMGroup *)blockGroup:(NSString *)groupId
                  error:(EMError **)pError;

/*!
@method
@brief 异步方法, 屏蔽群消息，服务器不发送消息(不能屏蔽自己创建的群，EMErrorInvalidUsername)
@param groupId     要取消屏蔽的群ID
@param completion  消息完成后的回调
@param aQueue      回调block时的线程
@discussion
被屏蔽的群，服务器不再发消息
*/
- (void)asyncBlockGroup:(NSString *)groupId
             completion:(void (^)(EMGroup *group, EMError *error))completion
                onQueue:(dispatch_queue_t)aQueue;
</code></pre>

## 取消屏蔽群消息 {#unblockGroup}

	不允许owner权限的调用

<pre class="hll"><code class="language-java">
/*!
@method
@brief 取消屏蔽群消息(不能操作自己创建的群，EMErrorInvalidUsername)
@param groupId   要取消屏蔽的群ID
@param pError    错误信息
@result 返回群组对象
@discussion
*/
- (EMGroup *)unblockGroup:(NSString *)groupId
                    error:(EMError **)pError;

/*!
@method
@brief 异步方法, 取消屏蔽群消息(不能操作自己创建的群，EMErrorInvalidUsername)
@param groupId     要取消屏蔽的群ID
@param completion  消息完成后的回调
@param aQueue      回调block时的线程
@discussion
*/
- (void)asyncUnblockGroup:(NSString *)groupId
               completion:(void (^)(EMGroup *group, EMError *error))completion
                  onQueue:(dispatch_queue_t)aQueue;

</code></pre>

## 管理群组的apns离线推送 {#groupApns}

见 [apns离线推送](http://www.easemob.com/docs/ios/IOSSDKApns) 之 [设置指定群组是否接收apns](http://www.easemob.com/docs/ios/IOSSDKApns/#apnsGroupSet)

## 获取与登录者相关的群组（创建的和加入的） {#fetchMyGroupList}

查看所有当前登录账号所在群组，提供了五种方法

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
NSArray *myGroups = [[EaseMob sharedInstance].chatManager fetchMyGroupsListWithError:&error];
if (!error) {
    NSLog(@"获取成功 -- %@",myGroups);
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchMyGroupsListWithCompletion:^(NSArray *groups, EMError *error) {
    if (!error) {
        NSLog(@"获取成功 -- %@",groups);
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchMyGroupsList];
</code></pre>

回调监听

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 群组列表变化后的回调
 @param groupList 新的群组列表
 @param error     错误信息
 */
- (void)didUpdateGroupList:(NSArray *)groupList
                     error:(EMError *)error;
</code></pre>

4、取db中的值，必须登录成功之后才能获取到数据，该方法取到的不一定是最新的。

<pre class="hll"><code class="language-java">
NSArray *groupList = [[EaseMob sharedInstance].chatManager loadAllMyGroupsFromDatabaseWithAppend2Chat:YES];
</code></pre>

5、取内存中的值

该方法比较特殊，只有在您之前获取过群组列表的情况下才会有值，且不能保证最新。

<pre class="hll"><code class="language-java">
NSArray *groupList = [[EaseMob sharedInstance].chatManager groupList];
</code></pre>

## 获取公开群组 {#fetchPublicGroupList}

    此操作不推荐使用，公开群太多，我们正在优化方法。

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
NSArray *publicGroupList = [[EaseMob sharedInstance].chatManager fetchAllPublicGroupsWithError:&error];
if (!error) {
    NSLog(@"获取成功 -- %@",publicGroupList);
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchAllPublicGroupsWithCompletion:^(NSArray *groups, EMError *error) {
    if (!error) {
        NSLog(@"获取成功 -- %@",groups);
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate回调方法

接口调用

<pre class="hll"><code class="language-java">

// 查看所有公开群组
[[EaseMob sharedInstance].chatManager asyncFetchAllPublicGroups];

</code></pre>

回调监听

<pre class="hll"><code class="language-java">
/*!
 @method
 @brief 获取所有公开群组后的回调
 @param groups 公开群组列表
 @param error  错误信息
 */
- (void)didFetchAllPublicGroups:(NSArray *)groups
                          error:(EMError *)error;	
</code></pre>