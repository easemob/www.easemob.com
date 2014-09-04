---
title: 环信
sidebar: iossidebar
secondnavios: true
---

#单聊：

##  初始化 

在Appdelegate生命中期中，加入对应的初始化，以便SDK能正常工作;

<pre class="hll"><code class="language-objective_c">
	- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary 	*)launchOptions
	{
		self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
		self.window.backgroundColor = [UIColor whiteColor];
   
		// 真机的情况下,notification提醒设置
		UIRemoteNotificationType notificationTypes = UIRemoteNotificationTypeBadge |
		UIRemoteNotificationTypeSound |
		UIRemoteNotificationTypeAlert;
		[[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];

		//注册 APNS文件的名字, 需要与后台上传证书时的名字一一对应
		NSString *apnsCertName = @"chatdemoui";
		[[EaseMob sharedInstance] registerSDKWithAppKey:@"easemob-demo#chatdemoui" apnsCertName:apnsCertName];
		[[EaseMob sharedInstance] enableBackgroundReceiveMessage];
		[[EaseMob sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    
		[self.window makeKeyAndVisible];
		return YES;
	}
	
	-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken{
		// 让SDK得到App目前的各种状态，以便让SDK做出对应当前场景的操作
    	[[EaseMob sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
	}
	
	- (void)applicationWillResignActive:(UIApplication *)application
	{
		// 让SDK得到App目前的各种状态，以便让SDK做出对应当前场景的操作
		[[EaseMob sharedInstance] applicationWillResignActive:application];
	}

	- (void)applicationDidEnterBackground:(UIApplication *)application
	{
		// 让SDK得到App目前的各种状态，以便让SDK做出对应当前场景的操作
		[[EaseMob sharedInstance] applicationDidEnterBackground:application];
	}

	- (void)applicationWillEnterForeground:(UIApplication *)application
	{
		// 让SDK得到App目前的各种状态，以便让SDK做出对应当前场景的操作
		[[EaseMob sharedInstance] applicationWillEnterForeground:application];
	}

	- (void)applicationDidBecomeActive:(UIApplication *)application
	{
		// 让SDK得到App目前的各种状态，以便让SDK做出对应当前场景的操作
		[[EaseMob sharedInstance] applicationDidBecomeActive:application];
	}

	- (void)applicationWillTerminate:(UIApplication *)application
	{
		// 让SDK得到App目前的各种状态，以便让SDK做出对应当前场景的操作
		[[EaseMob sharedInstance] applicationWillTerminate:application];
	}
	
</code></pre>

##  登录 

如果使用自己的用户体系，需要先**登录您的用户体系**，成功后登录IM部分;

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncLoginWithUsername:username 
	password:@"123456" 
	completion:
	^(NSDictionary *loginInfo, EMError *error) {
		if (error) {
			NSLog(@"登录失败");
		}else {
			NSLog(@"登录成功");
		}
	} onQueue:nil];
</code></pre>
     
loginInfo包含账号，密码等信息;

###  退出登录 

**退出登录时, 需要先退出自己的用户系统, 然后调用下面的方法退出EaseMob服务器**

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncLogoff];

</code></pre>

##发文字，语音，图片，位置

###  发送消息 

####  发送文本消息及表情 

<pre class="hll"><code class="language-objective_c">
	EMChatText *text = [[EMChatText alloc] initWithText:str];
	EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:text];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:username
	bodies:@[body]];
	[[EaseMob sharedInstance].chatManager sendMessage:msg progress:nil error:nil];

</code></pre>

####  发送语音消息 

#####  录音 

<pre class="hll"><code class="language-objective_c">
	EMError *error = nil;
	[[EaseMob sharedInstance].chatManager startRecordingAudioWithError:&error];
	if (error) {
		NSLog(@"开始录音失败");
	}
</code></pre>

#####  停止录音 

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncStopRecordingAudioWithCompletion:
	^(EMChatVoice *voice, EMError *error){
	} onQueue:nil];

</code></pre>
     
