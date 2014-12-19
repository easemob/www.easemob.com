---
title: 环信
sidebar: iossidebar
secondnavios: true
---

#单聊：

##  初始化 {#init}

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

##  登录 {#login}

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

###  退出登录 {#logout}

**退出登录时, 需要先退出自己的用户系统, 然后调用下面的方法退出EaseMob服务器**

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager asyncLogoff];

</code></pre>

##发文字，语音，图片，位置 {#sendmessage}

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

##  接收消息 {#receivermessage}

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

### 获取聊天记录 {#historymessage}

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

##未读消息数变化回调（单一聊天人，所有聊天人）。消息已读设定 {#unreadmessage}

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

## 高级话题


### 自定义消息类型 {#custommessage}

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
 	// 得到一个消息体
	EMChatText *userObject = [[EMChatText alloc] initWithText:@""];
	EMTextMessageBody *body = [[EMTextMessageBody alloc]
                           initWithChatObject:userObject];
 
    EMMessage *msg = [[EMMessage alloc] initWithReceiver:username
                                                  bodies:@[body]];
 
    

  	// 设置key和value，需要基本类型
    msg.ext = @{@"key":@"value"};
    
    // 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];

</code></pre>    
 
接收自定义消息

<pre class="hll"><code class="language-objective_c">
	-(void)didReceiveMessage:(EMMessage *)message
	{
		if(message.ext){
			NSString *value = [message.ext objectForKe:@"key"];			
		}			
	}

</code></pre>

## 新消息提示 {#notification}
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

## 设备调用  {#invokedevice}

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


	
 
