---
title: 环信
sidebar: iossidebar
secondnavios: true
---

##消息推送设置:

###1.获取消息推送设置

登陆SDK成功之后，会从服务器返回消息推送的设置，读取方式

<pre class="hll"><code class="language-objective_c">
	EMPushNotificationOptions *options = [[EaseMob sharedInstance].chatManager pushNotificationOptions];

</code></pre>
	
###2.修改消息推送设置   

####1.已登录状态下，单独修改推送的消息显示昵称

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @property
	 @brief 当前登陆用户的昵称, 默认为用户名
	 */
	@property (nonatomic, strong) NSString *nickname;

</code></pre>
	
调用示例

<pre class="hll"><code class="language-objective_c">
	[[EaseMob sharedInstance].chatManager setNickname:nameTextField.text];
	
</code></pre>

####2.已登录状态下，将配置信息同步到服务器（昵称，推送消息类型，是否开启免打扰，免打扰时限）

接口

<pre class="hll"><code class="language-objective_c">
	/*!
	 @method
	 @brief 更新消息推送相关属性配置（同步方法）
	 @param options    属性
	 @param pError     更新错误信息
	 @result    最新的属性配置
	 */
	- (EMPushNotificationOptions *)updatePushOptions:(EMPushNotificationOptions *)options
	                                           error:(EMError **)pError;
	
	/*!
	 @method
	 @brief 更新消息推送相关属性配置（异步方法）
	 @param options    属性
	 @param pError     更新错误信息
	 @discussion
	    方法执行完之后，调用[didUpdatePushOptions:error:];
	 */
	- (void)asyncUpdatePushOptions:(EMPushNotificationOptions *)options
	                         error:(EMError **)pError;
	
	/*!
	 @method
	 @brief 更新消息推送相关属性配置(异步方法)
	 @param options    属性
	 @param completion 回调
	 @param aQueue     回调时的线程
	 @result
	 */
	- (void)asyncUpdatePushOptions:(EMPushNotificationOptions *)options
	                    completion:(void (^)(EMPushNotificationOptions *options, EMError *error))completion
	                       onQueue:(dispatch_queue_t)aQueue;
	
</code></pre>
	                       
调用示例

<pre class="hll"><code class="language-objective_c">
	EMPushNotificationOptions *options = [EMPushNotificationOptions alloc] init];
	options.displayStyle = ePushNotificationDisplayStyle_simpleBanner;
	[[EaseMob sharedInstance].chatManager asyncUpdatePushOptions:options error:nil];
</code></pre>

