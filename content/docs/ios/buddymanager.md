---
title: 环信
sidebar: iossidebar
secondnavios: true
---

本文档主要用于描述添加好友、接受好友请求、移除好友等操作

## 查找好友

SDK不提供好友查找的服务, 如需要查找好友, 需要调用开发者自己服务器的用户查询接口

为了保证查找到的好友可以添加, 需要将用户自己服务器的用户数据库, 通过SDK的后台接口导入到SDK服务器中
	
## 添加好友

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

## 监听好友请求

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

## 接受好友请求

显示好友申请列表后, 需要接受或拒绝好友请求, 接受好友请求的方法如下:

<pre class="hll"><code class="language-objective_c">
	[[[EaseMob sharedInstance] chatManager] acceptBuddyRequest:username error:nil]

</code></pre>

接受好友请求后, SDK会自动回调好友列表更新的方法, 更新好友列表

<pre class="hll"><code class="language-objective_c">
	- (void)didUpdateBuddyList:(NSArray *)buddyList changedBuddies:(NSArray *)changedBuddies isAdd:(BOOL)isAdd

</code></pre>

## 移除好友

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



