---
title: 环信
sidebar: iossidebar
secondnavios: true
---

#好友管理：

## 获取好友列表: {#friendslist}

获取好友列表分几个步骤

1. 登录成功后, 使用 [[EaseMob sharedInstance].chatManager buddyList] 获取BuddyList
2. 通过BuddyList获取username
3. 通过username去自己的服务器上获取用户信息

<pre class="hll"><code class="language-objective_c">
		//获取好友列表
		NSArray *buddys = [[EaseMob sharedInstance].chatManager buddyList];
	    NSMutableArray *usernames = [NSMutableArray array];
	    //循环取得 EMBuddy 对象
	    for (EMBuddy *buddy in buddys) {
	    	//屏蔽发送了好友申请, 但未通过对方接受的用户
	        if (!buddy.isPendingApproval) {
	            [usernames addObject:buddy.username];
	        }
	    }
	    
</code></pre>	
    
EMBuddy类包含以下属性

<pre class="hll"><code class="language-objective_c">
	@property (copy, nonatomic, readonly)NSString *username; //用户名 
	@property (nonatomic) BOOL isOnline; //是否在线
	@property (nonatomic) BOOL isPendingApproval;  //是否是发送了好友申请待接受的用户
</code></pre>
	
BuddyList中, 不返回其它信息, 只返回username, 所以, 如果需要用户的其它信息, 需要调用开发者自己的后台服务器接口, 来获取用户的全部信息

## 监听好友列表变化 {#friendslistener}

为了监听好友列表变化, 需要将监听的对应添加到监听列表中, 代码如下:

<pre class="hll"><code class="language-objective_c">
	[[[EaseMob sharedInstance] chatManager] addDelegate:self delegateQueue:nil]

</code></pre>
当好友列表变化时, 会调用如下方法:

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @abstract 通讯录信息发生变化时的通知
	 @discussion
	 @param buddyList 好友信息列表
	 @param changedBuddies 修改了的用户列表
	 @param isAdd (YES为新添加好友, NO为删除好友)
	 */
	- (void)didUpdateBuddyList:(NSArray *)buddyList changedBuddies:(NSArray *)changedBuddies isAdd:(BOOL)isAdd

</code></pre>		


## 查找好友  {#findfriend}

SDK不提供好友查找的服务, 如需要查找好友, 需要调用开发者自己服务器的用户查询接口

为了保证查找到的好友可以添加, 需要将用户自己服务器的用户数据库, 通过SDK的后台接口导入到SDK服务器中
	
## 添加好友  {#addfriend}

使用以下方法发送一个好友申请

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @abstract 申请添加某个用户为好友,同时将该好友添加到分组中,好友与分组可以多对多
	 @discussion
	 @param username 需要添加为好友的username
	 @param nickname 添加好友后的昵称
	 @param message  申请添加好友时的附带信息
	 @param groupNames  将好友添加到分组中(groupNames由NSString对象组成)
	 @param pError   错误信息
	 @result 好友申请是否发送成功
	 */
	- (BOOL)addBuddy:(NSString *)username
	    withNickname:(NSString *)nickname
	         message:(NSString *)message
	        toGroups:(NSArray *)groupNames
	           error:(EMError )pError;

</code></pre>

如果开发者需要在自己的服务器上维护一套好友体系, 则需要同时调用自己服务器的添加好友请求接口

## 监听好友请求 {#friendrequest}

若工监听是否有好友申请, 需要添加如下代码:

<pre class="hll"><code class="language-objective_c">
	[[[EaseMob sharedInstance] chatManager] addDelegate:self delegateQueue:nil]

</code></pre>
	
当收到好友请求时, 会调用如下方法:

<pre class="hll"><code class="language-objective_c">
	- (void)didReceiveBuddyRequest:(NSString *)username message:(NSString *)message

</code></pre>
	
message为对方发送好友请求时附带的消息, 比如:"我是xxx"
每收到一次好友请求, 都会调用一次该回调, 登录的时候, 离线的好友请求, 会依次调用该方法

## 接受好友请求 {#acceptfriend}

显示好友申请列表后, 需要接受或拒绝好友请求, 接受好友请求的方法如下:

<pre class="hll"><code class="language-objective_c">
	[[[EaseMob sharedInstance] chatManager] acceptBuddyRequest:username error:nil]

</code></pre>

接受好友请求后, SDK会自动回调好友列表更新的方法, 更新好友列表

<pre class="hll"><code class="language-objective_c">
	- (void)didUpdateBuddyList:(NSArray *)buddyList changedBuddies:(NSArray *)changedBuddies isAdd:(BOOL)isAdd

</code></pre>

## 移除好友 {#removefriend}

将好友从好友列表中移除, 需要调用以下方法:

<pre class="hll"><code class="language-objective_c">
	
	/*!
	 @method
	 @abstract 将某个用户从好友列表中移除
	 @discussion
	 @param username 需要移除的好友username
	 @param removeFromRemote 是否将自己从对方好友列表中移除
	 @param pError   错误信息
	 @result 是否移除成功
	 */
	- (BOOL)removeBuddy:(NSString *)username
	   removeFromRemote:(BOOL)removeFromRemote
	              error:(EMError )pError;

</code></pre>

删除好友请求后, SDK会自动回调好友列表更新的方法, 更新好友列表

<pre class="hll"><code class="language-objective_c">
	- (void)didUpdateBuddyList:(NSArray *)buddyList changedBuddies:(NSArray *)changedBuddies isAdd:(BOOL)isAdd

</code></pre>

## 高级话题

## 黑名单 {#blacklist}

### 获取黑名单列表

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 获取黑名单（同步方法）
	 @discussion
	 @param pError 错误信息
	 @result 黑名单（username）
	 */
	- (NSArray *)fetchBlockedList:(EMError **)pError;
	
	/*!
	 @method
	 @brief 获取黑名单（异步方法）
	 @discussion
	 函数执行完, 回调[didUpdateBlockedList:]会被触发
	 */
	- (void)asyncFetchBlockedList;
	
	/*!
	 @method
	 @brief 获取黑名单（异步方法）
	 @param completion     创建完成后的回调
	 @param aQueue         回调block时的线程
	 @discussion
	 获取黑名单成功 判断条件：completion中，error == nil
	 函数执行完, 会调用参数completion
	 */
	- (void)asyncFetchBlockedListWithCompletion:(void (^)(NSArray *blockedList, EMError *error))completion
	                                    onQueue:(dispatch_queue_t)aQueue;
	                                    
</code></pre>

### 把用户加入到黑名单
	
   接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 将username的用户加到黑名单（该用户不会被从好友中删除，若想删除，请自行调用删除接口）
	 @discussion
	 @param username        加入黑名单的用户username
	 @param relationship    黑名单关系（both:双向都不接受消息；
	                                  from:能给黑名单中的人发消息，接收不到黑名单中的人发的消息;
	                                  to:暂不支持）
	 @result 是否成功的向服务器发送了block信息（不包含：服务器是否成功将用户加入黑名单）
	 */
	- (EMError *)blockBuddy:(NSString *)username
	           relationship:(EMRelationship)relationship;

</code></pre>

### 把用户从黑名单中移除
	
接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 将username的用户移出黑名单
	 @discussion
	 @param username 移出黑名单的用户username
	 @result 是否成功的向服务器发送了unblock信息（不包含：服务器是否成功将用户移出黑名单）
	 */
	- (EMError *)unblockBuddy:(NSString *)username;

</code></pre>