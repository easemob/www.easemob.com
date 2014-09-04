---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 好友列表管理

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
			public void onContactDeleted(List<String> usernameList) {
				//被删除时回调此方法
			}
			
			
			@Override
			public void onContactAdded(List<String> usernameList) {
				//增加了联系人时回调此方法
			}
		});
</code></pre>