---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

##监听事件注册（建议做成全局监听）

####1.注册接收新消息的监听广播		{#newmessage}

<pre class="hll"><code class="language-java">
//只有注册了广播才能接收到新消息，目前离线消息，在线消息都是走接收消息的广播（离线消息目前无法监听，在登录以后，接收消息广播会执行一次拿到所有的离线消息）
NewMessageBroadcastReceiver msgReceiver = new NewMessageBroadcastReceiver();
IntentFilter intentFilter = new IntentFilter(EMChatManager.getInstance().getNewMessageBroadcastAction());
intentFilter.setPriority(3);
registerReceiver(msgReceiver, intentFilter);

private class NewMessageBroadcastReceiver extends BroadcastReceiver {
	@Override
	public void onReceive(Context context, Intent intent) {
	    // 注销广播
		abortBroadcast();

		// 消息id（每条消息都会生成唯一的一个id，目前是SDK生成）
		String msgId = intent.getStringExtra("msgid");
		//发送方
		String username = intent.getStringExtra("from");
		// 收到这个广播的时候，message已经在db和内存里了，可以通过id获取mesage对象
		EMMessage message = EMChatManager.getInstance().getMessage(msgId);
		EMConversation	conversation = EMChatManager.getInstance().getConversation(username);
		// 如果是群聊消息，获取到group id
		if (message.getChatType() == ChatType.GroupChat) {
			username = message.getTo();
		}
		if (!username.equals(username)) {
			// 消息不是发给当前会话，return
			return;
		}
	}
}
	
</code></pre>

####2.注册接收ack回执消息的BroadcastReceiver    {#ackmessage}

<pre class="hll"><code class="language-java">
EMChatManager.getInstance().getChatOptions().setRequireAck(flag)
//如果用到已读的回执需要把这个flag设置成true

IntentFilter ackMessageIntentFilter = new IntentFilter(EMChatManager.getInstance().getAckMessageBroadcastAction());
ackMessageIntentFilter.setPriority(3);
registerReceiver(ackMessageReceiver, ackMessageIntentFilter);

private BroadcastReceiver ackMessageReceiver = new BroadcastReceiver() {
	
	@Override
	public void onReceive(Context context, Intent intent) {
		abortBroadcast();
		String msgid = intent.getStringExtra("msgid");
		String from = intent.getStringExtra("from");
		EMConversation conversation = EMChatManager.getInstance().getConversation(from);
		if (conversation != null) {
			// 把message设为已读
			EMMessage msg = conversation.getMessage(msgid);
			if (msg != null) {
				msg.isAcked = true;
			}
		}
				
	}
};
	
</code></pre>
		
####3.注册一个消息送达的BroadcastReceiver（在聊天界面注册）    {#deliveryackmessage}

<pre class="hll"><code class="language-java">
EMChatManager.getInstance().getChatOptions().setRequireDeliveryAck(flag)
//如果用到已发送的回执需要把这个flag设置成true
     
IntentFilter deliveryAckMessageIntentFilter = new IntentFilter(EMChatManager.getInstance().getDeliveryAckMessageBroadcastAction());
deliveryAckMessageIntentFilter.setPriority(5);
registerReceiver(deliveryAckMessageReceiver, deliveryAckMessageIntentFilter);
		
/**
* 消息送达BroadcastReceiver
*/
private BroadcastReceiver deliveryAckMessageReceiver = new BroadcastReceiver() {
    @Override
	public void onReceive(Context context, Intent intent) {
		abortBroadcast();

		String msgid = intent.getStringExtra("msgid");
		String from = intent.getStringExtra("from");
		EMConversation conversation = EMChatManager.getInstance().getConversation(from);
		if (conversation != null) {
			// 把message设为已读
			EMMessage msg = conversation.getMessage(msgid);
			if (msg != null) {
				msg.isDelivered = true;
			}
		}
	}
};
	
</code></pre>


####4.监听联系人的变化等    {#contactlistener}

<pre class="hll"><code class="language-java">
EMContactManager.getInstance().setContactListener(new MyContactListener());

private class MyContactListener implements EMContactListener {

	@Override
	public void onContactAdded(List&#60String&#62 usernameList) {
		// 保存增加的联系人
			
	}

	@Override
	public void onContactDeleted(final List&#60String&#62 usernameList) {
		// 被删除

	}

	@Override
	public void onContactInvited(String username, String reason) {
		// 接到邀请的消息，如果不处理(同意或拒绝)，掉线后，服务器会自动再发过来，所以客户端不要重复提醒
			
	}