#####  取消录音 

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncCancelRecordingAudioWithCompletion:
	^(EMChatVoice *voice, EMError *error){
	} onQueue:nil];
</code></pre>

#####  发送录音 

录音结束时，会得到一个EMChatVoice对象，之后用对象生成messageBody即可发送;

<pre class="hll"><code class="language-objective_c">
	EMVoiceMessageBody *body = [[EMVoiceMessageBody alloc] initWithChatObject:voice];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:username
	bodies:@[body]];
	[[EaseMob sharedInstance].chatManager sendMessage:msg progress:nil error:nil];
</code></pre>
	
####  发送图片消息 

<pre class="hll"><code class="language-objective_c">
	//将图片读取到内存
	UIImage *image = [UIImage imageNamed:@""];
	//初始化一个EMChatImage对象
	EMChatImage *chatImage = [[EMChatImage alloc] initWithUIImage:image displayName:@"image"];
	//初始化一个MessageBody对象
	//chatImage：大图
	//thumbnailImage：缩略图（可不传, 传nil系统会自动生成缩略图）
    EMImageMessageBody *body = [[EMImageMessageBody alloc] initWithImage:chatImage thumbnailImage:nil];
    //初始化一个MessageBody数组(目前暂时只支持一个body)
    NSArray *bodies = [NSArray arrayWithObject:body];
    //初始化一个EMMessage对象
	EMMessage *retureMsg = [[EMMessage alloc] initWithReceiver:username bodies:bodies];
	//发送数据是否需要加密
    retureMsg.requireEncryption = requireEncryption;
    //发送图片消息
    [[EaseMob sharedInstance].chatManager asyncSendMessage:retureMsg progress:nil];

</code></pre>

####  发送地理位置消息 

在得到经纬度和位置信息后，可以生成对应的LocationType的Message，之后发送即可;

<pre class="hll"><code class="language-objective_c">	
	EMChatLocation *chatLocation = [[EMChatLocation alloc] initWithLatitude:latitude longitude:longitude address:address];
	EMLocationMessageBody *body = [[EMLocationMessageBody alloc] initWithChatObject:chatLocation];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:username bodies:@[body]];
	[[EaseMob sharedInstance].chatManager sendMessage:msg progress:nil error:nil];
</code></pre>

##  接收消息 

####  实现委托 

在需要接受消息的页面，应该首先实现一个delegate:IChatManagerDelegate;

<pre class="hll"><code class="language-objective_c">	
	@interface RootViewController : UIViewController&lt;IChatManagerDelegate&gt;

</code></pre>

####  注册接收消息 

<pre class="hll"><code class="language-objective_c">
	// 注册一个delegate
	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	
	// 实现接收消息的委托
	#pragma mark - IChatManagerDelegate
	-(void)didReceiveMessage:(EMMessage *)message{
		
	}
</code></pre>
	
收到消息后，会调用 -(void)didReceiveMessage:(EMMessage *)message; 

根据message.messageType 区分是哪种消息，之后做对应的解析;

##聊天消息历史记录管理：查询，删除

### 获取聊天记录 

根据username可以得到一个conversation;

<pre class="hll"><code class="language-objective_c">
	EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:username isGroup:isGroup];
</code></pre>
                                    
####  根据messageID得到一条聊天记录 

<pre class="hll"><code class="language-objective_c">
	EMMEssage *message = [conversation loadMessage:message.messageID];
</code></pre>

####  根据messageID数组，得到一组聊天记录 

<pre class="hll"><code class="language-objective_c">
	NSArray *messages = [conversation loadMessages:messageIDs];
</code></pre>
	
####  得到所有messages 

<pre class="hll"><code class="language-objective_c">
	NSArray *messages = [conversation loadAllMessages];
</code></pre>
	
####  根据时间得到要求条数的messages 

**SDK 中保存的timeStamp 乘以了 1000，所以获取的时候，也需要乘以1000**

<pre class="hll"><code class="language-objective_c">
	NSTimeInterval before = [[NSDate date] timeIntervalSince1970] * 1000;
	NSArray *messages = [_conversation loadNumbersOfMessages:10 before:before];
