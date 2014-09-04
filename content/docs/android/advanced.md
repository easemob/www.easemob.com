---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 高级话题:

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