	@Override
	public void onContactAgreed(String username) {
		//同意好友请求
	}

	@Override
	public void onContactRefused(String username) {
		// 拒绝好友请求

	}

}
	
</code></pre>

####5.注册一个监听连接状态的listener    {#connectionlistener}

1.在聊天过程中难免会遇到网络问题，在此SDK为您提供了网络监听接口，实时监听

2.对于同一个账号在多处登录，则根据本监听事件中的_onDisConnected_方法传递的int类型参数error来进行判断是否同一个账号在其它地方进行了登录和账号是否被删除，若服务器返回的参数值为`EMError.CONNECTION_CONFLICT`，则认为是有同一个账号异地登录，若服务器返回的参数值为`EMError.USER_REMOVED`，则是账号在后台被删除

<pre class="hll"><code class="language-java">
//注册一个监听连接状态的listener
EMChatManager.getInstance().addConnectionListener(new MyConnectionListener());

//实现ConnectionListener接口
private class MyConnectionListener implements EMConnectionListener {
    @Override
	public void onConnected() {
	}
	@Override
	public void onDisconnected(final int error) {
		runOnUiThread(new Runnable() {

			@Override
			public void run() {
				if(error == EMError.USER_REMOVED){
					// 显示帐号已经被移除
				}else if (error == EMError.CONNECTION_CONFLICT) {
					// 显示帐号在其他设备登陆
				} else {
				if (NetUtils.hasNetwork(MainActivity.this))
					//连接不到聊天服务器
				else
					//当前网络不可用，请检查网络设置
				}
			}
		});
	}
}
    
</code></pre>

####6.注册群聊相关的listener    {#groupchangelistener}

<pre class="hll"><code class="language-java">
EMGroupManager.getInstance().addGroupChangeListener(new MyGroupChangeListener());

private class MyGroupChangeListener implements GroupChangeListener {

	@Override
	public void onInvitationReceived(String groupId, String groupName,String inviter, String reason) {

		//收到加入群聊的邀请

		boolean hasGroup = false;
		for (EMGroup group : EMGroupManager.getInstance().getAllGroups()) {
			if (group.getGroupId().equals(groupId)) {
				hasGroup = true;
				break;
			}
		}
		if (!hasGroup)
			return;

		// 被邀请
		EMMessage msg = EMMessage.createReceiveMessage(Type.TXT);
		msg.setChatType(ChatType.GroupChat);
		msg.setFrom(inviter);
		msg.setTo(groupId);
		msg.setMsgId(UUID.randomUUID().toString());
		msg.addBody(new TextMessageBody(inviter + "邀请你加入了群聊"));
		// 保存邀请消息
		EMChatManager.getInstance().saveMessage(msg);
		// 提醒新消息
		EMNotifier.getInstance(getApplicationContext()).notifyOnNewMsg();

	}

	@Override
	public void onInvitationAccpted(String groupId, String inviter,
				String reason) {
			//群聊邀请被接受
	}

	@Override
	public void onInvitationDeclined(String groupId, String invitee,
				String reason) {
		//群聊邀请被拒绝
	}

	@Override
	public void onUserRemoved(String groupId, String groupName) {
		//当前用户被管理员移除出群聊
			
	}

	@Override
	public void onGroupDestroy(String groupId, String groupName) {
		//群聊被创建者解散
		// 提示用户群被解散

	}

	@Override
	public void onApplicationReceived(String groupId, String groupName,String applyer, String reason) {
		// 用户申请加入群聊，收到加群申请
	}

	@Override
	public void onApplicationAccept(String groupId, String groupName,String accepter) {
		// 加群申请被同意
		EMMessage msg = EMMessage.createReceiveMessage(Type.TXT);
		msg.setChatType(ChatType.GroupChat);
		msg.setFrom(accepter);
		msg.setTo(groupId);
		msg.setMsgId(UUID.randomUUID().toString());
		msg.addBody(new TextMessageBody(accepter + "同意了你的群聊申请"));
		// 保存同意消息
		EMChatManager.getInstance().saveMessage(msg);
		// 提醒新消息
		EMNotifier.getInstance(getApplicationContext()).notifyOnNewMsg();
	}

	@Override
	public void onApplicationDeclined(String groupId, String groupName,String decliner, String reason) {
		// 加群申请被拒绝
	}

}
	
</code></pre>

###注：最后要通知sdk，UI 已经初始化完毕，注册了相应的receiver和listener, 可以接受broadcast了    {#setappinit}

<pre class="hll"><code class="language-java">
EMChat.getInstance().setAppInited();
	
</code></pre>