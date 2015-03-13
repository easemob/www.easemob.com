---
title: 环信
sidebar: iossidebar
secondnavios: true
---

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