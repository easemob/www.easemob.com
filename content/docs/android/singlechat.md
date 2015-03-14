---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

#单聊:

## 发文字，语音，图片，位置  {#sendmessage}

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
EMChatManager.getInstance().sendMessage(message, new EMCallBack(){});
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
EMChatManager.getInstance().sendMessage(message, new EMCallBack(){});
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
EMChatManager.getInstance().sendMessage(message, new EMCallBack(){});
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
EMChatManager.getInstance().sendMessage(message, new EMCallBack(){});
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
EMChatManager.getInstance().sendMessage(message, new EMCallBack(){});
</code></pre>

## 接收消息 {#receivermessage}

**注意事项**：为了防止新消息来时，因为没有注册广播接收者，导致漏接消息的情况，
注册完接受者以及好友监听等事件后，需要调用<code class="language-java">EMChat.getInstance().setAppInited()</code>,sdk才会发送新消息的广播，只需调用一次即可，可参考demo的mainactivity；
另外当app在后台时，sdk默认以notification的形式通知有新消息，不会走广播，如果需要走广播，可以调用<code class="language-java">EMChatManager.getInstance().getChatOptions().setShowNotificationInBackgroud(false)</code>,关闭notification通知，这样新消息还是走发送广播的形式。


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
        Log.d("main", "new message id:" + msgId + " from:" + msgFrom + " type:" + msgType);
        //更方便的方法是通过msgId直接获取整个message
        EMMessage message = EMChatManager.getInstance().getMessage(msgId);
        }
}
</code></pre>

### 获取聊天记录 {#historymessage}

<pre class="hll"><code class="language-java">
EMConversation conversation = EMChatManager.getInstance().getConversation(username|groupid);
//获取此会话的所有消息
List&lt;EMMessage&gt; messages = conversation.getAllMessages();
//sdk初始化加载的聊天记录为20条，到顶时需要去db里获取更多
//获取startMsgId之前的pagesize条消息，此方法获取的messages sdk会自动存入到此会话中，app中无需再次把获取到的messages添加到会话中
List&lt;EMMessage&gt; messages = conversation.loadMoreMsgFromDB(startMsgId, pagesize);
//如果是群聊，调用下面此方法
List&lt;EMMessage&gt; messages = conversation.loadMoreGroupMsgFromDB(startMsgId, pagesize);
</code></pre>
	
## 未读消息数变化回调（单一聊天人，所有聊天人）。消息已读设定  {#unreadmessage}

### 获取未读消息数量

<pre class="hll"><code class="language-java">
EMConversation conversation = EMChatManager.getInstance().getConversation(username|groupid);
conversation.getUnreadMsgCount();
</code></pre>

### 未读消息数清零(指定会话消息未读数清零) 

<pre class="hll"><code class="language-java">
EMConversation conversation = EMChatManager.getInstance().getConversation(username|groupid);
conversation.resetUnreadMsgCount();
	
</code></pre>

###所有未读消息数清零
    
<pre class="hll"><code class="language-java">
EMChatManager.getInstance().resetAllUnreadMsgCount();
    
</code></pre>

###获取消息总数

<pre class="hll"><code class="language-java">
EMConversation conversation = EMChatManager.getInstance().getConversation(username|groupid);
    conversation.getMsgCount();
    	
</code></pre>

### 清空会话聊天记录

<pre class="hll"><code class="language-java">
//清空和某个user的聊天记录(包括本地)，不删除conversation这个会话对象
EMChatManager.getInstance().clearConversation(username|groupid);
	
</code></pre>

### 删除单个聊天记录

<pre class="hll"><code class="language-java">
//删除和某个user的整个的聊天记录(包括本地)
EMChatManager.getInstance().deleteConversation(username|groupid);
//删除当前会话的某条聊天记录
EMConversation conversation = EMChatManager.getInstance().getConversation(username|groupid);
conversation.removeMessage(deleteMsg.msgId);
	
</code></pre>

###删除所有聊天记录
<pre class="hll"><code class="language-java">
 //删除所有会话记录(包括本地)
EMChatManager.getInstance().deleteAllConversation();
    
</code></pre>

### 设置自定义的消息提示 {#setnotification}


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

## 新消息提示 {#notification}
SDK中提供了方便的新消息提醒功能。可以在收到消息时调用，提醒用户有新消息

首先获取EMChatOptions  

<pre class="hll"><code class="language-java">
chatOptions = EMChatManager.getInstance().getChatOptions();
    
</code></pre>

设置是否启用新消息提醒(打开或者关闭消息声音和震动提示)

<pre class="hll"><code class="language-java">
chatOptions.setNotifyBySoundAndVibrate(true|false); //默认为true 开启新消息提醒
    
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

设置后台接收新消息时是否通过通知栏提示

<pre class="hll"><code class="language-java"> 
chatOptions.setShowNotificationInBackgroud(true|false) //默认为true
    
</code></pre>


附：

<pre class="hll"><code class="language-java">
chatOptions.setAcceptInvitationAlways(false); 

//默认添加好友时为true，是不需要验证的，改成需要验证为false)
    
</code></pre> 

###Demo及SDK下载
[http://www.easemob.com/sdk/](http://www.easemob.com/sdk/)

###详细文档请参考 [java doc](http://www.easemob.com/apidoc/android/chat/)