</code></pre>
                                 	
### 删除聊天记录 
根据username可以得到一个conversation;

<pre class="hll"><code class="language-objective_c">
	EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:username];
</code></pre>
                                    
####  删除一个EMMessage 

<pre class="hll"><code class="language-objective_c">
	- (BOOL)removeMessage:(EMMessage *)message;

</code></pre>

####  删除一组EMMessages 

<pre class="hll"><code class="language-objective_c">
	- (NSUInteger)removeMessages:(NSArray *)messages;

</code></pre>

####  删除该EMconversation下得所有EMMessages 

<pre class="hll"><code class="language-objective_c">
	- (NSUInteger)removeAllMessages;

</code></pre>

##未读消息数变化回调（单一聊天人，所有聊天人）。消息已读设定

###  设置消息状态 

####  获取消息未读数量 

EMConversation中，提供了unreadMessagesCount属性;

<pre class="hll"><code class="language-objective_c">
	/**
	@method
	@abstract 获取此对话中所有未读消息的条数
	@discussion
	@result 此对话中所有未读消息的条数
	*/
	- (NSUInteger)unreadMessagesCount;

</code></pre>

####  设置一条消息的已读状态 

EMConversation中，提供了设置某一条message的状态的方法;

<pre class="hll"><code class="language-objective_c">		
	/**
	@method
	@abstract 把本条消息标记为已读/未读
	@discussion
	@param isRead 已读或未读
	@result 是否成功标记此条消息
	*/
	- (BOOL)markMessage:(EMMessage *)message asRead:(BOOL)isRead;
	
</code></pre>
	
####  设置EMConversation下所有message为已读 

EMConversation中，提供了设置该EMConversation对象中所有message状态的方法;

<pre class="hll"><code class="language-objective_c">
	/**
	@method
	@abstract 把本对话里的所有消息标记为已读/未读
	@discussion
	@param isRead 已读或未读
	@result 成功标记的消息条数
	*/
	- (NSUInteger)markMessagesAsRead:(BOOL)isRead;
</code></pre>


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

## 高级话题


### 自定义消息类型

EMMessage支持用户自定义扩展

<pre class="hll"><code class="language-objective_c">	
	/*!
	@property
	@abstract 消息扩展
	*/	
	@property (nonatomic, strong) NSDictionary *ext;

</code></pre>
	
将需要自定义的object放入字典中，发送时就可以一起发出。	


发送自定义消息

<pre class="hll"><code class="language-objective_c">
 	// 自定义消息
	EMChatText *userObject = [[EMChatText alloc] initWithText:@""];
	EMMessageBody *body = [[EMTextMessageBody alloc]
                           initWithChatObject:userObject];
 
    EMMessage *msg = [[EMMessage alloc] initWithReceiver:username
                                                  bodies:@[body]];
 
    
    NSMutableDictionary *vcardProperty = [NSMutableDictionary dictionary];
	// obj:需要发送object
	// objKey:obj对应的key
   	[vcardProperty setObject:obj forKey:objKey];        
  
    msg.ext = vcardProperty;
    
    // 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];

</code></pre>    
 
接收自定义消息

<pre class="hll"><code class="language-objective_c">
	-(void)didReceiveMessage:(EMMessage *)message
	{
		if(message.ext){
			// obj:接受到的obj对象
			// objKey:obj对应的key
			NSObject *obj = [message.ext objectForKey:objKey];
		}			
	}

</code></pre>

## 黑名单

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

## 新消息提示 
SDK中提供了方便的新消息提醒功能。可以在收到消息时调用，提醒用户有新消息。


调用播放音频

<pre class="hll"><code class="language-objective_c">
	// 播放音频
    [[EaseMob sharedInstance].deviceManager asyncPlayNewMessageSound];

</code></pre>

调用手机震动

<pre class="hll"><code class="language-objective_c">
	// 震动
    [[EaseMob sharedInstance].deviceManager asyncPlayVibration];

</code></pre>

## 设备调用

