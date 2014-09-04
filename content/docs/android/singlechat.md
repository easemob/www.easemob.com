---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

#单聊:

##初始化

### 初始化环信聊天SDK

<pre class="hll"><code class="language-java">
	//必须在application中初始化，否则后续使用sdk的方法时可能会报一些莫名其妙的空指针等异常
	EMChat.getInstance().init(getApplicationContext());
</code></pre>

##登录鉴权

### 登陆聊天服务器

<pre class="hll"><code class="language-java">
    EMChatManager.getInstance().login(userName,password,
    	new EMCallBack() {//回调
    		@Override
    		public void onSuccess() {
    			runOnUiThread(new Runnable() {
    				public void run() {
    					Log.d("main", "登陆聊天服务器成功！");
    				}
    			});
    		}

    		@Override
    		public void onProgress(int progress, String status) {

    		}

    		@Override
    		public void onError(int code, String message) {
    			Log.d("main", "登陆聊天服务器失败！");
    		}
    	});
</code></pre>

### 退出聊天登陆

<pre class="hll"><code class="language-java">
	EMChatManager.getInstance().logout();
	
</code></pre>

##发文字，语音，图片，位置

### 发送消息(单聊/群聊)

#### 发送文本消息及表情

<pre class="hll"><code class="language-java">
	//获取到与聊天人的会话对象。参数username为聊天人的userid或者groupid，后文中的username皆是如此
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	//创建一条文本消息
    EMMessage message = EMMessage.createSendMessage(EMMessage.Type.TXT);
	//如果是群聊，设置chattype,默认是单聊
	message.setChatType(ChatType.GroupChat);
	//设置消息body
    TextMessageBody txtBody = new TextMessageBody(content);
    message.addBody(txtBody);
	//设置接收人
	message.setReceipt(username);
	//把消息加入到此会话对象中
	conversation.addMessage(message);
	//发送消息
	EMChatManager.getInstance().sendMessage(message, new EMCallBack());
</code></pre>

#### 发送语音消息

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.VOICE);
	//如果是群聊，设置chattype,默认是单聊
	message.setChatType(ChatType.GroupChat);
	VoiceMessageBody body = new VoiceMessageBody(new File(filePath), len);
    message.addBody(body);
	message.setReceipt(username);
	conversation.addMessage(message);
	EMChatManager.getInstance().sendMessage(message, new EMCallBack());
</code></pre>

#### 发送图片消息

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.IMAGE);
	//如果是群聊，设置chattype,默认是单聊
	message.setChatType(ChatType.GroupChat);
	
	ImageMessageBody body = new ImageMessageBody(new File(filePath));
	// 默认超过100k的图片会压缩后发给对方，可以设置成发送原图
	// body.setSendOriginalImage(true);
    message.addBody(body);
	message.setReceipt(username);
	conversation.addMessage(message);
	EMChatManager.getInstance().sendMessage(message, new EMCallBack());
</code></pre>

#### 发送地理位置消息

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.LOCATION);
	//如果是群聊，设置chattype,默认是单聊
	message.setChatType(ChatType.GroupChat);
    LocationMessageBody locBody = new LocationMessageBody(locationAddress, latitude, longitude);
    message.addBody(locBody);
	message.setReceipt(username);
    conversation.addMessage(message);
	EMChatManager.getInstance().sendMessage(message, new EMCallBack());
</code></pre>

### 发送文件消息

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	// 创建一个文件消息
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.FILE);
	// 如果是群聊，设置chattype,默认是单聊
	if (chatType == CHATTYPE_GROUP)
		message.setChatType(ChatType.GroupChat);
	//设置接收人的username
	message.setReceipt(username);
	// add message body
	NormalFileMessageBody body = new NormalFileMessageBody(new File(filePath));
	message.addBody(body);
	conversation.addMessage(message);
	EMChatManager.getInstance().sendMessage(message, new EMCallBack());
</code></pre>

## 接收消息

注册一个相应broadcast，用来接收消息

