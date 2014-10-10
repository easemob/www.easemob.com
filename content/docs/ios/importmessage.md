---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 导入消息到环信数据库

导入消息到环信DB

<pre class="hll"><code class="language-java">
 
 //创建一条发送TextMsg
 private EMMessage createSentTextMsg(String to) {
		EMMessage msg = EMMessage.createSendMessage(Type.TXT);
		TextMessageBody body = new TextMessageBody("send text msg " + System.currentTimeMillis());
		msg.addBody(body);
		msg.setTo(to);
		msg.setFrom(CURRENTUSER);
		msg.setMsgTime(System.currentTimeMillis());
		return msg;
 }

 //创建一条接收TextMsg
 private EMMessage createReceivedTextMsg(String from) {
		EMMessage msg = EMMessage.createReceiveMessage(Type.TXT);
		TextMessageBody body = new TextMessageBody("receive text msg " + System.currentTimeMillis());
		msg.addBody(body);
		msg.setFrom(from);
		msg.setTo(CURRENTUSER);
		msg.setMsgTime(System.currentTimeMillis());
		return msg;
 }
 //import single chat
  EMMessage msg1 = createSentTextMsg("jma1");
  EMChatDB.getInstance().importMessage(msg1);
  EMMessage msg2 = createReceivedTextMsg(getRadomUserName());
  EMChatDB.getInstance().importMessage(msg2);
 //import group chat 
 
 //导入群聊消息和单聊消息类似，按照如下修改即可，
 //只需要指定msg.setChatType(ChatType.GroupChat)
 //然后把目标username传入groupid即可
 
</code></pre>
									