###  录音时获取音量大小 

 
函数名

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 获取录音音量大小
	@discussion
	@result 音量大小
	*/
	- (double)peekRecorderVoiceMeter;

</code></pre>
	
示例代码

<pre class="hll"><code class="language-objective_c">
	// touch down
	-(void)recordButtonTouchDown{
    _timer = [NSTimer scheduledTimerWithTimeInterval:0.05
                                              target:self
                                            selector:@selector(setVoiceImage)
                                            userInfo:nil
                                             repeats:YES];
    
	}
	
	// touch up inside
	-(void)recordButtonTouchUpInside{
    	[_timer invalidate];
	}
	
	-(void)setVoiceImage {
		double voiceSound = 0;
    	voiceSound = [[EaseMob sharedInstance].chatManager peekRecorderVoiceMeter];
	
		// 得到音量大小，之后用户自定义操作
		if (0 < voiceSound <= 0.05) {
	
		}else if (0.05<voiceSound && voiceSound<=0.10) {
        
    	}else if (0.10<voiceSound && voiceSound<=0.15) {
       
    	}
    	...
    }

</code></pre>    
    
###  判断当前麦克风是否可用 

函数名

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 判断麦克风是否可用
	@return 麦克风是否可用
	*/
	- (BOOL)checkMicrophoneAvailability;

</code></pre>

示例代码

<pre class="hll"><code class="language-objective_c">
	BOOL isEnabled = [[EaseMob sharedInstance].deviceManager checkMicrophoneAvailability];
    if (isEnabled) {
        NSLog(@"可用");
    }else {
        NSLog(@"不可用");
    }

</code></pre>

###  距离传感器功能 

属性名称

<pre class="hll"><code class="language-objective_c">	
	/*!
	@property
	@brief 当前设备是否支持距离传感器功能
	*/
	@property (nonatomic, readonly) BOOL isSupportProximitySensor;

	/*!
	@property
	@brief 设备是否正接近用户
	*/

	@property (nonatomic, readonly) BOOL isCloseToUser;

	/*!
	@property
	@brief 当前设备距离传感器功能是否处于打开状态
	*/
	@property (nonatomic, readonly) BOOL isProximitySensorEnabled;
	
</code></pre>

示例代码

<pre class="hll"><code class="language-objective_c">
	BOOL isSupport = [[EaseMob sharedInstance].deviceManager isSupportProximitySensor];
	if (isSupport) {
		NSLog(@"支持");
	}else{
		NSLog(@"不支持");
	}
	
	BOOL isCloseToUser = [[EaseMob sharedInstance].deviceManager isCloseToUser];
    if (isCloseToUser) {
        NSLog(@"用户正在接近");
    }else{
        NSLog(@"用户没有接近");
    }
    
	BOOL isEnabled = [[EaseMob sharedInstance].deviceManager isProximitySensorEnabled];
    if (isEnabled) {
        NSLog(@"传感器已打开");
    }else{
        NSLog(@"传感器未打开");
    }

</code></pre>
	
函数名称

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 打开
	@discussion 若设备不支持, 返回NO
	@result 是否成功打开
	*/
	- (BOOL)enableProximitySensor;

	/*!
	@method
	@brief 关闭
	@discussion 若设备不支持, 返回NO
	@result 是否成功关闭
	*/
	- (BOOL)disableProximitySensor;

</code></pre>
	
示例代码

<pre class="hll"><code class="language-objective_c">
	BOOL enable = [[EaseMob sharedInstance].deviceManager enableProximitySensor];
    if (enable) {
        NSLog(@"传感器打开成功");
    }else{
        NSLog(@"传感器打开失败");
    }
    
	BOOL disable = [[EaseMob sharedInstance].deviceManager disableProximitySensor];
    if (disable) {
        NSLog(@"传感器关闭成功");
    }else{
        NSLog(@"传感器关闭失败");
    }

</code></pre>
    
###  播放提示短音 