<pre class="hll"><code class="language-java">
	NewMessageBroadcastReceiver msgReceiver = new NewMessageBroadcastReceiver();
	IntentFilter intentFilter = new IntentFilter(EMChatManager.getInstance().getNewMessageBroadcastAction());
    intentFilter.setPriority(3);
    registerReceiver(msgReceiver, intentFilter);
	
	private class NewMessageBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            //消息id
            String msgId = intent.getStringExtra("msgid");
            //发消息的人的username(userid)
            String msgFrom = intent.getStringExtra("from");
            //消息类型，文本，图片，语音消息等,这里返回的值为msg.type.ordinal()。
            //所以消息type实际为是enum类型
            int msgType = intent.getIntExtra("type", 0);
            //消息body，为一个json字符串
            String msgBody = intent.getStringExtra("body");
            Log.d("main", "new message id:" + msgId + " from:" + msgFrom + " type:" + msgType + " body:" + msgBody);
          
            //更方便的方法是通过msgId直接获取整个message
            EMMessage message = EMChatManager.getInstance().getMessage(msgId);
                    
            }
    }
</code></pre>

### 获取聊天记录

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	//获取此会话的所有消息
	List&lt;EMMessage&gt; messages = conversation.getAllMessages();
	//sdk初始化加载的聊天记录为20条，到顶时需要去db里获取更多
	//获取startMsgId之前的pagesize条消息，此方法获取的messages sdk会自动存入到此会话中，app中无需再次把获取到的messages添加到会话中
	List&lt;EMMessage&gt; messages = conversation.loadMoreMsgFromDB(startMsgId, pagesize);
	//如果是群聊，调用下面此方法
	List&lt;EMMessage&gt; messages = conversation.loadMoreGroupMsgFromDB(startMsgId, pagesize);
</code></pre>
	
## 未读消息数变化回调（单一聊天人，所有聊天人）。消息已读设定

### 获取未读消息数量

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	conversation.getUnreadMsgCount();
</code></pre>

### 未读消息数清零(指定会话消息未读数清零) 

<pre class="hll"><code class="language-java">
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
	conversation.resetUnsetMsgCount();
	
</code></pre>

### 清空会话聊天记录

<pre class="hll"><code class="language-java">
	//清空和某个user的聊天记录，不删除整个会话
	EMChatManager.getInstance().clearConversation(username);
	
</code></pre>

### 删除聊天记录

<pre class="hll"><code class="language-java">
    //删除和某个user的整个的聊天记录
    EMChatManager.getInstance().deleteConversation(username);
    //删除当前会话的某条聊天记录
	EMConversation conversation = EMChatManager.getInstance().getConversation(username);
    conversation.removeMessage(deleteMsg.msgId);
	
</code></pre>

### 设置自定义的消息提示


app在后台时，新消息会通过notification的方式，在手机状态栏提示新消息，可以把提示的内容换成自定义的内容(在application的oncreate()里设置)。

<pre class="hll"><code class="language-java">
		//获取到配置options对象
		EMChatOptions options = EMChatManager.getInstance().getChatOptions();
		//设置自定义的文字提示
 		options.setNotifyText(new OnMessageNotifyListener() {
			
			@Override
			public String onNewMessageNotify(EMMessage message) {
				//可以根据message的类型提示不同文字，这里为一个简单的示例
				return "你的好基友" + message.getFrom() + "发来了一条消息哦";
			}
			
			@Override
			public String onLatestMessageNotify(EMMessage message, int fromUsersNum, int messageNum) {
				return fromUsersNum + "个基友，发来了" + messageNum + "条消息";
			}
		});
	
</code></pre>

### 设置自定义notification点击跳转intent

用户点击notification消息，sdk会有默认的跳转intent，开发者可以设置自己的跳转intent，这里以uidemo的代码为例

