---
title: 环信
sidebar: iossidebar
secondnavios: true
---

## 黑名单

### 获取黑民单列表

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

### 把用户加入到黑民单
	
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