函数名称

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 收到新消息时, 播放声音
	@discussion
	*/
	- (void)playNewMessageSound;

	/*!
	@method
	@brief 收到新消息时, 异步播放音频
	@discussion
	@result
	*/
	- (void)asyncPlayNewMessageSound;

	/*!
	@method
	@brief 收到新消息时, 异步播放音频
	@param completion 播放完成时的回调block
	@param aQueue 回调block时的线程
	@discussion
	@result
	*/
	- (void)asyncPlayNewMessageWithCompletion:(void (^)(SystemSoundID soundId))completion
                                  onQueue:(dispatch_queue_t)aQueue;
                                  
</code></pre>

示例代码

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].deviceManager playNewMessageSound];
	
	
	[[EaseMob sharedInstance].deviceManager asyncPlayNewMessageSound];
	
	
	[[EaseMob sharedInstance].deviceManager
     asyncPlayNewMessageWithCompletion:^(SystemSoundID soundId) {
        
    } onQueue:nil];
    
</code></pre>
    
###  设备震动 

函数名称

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 新消息到来时, 震动设备
	@discussion
	@result
	*/
	- (void)playVibration;
	
	/*!
	@method
	@brief 新消息到来时, 震动设备(异步方法)
	@discussion
	@result
	*/
	- (void)asyncPlayVibration;
	
	/*!
	@method
	@brief 新消息到来时, 震动设备(异步方法)
	@param completion 震动完成后的回调block
	@param aQueue 回调block时的线程
	@discussion
	@result
	*/
	- (void)asyncPlayVibrationWithCompletion:(void (^)(SystemSoundID soundId))completion
                                 onQueue:(dispatch_queue_t)aQueue;
    
</code></pre>
                                 
示例代码

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].deviceManager playVibration];
    
    
    [[EaseMob sharedInstance].deviceManager asyncPlayVibration];
    
    
    [[EaseMob sharedInstance].deviceManager
     asyncPlayVibrationWithCompletion:^(SystemSoundID soundId) {
        
    } onQueue:nil];
</code></pre>
    
###  摄像头是否可用 

函数名称

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 检查摄像头是否可用
	@return 摄像头是否可用
	*/
	- (BOOL)checkCameraAvailability;
</code></pre>
	
示例代码

<pre class="hll"><code class="language-objective_c">	
	BOOL enable = [[EaseMob sharedInstance].deviceManager checkCameraAvailability];
    if (enable) {
        NSLog(@"当前摄像头可用");
    }else{
        NSLog(@"当前摄像头不可用");
    }
	
</code></pre>
	
###   设置播放音频方式 

函数名称

<pre class="hll"><code class="language-objective_c">
	/*!
	@method
	@brief 在耳机和扩音器之间切换音频播放模式
	@param outputDevice 音频播放模式
	@discussion
	@result 是否切换成功
	*/
	- (BOOL)switchAudioOutputDevice:(EMAudioOutputDevice)outputDevice;

</code></pre>

示例代码

<pre class="hll"><code class="language-objective_c">	
	// 使用耳机播放
	[[EaseMob sharedInstance].deviceManager switchAudioOutputDevice:eAudioOutputDevice_earphone];
	
	// 使用扬声器播放
	[[EaseMob sharedInstance].deviceManager switchAudioOutputDevice:eAudioOutputDevice_speaker];

</code></pre>
		
 若想要使用听筒模式, 在播放音频前, 需要先将听筒模式打开, 音频播放完成后, 将听筒模式关闭, 示例代码如下: 

<pre class="hll"><code class="language-objective_c">
	//打开听筒模式(当手机靠近耳朵时, 屏幕会变黑)
	[[[EaseMob sharedInstance] deviceManager] enableProximitySensor];
    id <IChatManager> chatManager = [EaseMob sharedInstance].chatManager;
    [chatManager asyncPlayAudio:message.chatVoice
                     completion:^(EMError *error) {
                         //关闭听筒模式(若不关闭, 则在客户端内无论什么时候靠近耳朵, 手机都会黑屏)
                         [[[EaseMob sharedInstance] deviceManager] disableProximitySensor];
                     }
                        onQueue:nil];


</code></pre>


	
 