<pre class="hll"><code class="language-java">
		// 获取到EMChatOptions对象
		EMChatOptions options = EMChatManager.getInstance().getChatOptions();
		//设置notification点击listener
		options.setOnNotificationClickListener(new OnNotificationClickListener() {
		
			@Override
			public Intent onNotificationClick(EMMessage message) {
				Intent intent = new Intent(applicationContext, ChatActivity.class);
				ChatType chatType = message.getChatType();
				if(chatType == ChatType.Chat){ //单聊信息
					intent.putExtra("userId", message.getFrom());
					intent.putExtra("chatType", ChatActivity.CHATTYPE_SINGLE);
				}else{ //群聊信息
					//message.getTo()为群聊id
					intent.putExtra("groupId", message.getTo());
					intent.putExtra("chatType", ChatActivity.CHATTYPE_GROUP);
				}
				return intent;
			}
		});
</code></pre>

## 新消息提示
SDK中提供了方便的新消息提醒功能。可以在收到消息时调用，提醒用户有新消息

首先获取EMChatOptions  

<pre class="hll"><code class="language-java">
    chatOptions = EMChatManager.getInstance().getChatOptions();
    
</code></pre>

设置是否启用新消息提醒 

<pre class="hll"><code class="language-java">
    chatOptions.setNotificationEnable(true|false); //默认为true 开启新消息提醒
    
</code></pre>

设置是否启用新消息声音提醒

<pre class="hll"><code class="language-java">
    chatOptions.setNoticeBySound(true|false); //默认为true 开启声音提醒
    
</code></pre>

设置是否启用新消息震动提醒

<pre class="hll"><code class="language-java">    
    chatOptions.setNoticedByVibrate(true|false); //默认为true 开启震动提醒
    
</code></pre>

设置语音消息播放是否设置为扬声器播放

<pre class="hll"><code class="language-java"> 
	chatOptions.setUseSpeaker(true|false); //默认为true 开启扬声器播放
    
</code></pre>

附：

<pre class="hll"><code class="language-java">
    chatOptions.setAcceptInvitationAlways(false); //默认添加好友时为true，是不需要验证的，改成需要验证为false)
    
</code></pre> 

## 好友列表管理

### 获取好友列表

获取好友的usernam list，开发者需要根据username去自己服务器获取好友的详情

<pre class="hll"><code class="language-java">
	List&lt;String&gt; usernames = EMChatManager.getInstance().getContactUserNames();
    
</code></pre>

### 添加好友

<pre class="hll"><code class="language-java">
	//参数为要添加的好友的username和添加理由
	EMContactManager.getInstance().addContact(toAddUsername, reason);
    
</code></pre>
	
### 删除好友

<pre class="hll"><code class="language-java">
	EMContactManager.getInstance().deleteContact(username);
    
</code></pre>

### 同意好友请求

<pre class="hll"><code class="language-java">
	//同意username的好友请求
	EMChatManager.getInstance().acceptInvitation(username);
    
</code></pre>

### 拒绝好友请求

<pre class="hll"><code class="language-java">
	EMChatManager.getInstance().refuseInvitation(username);
    
</code></pre>

### 监听好友请求，同意好友请求等事件

**已过时**，使用后面的"监听好友状态事件"里的方式：EMContactManager.getInstance().setContactListener(new EMContactListener())监听好友改变事件。

<pre class="hll"><code class="language-java">
	//注册一个好友请求等的BroadcastReceiver   
	IntentFilter inviteIntentFilter = new IntentFilter(EMChatManager.getInstance().getContactInviteEventBroadcastAction());
	registerReceiver(contactInviteReceiver, inviteIntentFilter);
	
	private BroadcastReceiver contactInviteReceiver = new BroadcastReceiver(){

		@Override
		public void onReceive(Context context, Intent intent) {
			//请求理由
			final String reason = intent.getStringExtra("reason");
			final boolean isResponse = intent.getBooleanExtra("isResponse", false);
			//消息发送方username
			final String from = intent.getStringExtra("username");
			//sdk暂时只提供同意好友请求方法，不同意选项可以参考微信增加一个忽略按钮。
			if(!isResponse){
				Log.d(TAG, from + "请求加你为好友,reason: " + reason);
			}else{
				Log.d(TAG, from + "同意了你的好友请求");
			}
			//具体ui上的处理参考chatuidemo。
		}
	}
    
</code></pre>

