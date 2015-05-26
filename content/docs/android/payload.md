---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 发送透传消息

透传消息能做什么：头像，昵称的更新等，可以把透传消息理解为一条指令，通过发送这条指令给对方，告诉对方要做的action，收到消息可以自定义处理的一种消息。（透传消息不会存入本地数据库中，所以在UI上是不会显示的）

透传消息发送格式

<pre class="hll"><code class="language-java">
EMMessage cmdMsg = EMMessage.createSendMessage(EMMessage.Type.CMD);

//支持单聊和群聊，默认单聊，如果是群聊添加下面这行
cmdMsg.setChatType(ChatType.GroupChat)

String action="action1";//action可以自定义，在广播接收时可以收到
CmdMessageBody cmdBody=new CmdMessageBody(action);
String toUsername="test1";//发送给某个人
cmdMsg.setReceipt(toUsername);
cmdMsg.setAttribute("a", "a");//支持自定义扩展
cmdMsg.addBody(cmdBody); 
EMChatManager.getInstance().sendMessage(message, new EMCallBack());
 
</code></pre>

#CMD消息监听

CMD消息广播监听

<pre class="hll"><code class="language-java">
    // 注册一个cmd消息的BroadcastReceiver
	IntentFilter cmdIntentFilter = new IntentFilter(EMChatManager.getInstance().getCmdMessageBroadcastAction());
	mContext.registerReceiver(cmdMessageReceiver, cmdIntentFilter);
	
    /**
	 * cmd消息BroadcastReceiver
	 */
	private BroadcastReceiver cmdMessageReceiver = new BroadcastReceiver() {

		@Override
		public void onReceive(Context context, Intent intent) {
			//获取cmd message对象
			String msgId = intent.getStringExtra("msgid");
			EMMessage message = intent.getParcelableExtra("message");
			//获取消息body
			CmdMessageBody cmdMsgBody = (CmdMessageBody) message.getBody();
			String aciton = cmdMsgBody.action;//获取自定义action
			//获取扩展属性
			String attr=message.getStringAttribute("a");
		}
	};
	
</code></pre>

CMD消息事件监听

<pre class="hll"><code class="language-java">
EMChatManager.getInstance().registerEventListener(new EMEventListener() {
		
	@Override
	public void onEvent(EMNotifierEvent event) {
		// TODO Auto-generated method stub
		EMMessage message = (EMMessage) event.getData();
	}
	}, new EMNotifierEvent.Event[]{EMNotifierEvent.Event.EventNewCMDMessage}
);
	
</code></pre>

<font color='FF0000' size='5em'>注：广播和监听事件不可同时混用</font>
