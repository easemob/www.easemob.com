---
title: 环信
sidebar: iossidebar
secondnavios: true
---

## 获取好友列表:

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

## 监听好友列表变化

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
	
	
	
	
	
	
	
	
	
	