### 监听好友状态事件

<pre class="hll"><code class="language-java">
	EMContactManager.getInstance().setContactListener(new EMContactListener() {
			
			@Override
			public void onContactAgreed(String username) {
				//好友请求被同意
			}
			
			@Override
			public void onContactRefused(String username) {
				//好友请求被拒绝
			}
			
			@Override
			public void onContactInvited(String username, String reason) {
				//收到好友邀请
			}
			
			@Override
			public void onContactDeleted(List&lt;String&gt; usernameList) {
				//被删除时回调此方法
			}
			
			
			@Override
			public void onContactAdded(List&lt;String&gt; usernameList) {
				//增加了联系人时回调此方法
			}
		});
</code></pre>

## 高级话题

## 自定义扩展消息
当sdk提供的消息类型不满足需求时，开发者可以通过扩展自sdk提供的文本、语音、图片、位置等消息类型，从而生成自己需要的消息类型。

<pre class="hll"><code class="language-java">
	//这里是扩展自文本消息，如果这个自定义的消息需要用到语音或者图片等，可以扩展自语音、图片消息，亦或是位置消息。
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.TXT);
	TextMessageBody txtBody = new TextMessageBody(content);
	message.addBody(txtBody);
	
	// 增加自己特定的属性,目前sdk支持int,boolean,String这三种属性，可以设置多个扩展属性
	message.setAttribute("attribute1", "value");
	message.setAttribute("attribute2", true);
	
	message.setReceipt(username);
	conversation.addMessage(message);
	//发送消息
	EMChatManager.getInstance().sendMessage(message, new EMCallBack());

	//在接收消息的BroadcastReceive中，通过自己设置的key即可取到这些value
	private class NewMessageBroadcastReceiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			// 消息id
			String msgId = intent.getStringExtra("msgid"); 
			//根据消息id获取message
			EMMessage message = EMChatManager.getInstance().getMessage(msgId);
			//获取自定义的属性，第2个参数为返回的默认值
			message.getStringAttribute("attribute1",null);
			message.getBooleanAttribute("attribute2", false);
			abortBroadcast();
		}
	}
</code></pre>

## 黑名单

### 获取黑民单列表

<pre class="hll"><code class="language-java">
	//获取黑名单用户的usernames
	EMContactManager.getInstance().getBlackListUsernames();
</code></pre>

### 把用户加入到黑民单

<pre class="hll"><code class="language-java">	
	//第二个参数如果为true，则把用户加入到黑名单后双方发消息时对方都收不到；false,则
	//我能给黑名单的中用户发消息，但是对方发给我时我是收不到的
    EMContactManager.getInstance().addUserToBlackList(username,true);
    
</code></pre>

### 把用户从黑名单中移除

<pre class="hll"><code class="language-java">
	EMContactManager.getInstance().deleteUserFromBlackList(username);
    
</code></pre>

##网络异常监听:

1.在聊天过程中难免会遇到网络问题，在此SDK为您提供了网络监听接口，实时监听

2.对于同一个账号在多处登录，则根据本监听事件中的_onDisConnected_方法传递的String类型参数_errorString_来进行判断是否同一个账号在其它地方进行了登录，若服务器返回的参数值为`errorString!=null&&errorString.contains("conflict")`，则认为是有同一个账号异地登录

<pre class="hll"><code class="language-java">
	//注册一个监听连接状态的listener
	EMChatManager.getInstance().addConnectionListener(new MyConnectionListener());

	//实现ConnectionListener接口
	private class MyConnectionListener implements ConnectionListener{

		@Override
		public void onConnected() {
			
		}

		@Override
		public void onDisConnected(String errorString) {
			if(errorString!=null&&errorString.contains("conflict"))
			{
				//收到帐号在其他手机登录
				// TODO 
			}else{
				
				//"连接不到聊天服务器"
			}
		}

		@Override
		public void onReConnected() {
			
		}

		@Override
		public void onReConnecting() {
		}

		@Override
		public void onConnecting(String progress) {

		}
		
	}
    
</code></pre>





	

	
